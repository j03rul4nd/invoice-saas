import { NextResponse, NextRequest } from 'next/server'
import { handleApiError, ApiError } from '@/lib/errors'
import { rateLimiter } from '@/lib/rateLimiters'
import { auth } from '@clerk/nextjs/server'
import puppeteer from 'puppeteer'
import { getInvoiceTexts, type InvoiceLanguageCode } from '@/utils/invoice-translations' // ✅ Importar las traducciones

type InvoiceLanguageCodeType = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'ja' | 'zh' | 'ar';

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: CompanyInfo;
  client: ClientInfo;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  currency: string;
  language: InvoiceLanguageCodeType;
}

// ✅ Mapeo de símbolos de monedas comunes
const CURRENCY_SYMBOLS: { [key: string]: string } = {
  'EUR': '€',
  'USD': '$',
  'GBP': '£',
  'JPY': '¥',
  'CAD': 'C$',
  'AUD': 'A$',
  'CHF': 'Fr',
  'CNY': '¥',
  'SEK': 'kr',
  'NOK': 'kr',
  'DKK': 'kr',
  'PLN': 'zł',
  'CZK': 'Kč',
  'HUF': 'Ft',
  'RON': 'lei',
  'BGN': 'лв',
  'HRK': 'kn',
  'RUB': '₽',
  'TRY': '₺',
  'BRL': 'R$',
  'MXN': '$',
  'ARS': '$',
  'CLP': '$',
  'COP': '$',
  'PEN': 'S/',
  'UYU': '$U',
  'INR': '₹',
  'KRW': '₩',
  'THB': '฿',
  'SGD': 'S$',
  'MYR': 'RM',
  'IDR': 'Rp',
  'PHP': '₱',
  'VND': '₫',
  'ZAR': 'R',
  'EGP': 'E£',
  'MAD': 'د.م',
  'NGN': '₦',
  'KES': 'KSh',
  'GHS': '₵'
};

// ✅ Función para obtener el símbolo de la moneda
function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode;
}

// ✅ Función para formatear precios con la moneda correcta
function formatPrice(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  
  // Para EUR, USD, GBP ponemos el símbolo al principio
  if (['EUR', 'USD', 'GBP', 'CAD', 'AUD'].includes(currencyCode.toUpperCase())) {
    return `${symbol}${amount.toFixed(2)}`;
  }
  
  // Para otras monedas, ponemos el símbolo al final
  return `${amount.toFixed(2)} ${symbol}`;
}

