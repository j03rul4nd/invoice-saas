import { NextResponse, NextRequest } from 'next/server'
import { handleApiError, ApiError } from '@/lib/errors'
import { rateLimiter } from '@/lib/rateLimiters'
import { API, PDF_PROCESSING } from '@/lib/constants'
import { auth } from '@clerk/nextjs/server'
import { checkAndIncrementPromptUsage, incrementPromptUsage } from '@/lib/promptLimits'


// Agregar antes de la función POST en tu route.ts

function getCurrencyPricingGuidelines(currency: string): string {
  const guidelines = {
    'EUR': `
      PRICING GUIDELINES FOR EUR (Europe/Spain):
      - Web design: 800-2500 EUR
      - Hourly consulting: 45-120 EUR/hour
      - Mobile app development: 3000-15000 EUR
      - Logo design: 200-800 EUR
      - SEO services: 400-1200 EUR/month
      - Content writing: 0.08-0.25 EUR/word
      - Social media management: 300-1000 EUR/month
      - E-commerce development: 2000-8000 EUR
      - Tax rate: Default 21% (Spain VAT)
    `,
    'USD': `
      PRICING GUIDELINES FOR USD (United States):
      - Web design: 1000-3000 USD
      - Hourly consulting: 50-150 USD/hour
      - Mobile app development: 5000-20000 USD
      - Logo design: 300-1200 USD
      - SEO services: 500-1500 USD/month
      - Content writing: 0.10-0.30 USD/word
      - Social media management: 400-1200 USD/month
      - E-commerce development: 2500-10000 USD
      - Tax rate: Varies by state, default 8.5%
    `,
    'GBP': `
      PRICING GUIDELINES FOR GBP (United Kingdom):
      - Web design: 700-2200 GBP
      - Hourly consulting: 40-100 GBP/hour
      - Mobile app development: 4000-16000 GBP
      - Logo design: 250-900 GBP
      - SEO services: 400-1200 GBP/month
      - Content writing: 0.08-0.22 GBP/word
      - Social media management: 350-1000 GBP/month
      - E-commerce development: 2000-8000 GBP
      - Tax rate: Default 20% (UK VAT)
    `,
    'CAD': `
      PRICING GUIDELINES FOR CAD (Canada):
      - Web design: 1200-3500 CAD
      - Hourly consulting: 60-160 CAD/hour
      - Mobile app development: 6000-22000 CAD
      - Logo design: 350-1400 CAD
      - SEO services: 600-1800 CAD/month
      - Content writing: 0.12-0.35 CAD/word
      - Social media management: 500-1400 CAD/month
      - E-commerce development: 3000-12000 CAD
      - Tax rate: Varies by province, default 13%
    `,
    'AUD': `
      PRICING GUIDELINES FOR AUD (Australia):
      - Web design: 1400-4000 AUD
      - Hourly consulting: 70-180 AUD/hour
      - Mobile app development: 7000-25000 AUD
      - Logo design: 400-1500 AUD
      - SEO services: 700-2000 AUD/month
      - Content writing: 0.15-0.40 AUD/word
      - Social media management: 600-1600 AUD/month
      - E-commerce development: 3500-14000 AUD
      - Tax rate: Default 10% (GST)
    `,
    'JPY': `
      PRICING GUIDELINES FOR JPY (Japan):
      - Web design: 100000-400000 JPY
      - Hourly consulting: 6000-18000 JPY/hour
      - Mobile app development: 800000-3000000 JPY
      - Logo design: 40000-150000 JPY
      - SEO services: 60000-200000 JPY/month
      - Content writing: 15-40 JPY/word
      - Social media management: 50000-180000 JPY/month
      - E-commerce development: 300000-1200000 JPY
      - Tax rate: Default 10% (Consumption Tax)
    `,
    'CHF': `
      PRICING GUIDELINES FOR CHF (Switzerland):
      - Web design: 1200-3500 CHF
      - Hourly consulting: 80-200 CHF/hour
      - Mobile app development: 8000-30000 CHF
      - Logo design: 500-1800 CHF
      - SEO services: 800-2500 CHF/month
      - Content writing: 0.20-0.50 CHF/word
      - Social media management: 700-2000 CHF/month
      - E-commerce development: 4000-15000 CHF
      - Tax rate: Default 7.7% (VAT)
    `,
    'SEK': `
      PRICING GUIDELINES FOR SEK (Sweden):
      - Web design: 8000-25000 SEK
      - Hourly consulting: 500-1300 SEK/hour
      - Mobile app development: 50000-200000 SEK
      - Logo design: 3000-12000 SEK
      - SEO services: 5000-15000 SEK/month
      - Content writing: 1.5-4 SEK/word
      - Social media management: 4000-12000 SEK/month
      - E-commerce development: 25000-100000 SEK
      - Tax rate: Default 25% (VAT)
    `,
    'NOK': `
      PRICING GUIDELINES FOR NOK (Norway):
      - Web design: 8500-28000 NOK
      - Hourly consulting: 600-1500 NOK/hour
      - Mobile app development: 60000-250000 NOK
      - Logo design: 3500-15000 NOK
      - SEO services: 6000-18000 NOK/month
      - Content writing: 2-5 NOK/word
      - Social media management: 5000-15000 NOK/month
      - E-commerce development: 30000-120000 NOK
      - Tax rate: Default 25% (VAT)
    `,
    'DKK': `
      PRICING GUIDELINES FOR DKK (Denmark):
      - Web design: 6000-20000 DKK
      - Hourly consulting: 400-1000 DKK/hour
      - Mobile app development: 40000-160000 DKK
      - Logo design: 2500-10000 DKK
      - SEO services: 4000-12000 DKK/month
      - Content writing: 1-3 DKK/word
      - Social media management: 3500-10000 DKK/month
      - E-commerce development: 20000-80000 DKK
      - Tax rate: Default 25% (VAT)
    `
  };

  return guidelines[currency as keyof typeof guidelines] || guidelines['EUR'];
}


