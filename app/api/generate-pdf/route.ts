import { NextResponse, NextRequest } from 'next/server'
import { handleApiError, ApiError } from '@/lib/errors'
import { rateLimiter } from '@/lib/rateLimiters'
import { auth } from '@clerk/nextjs/server'
import puppeteer from 'puppeteer'


interface Company {
    name: string
    address: string
    email: string
}

interface Client {
    name: string
    address: string
    email: string
}

interface InvoiceItem {
    description: string
    quantity: number
    price: number
    total: number
}

interface InvoiceData {
    invoiceNumber: string
    date: string
    dueDate: string
    company: Company
    client: Client
    items: InvoiceItem[]
    subtotal: number
    tax: number
    total: number
}

function generateInvoiceHTML(invoiceData: InvoiceData): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Invoice ${invoiceData.invoiceNumber}</title>
            <style>
                /* Aquí irán los estilos CSS equivalentes a tu Tailwind */
            </style>
        </head>
        <body>
            <h1>Factura ${invoiceData.invoiceNumber}</h1>
            <p>Fecha: ${invoiceData.date}</p>
            <p>Vencimiento: ${invoiceData.dueDate}</p>
            <h2>De:</h2>
            <p>${invoiceData.company.name}</p>
            <p>${invoiceData.company.address}</p>
            <p>${invoiceData.company.email}</p>
            <h2>Para:</h2>
            <p>${invoiceData.client.name}</p>
            <p>${invoiceData.client.address}</p>
            <p>${invoiceData.client.email}</p>
            <h2>Items:</h2>
            <ul>
                ${invoiceData.items.map((item: InvoiceItem) => `
                    <li>
                        ${item.description} - ${item.quantity} x ${item.price} = ${item.total}
                    </li>
                `).join('')}
            </ul>
            <h2>Subtotal: ${invoiceData.subtotal}</h2>
            <h2>IVA: ${invoiceData.tax}</h2>
            <h2>Total: ${invoiceData.total}</h2>
        </body>
        </html>
    `
}

async function generatePDF(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  const page = await browser.newPage()
  await page.setContent(htmlContent)
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    printBackground: true
  })
  
  await browser.close()
  return Buffer.from(pdfBuffer)
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
    const { invoiceData } = body
    
    if (!invoiceData) {
      throw new ApiError(400, 'Invalid input: invoiceData is required')
    }

    // Generar HTML (siguiente paso)
    const htmlContent = generateInvoiceHTML(invoiceData)
    
    // Generar PDF con Puppeteer (siguiente paso)
    const pdfBuffer = await generatePDF(htmlContent)
    
    // Retornar PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoiceData.invoiceNumber}.pdf"`
      }
    })

  } catch (error) {
    return handleApiError(error)
  }
}