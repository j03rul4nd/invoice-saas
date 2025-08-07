import { NextResponse, NextRequest } from 'next/server'
import { handleApiError, ApiError } from '@/lib/errors'
import { rateLimiter } from '@/lib/rateLimiters'
import { API, PDF_PROCESSING } from '@/lib/constants'
import { auth } from '@clerk/nextjs/server'
import { checkAndIncrementPromptUsage, incrementPromptUsage } from '@/lib/promptLimits'

export async function POST(request: NextRequest) {
  try {
    await rateLimiter(request)

    // Verificar autenticación
    const { userId } = await auth()
    if (!userId) {
      throw new ApiError(401, 'Unauthorised. You must log in to use this feature.')
    }

    const body = await request.json().catch(() => ({}))
    const { prompt } = body // Cambiado de 'text' a 'prompt' para coincidir con el hook
    
    if (!prompt || typeof prompt !== 'string') {
      throw new ApiError(400, 'Invalid input: prompt is required and must be a string')
    }

    if (prompt.length === 0) {
      throw new ApiError(400, 'Invalid input: prompt cannot be empty')
    }

    // Verificar límites de prompts antes de procesar
    const promptLimitResult = await checkAndIncrementPromptUsage(userId)
    
    if (!promptLimitResult.canUse) {
      throw new ApiError(429, `You have reached your monthly limit of ${promptLimitResult.monthlyLimit} prompts. The limit will reset on ${promptLimitResult.nextResetDate.toLocaleDateString('en-US')}.`);
    }

    const processedText = prompt.substring(0, PDF_PROCESSING.MAX_TEXT_LENGTH)

    const response = await fetch(
        `${API.GEMINI_ENDPOINT}?key=${process.env.GEMINI_API_KEY}`, 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            contents: [{
                parts: [{
                text: `
                    You are an AI assistant that generates invoice data from natural language descriptions. 
                    
                    IMPORTANT: You must respond ONLY with a valid JSON object that matches this exact structure:
                    
                    {
                    "company": {
                        "name": "string (optional)",
                        "email": "string (optional)", 
                        "phone": "string (optional)",
                        "address": "string (optional)",
                        "taxId": "string (optional)"
                    },
                    "client": {
                        "name": "string (required)",
                        "email": "string (optional)",
                        "phone": "string (optional)", 
                        "address": "string (optional)"
                    },
                    "items": [
                        {
                        "description": "string (required)",
                        "quantity": number (required, minimum 1),
                        "price": number (required, minimum 0)
                        }
                    ],
                    "notes": "string (optional)",
                    "taxRate": number (optional, default 21, between 0-100),
                    "invoiceNumber": "string (optional)"
                    }
                    
                    RULES:
                    1. Extract client information from the user input
                    2. Create detailed item descriptions for services/products mentioned
                    3. Calculate reasonable prices if not specified (use market rates for Spain/Europe)
                    4. If quantity is mentioned, use it; otherwise default to 1
                    5. Use Spanish language for descriptions and notes
                    6. Generate a professional invoice number if not provided (format: INV-YYYY-XXXX)
                    7. Set appropriate tax rate (21% for Spain unless specified otherwise)
                    8. Only include company fields if explicitly mentioned in the input
                    9. Be conservative with pricing - better to underestimate than overestimate
                    10. RESPOND ONLY WITH THE JSON OBJECT - NO ADDITIONAL TEXT OR EXPLANATION
                    
                    Examples of what to extract:
                    - "Factura para Juan Pérez por diseño web" → client.name: "Juan Pérez", items: [{"description": "Servicios de diseño web", "quantity": 1, "price": 800}]
                    - "3 horas de consultoría a 50€/hora para María García" → client.name: "María García", items: [{"description": "Servicios de consultoría", "quantity": 3, "price": 50}]
                    - "Desarrollo de aplicación móvil para Empresa XYZ, 2500€" → client.name: "Empresa XYZ", items: [{"description": "Desarrollo de aplicación móvil", "quantity": 1, "price": 2500}]
                    
                    User input to process: ${processedText}
                `
                }]
            }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1024,
                    topP: 0.8,
                    topK: 40
                }
            })
        }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      throw new ApiError(
        response.status, 
        errorData.error?.message || `Failed to analyze document: ${response.statusText}`,
        errorData
      )
    }

    const data = await response.json()
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new ApiError(500, 'Invalid response from AI service')
    }

    // Obtener el JSON generado por Gemini
    const aiResponseText = data.candidates[0].content.parts[0].text.trim()
    
    // Parsear el JSON devuelto por la IA
    let parsedInvoiceData
    try {
      parsedInvoiceData = JSON.parse(aiResponseText)
    } catch (parseError) {
      console.error('Error parsing AI response:', aiResponseText)
      throw new ApiError(500, 'Invalid JSON response from AI service')
    }

    // Validar que el JSON tenga la estructura mínima requerida
    if (!parsedInvoiceData.client || !parsedInvoiceData.client.name) {
      throw new ApiError(500, 'AI response missing required client information')
    }

    if (!parsedInvoiceData.items || !Array.isArray(parsedInvoiceData.items) || parsedInvoiceData.items.length === 0) {
      throw new ApiError(500, 'AI response missing required items information')
    }

    // Incrementar el contador de uso solo si la API fue exitosa
    await incrementPromptUsage(userId)

    // Devolver la respuesta en el formato esperado por el hook
    return NextResponse.json({
      ...parsedInvoiceData, // Spread del objeto parseado (client, items, notes, etc.)
      promptUsage: {
        remaining: promptLimitResult.remainingPrompts - 1,
        used: promptLimitResult.currentUsage + 1,
        limit: promptLimitResult.monthlyLimit,
        nextReset: promptLimitResult.nextResetDate
      }
    })

  } catch (error) {
    return handleApiError(error)
  }
}