export async function POST(request: NextRequest) {
  try {
    await rateLimiter(request)

    // Verificar autenticación
    const { userId } = await auth()
    if (!userId) {
      throw new ApiError(401, 'Unauthorised. You must log in to use this feature.')
    }

    const body = await request.json().catch(() => ({}))
    const { prompt, currency = 'EUR' } = body // Cambiado de 'text' a 'prompt' para coincidir con el hook
    
    if (!prompt || typeof prompt !== 'string') {
      throw new ApiError(400, 'Invalid input: prompt is required and must be a string')
    }

    if (prompt.length === 0) {
      throw new ApiError(400, 'Invalid input: prompt cannot be empty')
    }

    const validCurrencies = ['EUR', 'USD', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'SEK', 'NOK', 'DKK']
    if (currency && !validCurrencies.includes(currency)) {
      throw new ApiError(400, `Invalid currency: ${currency}. Supported currencies: ${validCurrencies.join(', ')}`)
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
                        
                        CRITICAL: You must respond with ONLY a raw JSON object. Do NOT wrap it in markdown code blocks, do NOT use \`\`\`json, and do NOT include any additional text or explanation.
                        
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
                            "invoiceNumber": "string (optional)",
                            "currency": "string (required, must be: ${currency})"
                        }
                        
                        CURRENCY AND PRICING RULES:
                        - The target currency is: ${currency}
                        - All prices must be in ${currency}
                        - Use appropriate market rates for ${currency === 'EUR' ? 'Europe/Spain' : currency === 'USD' ? 'United States' : currency === 'GBP' ? 'United Kingdom' : 'the respective region'}
                        - Consider local market pricing standards for the currency region
                        
                        ${getCurrencyPricingGuidelines(currency)}
                        
                        GENERAL RULES:
                        1. Extract client information from the user input
                        2. Create detailed item descriptions for services/products mentioned
                        3. Calculate reasonable prices in ${currency} based on regional market rates
                        4. If quantity is mentioned, use it; otherwise default to 1
                        5. Use Spanish language for descriptions and notes if currency is EUR, otherwise use English
                        6. Generate a professional invoice number if not provided (format: INV-YYYY-XXXX)
                        7. Set appropriate tax rate based on currency region
                        8. Only include company fields if explicitly mentioned in the input
                        9. Be conservative with pricing - better to underestimate than overestimate
                        10. RESPOND ONLY WITH THE RAW JSON OBJECT - NO MARKDOWN, NO CODE BLOCKS, NO ADDITIONAL TEXT OR EXPLANATION
                        11. Do NOT use \`\`\`json or any markdown formatting
                        12. Always include "currency": "${currency}" in your response
                        
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
    let aiResponseText = data.candidates[0].content.parts[0].text.trim()
    
    // Limpiar la respuesta de markdown si existe
    if (aiResponseText.startsWith('```json')) {
      aiResponseText = aiResponseText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (aiResponseText.startsWith('```')) {
      aiResponseText = aiResponseText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    
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

    // Validar que todos los items tengan precios válidos
    for (const item of parsedInvoiceData.items) {
      if (!item.description || typeof item.price !== 'number' || item.price < 0) {
        throw new ApiError(500, 'AI response contains invalid item data')
      }
    }

    // Asegurar que la currency esté en la respuesta
    if (!parsedInvoiceData.currency) {
      parsedInvoiceData.currency = currency // Fallback a la currency solicitada
    }

    // Validar que la currency coincida o sea válida
    if (parsedInvoiceData.currency !== currency) {
      console.warn(`AI returned currency ${parsedInvoiceData.currency}, expected ${currency}. Using requested currency.`)
      parsedInvoiceData.currency = currency
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