// ✅ Función principal para generar HTML multiidioma
function generateInvoiceHTML(invoiceData: InvoiceData): string {
  // ✅ Obtener traducciones según el idioma de la factura
  const texts = getInvoiceTexts(invoiceData.language as InvoiceLanguageCode);
  
  // Usar la moneda de la factura para formatear precios
  const { currency } = invoiceData;
  const formatWithCurrency = (amount: number) => formatPrice(amount, currency);

  // ✅ Detectar si es idioma RTL (Right-to-Left)
  const isRTL = invoiceData.language === 'ar';
  
  return `
    <!DOCTYPE html>
    <html${isRTL ? ' dir="rtl"' : ''}>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${invoiceData.invoiceNumber}</title>
      <style>
        body {
          font-family: ${isRTL ? 'Arial, sans-serif' : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'};
          margin: 0;
          padding: 32px;
          background: white;
          color: black;
          line-height: 1.5;
          direction: ${isRTL ? 'rtl' : 'ltr'};
        }
        .invoice-container {
          background: white;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        .header h1 {
          font-size: 30px;
          font-weight: bold;
          color: #1f2937;
          margin: 0 0 8px 0;
        }
        .header .invoice-number {
          color: #6b7280;
          margin: 0;
        }
        .header .dates {
          text-align: ${isRTL ? 'left' : 'right'};
        }
        .header .dates p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
        .info-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        .info-section h3 {
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }
        .info-section .details {
          font-size: 14px;
          color: #6b7280;
        }
        .info-section .details p {
          margin: 0;
        }
        .info-section .details .name {
          font-weight: 500;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 32px;
        }
        .items-table thead {
          border-bottom: 2px solid #e5e7eb;
        }
        .items-table th {
          padding: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }
        .items-table th:first-child { text-align: ${isRTL ? 'right' : 'left'}; }
        .items-table th:nth-child(2) { text-align: center; }
        .items-table th:nth-child(3) { text-align: ${isRTL ? 'left' : 'right'}; }
        .items-table th:nth-child(4) { text-align: ${isRTL ? 'left' : 'right'}; }
        .items-table tbody tr {
          border-bottom: 1px solid #f3f4f6;
        }
        .items-table td {
          padding: 12px 8px;
          font-size: 14px;
          color: #374151;
        }
        .items-table td:first-child { text-align: ${isRTL ? 'right' : 'left'}; }
        .items-table td:nth-child(2) { text-align: center; }
        .items-table td:nth-child(3) { text-align: ${isRTL ? 'left' : 'right'}; }
        .items-table td:nth-child(4) { text-align: ${isRTL ? 'left' : 'right'}; }
        .totals {
          display: flex;
          justify-content: ${isRTL ? 'flex-start' : 'flex-end'};
          margin-bottom: 32px;
        }
        .totals-box {
          width: 256px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        .total-row.final {
          font-size: 18px;
          font-weight: 600;
          border-top: 1px solid #e5e7eb;
          padding-top: 8px;
        }
        .total-row .label {
          color: #6b7280;
        }
        .total-row .value {
          color: #1f2937;
        }
        .notes {
          margin-top: 32px;
        }
        .notes h3 {
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }
        .notes p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          white-space: pre-line;
        }
        .currency-indicator {
          position: absolute;
          top: 20px;
          ${isRTL ? 'left' : 'right'}: 20px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <!-- Header -->
        <div class="header">
          <div>
            <h1>${texts.invoice.title}</h1>
            <p class="invoice-number">#${invoiceData.invoiceNumber}</p>
          </div>
          <div class="dates">
            <p>${texts.invoice.date}: ${invoiceData.date}</p>
            <p>${texts.invoice.dueDate}: ${invoiceData.dueDate}</p>
          </div>
        </div>

        <!-- Company & Client Info -->
        <div class="info-section">
          <div>
            <h3>${texts.invoice.from}</h3>
            <div class="details">
              <p class="name">${invoiceData.company.name || texts.other.defaultCompany}</p>
              ${invoiceData.company.email ? `<p>${invoiceData.company.email}</p>` : ''}
              ${invoiceData.company.phone ? `<p>${invoiceData.company.phone}</p>` : ''}
              ${invoiceData.company.taxId ? `<p>${invoiceData.company.taxId}</p>` : ''}
              ${invoiceData.company.address ? `<p>${invoiceData.company.address.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
          </div>
          <div>
            <h3>${texts.invoice.to}</h3>
            <div class="details">
              <p class="name">${invoiceData.client.name || texts.other.defaultClient}</p>
              ${invoiceData.client.email ? `<p>${invoiceData.client.email}</p>` : ''}
              ${invoiceData.client.phone ? `<p>${invoiceData.client.phone}</p>` : ''}
              ${invoiceData.client.address ? `<p>${invoiceData.client.address.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
          <thead>
            <tr>
              <th>${texts.table.description}</th>
              <th>${texts.table.quantity}</th>
              <th>${texts.table.price}</th>
              <th>${texts.table.total}</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td>${item.description || texts.other.defaultItem}</td>
                <td>${item.quantity}</td>
                <td>${formatWithCurrency(item.price)}</td>
                <td>${formatWithCurrency(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Totals -->
        <div class="totals">
          <div class="totals-box">
            <div class="total-row">
              <span class="label">${texts.totals.subtotal}</span>
              <span class="value">${formatWithCurrency(invoiceData.subtotal)}</span>
            </div>
            <div class="total-row">
              <span class="label">${texts.totals.tax} (${invoiceData.taxRate}%):</span>
              <span class="value">${formatWithCurrency(invoiceData.tax)}</span>
            </div>
            <div class="total-row final">
              <span class="label">${texts.totals.total}</span>
              <span class="value">${formatWithCurrency(invoiceData.total)}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        ${invoiceData.notes ? `
          <div class="notes">
            <h3>${texts.other.notes}</h3>
            <p>${invoiceData.notes}</p>
          </div>
        ` : ''}
      </div>
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

    // ✅ Validar que currency esté presente, usar EUR como fallback
    if (!invoiceData.currency) {
      invoiceData.currency = 'EUR';
    }

    // ✅ Validar que language esté presente, usar 'es' como fallback
    if (!invoiceData.language) {
      invoiceData.language = 'es';
    }

    console.log(`Generating PDF with currency: ${invoiceData.currency} and language: ${invoiceData.language}`);

    // ✅ Generar HTML con soporte completo de idiomas y moneda
    const htmlContent = generateInvoiceHTML(invoiceData)
    
    // Generar PDF con Puppeteer
    const pdfBuffer = await generatePDF(htmlContent)
    
    // ✅ Incluir la moneda y el idioma en el nombre del archivo
    const filename = `invoice-${invoiceData.invoiceNumber}-${invoiceData.currency.toLowerCase()}-${invoiceData.language}.pdf`;

    // Retornar PDF
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    return handleApiError(error)
  }
}