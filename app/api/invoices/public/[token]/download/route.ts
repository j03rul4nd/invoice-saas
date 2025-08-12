import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import puppeteer from 'puppeteer';

// ✅ Fix: Correct type for Next.js App Router params
type RouteParams = {
  params: Promise<{ token: string }>
}

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
}

// ✅ Funciones de validación y casting seguro
function validateCompanyInfo(data: any): CompanyInfo {
  return {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    address: data?.address || '',
    taxId: data?.taxId || ''
  };
}

function validateClientInfo(data: any): ClientInfo {
  return {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    address: data?.address || ''
  };
}

function validateInvoiceItems(data: any): InvoiceItem[] {
  if (!Array.isArray(data)) return [];
  
  return data.map((item: any) => ({
    id: item?.id || '',
    description: item?.description || '',
    quantity: Number(item?.quantity) || 0,
    price: Number(item?.price) || 0,
    total: Number(item?.total) || 0
  }));
}

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

const TEXTS = {
  invoice: {
    title: "FACTURA",
    from: "De:",
    to: "Para:",
    description: "Descripción",
    quantity: "Cant.",
    price: "Precio", 
    total: "Total",
    subtotal: "Subtotal:",
    tax: "IVA",
    finalTotal: "Total:",
    defaultCompany: "Tu Empresa",
    defaultClient: "Cliente"
  },
  invoiceInfo: {
    date: "Fecha",
    dueDate: "Fecha de Vencimiento"
  },
  notes: {
    previewTitle: "Notas:"
  },
  items: {
    defaultDescription: "Producto/Servicio"
  }
};

function generateInvoiceHTML(invoiceData: InvoiceData): string {
  // ✅ Usar la moneda de la factura para formatear precios
  const { currency } = invoiceData;
  const formatWithCurrency = (amount: number) => formatPrice(amount, currency);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${invoiceData.invoiceNumber}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 32px;
          background: white;
          color: black;
          line-height: 1.5;
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
          text-align: right;
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
        .items-table th:first-child { text-align: left; }
        .items-table th:nth-child(2) { text-align: center; }
        .items-table th:nth-child(3) { text-align: right; }
        .items-table th:nth-child(4) { text-align: right; }
        .items-table tbody tr {
          border-bottom: 1px solid #f3f4f6;
        }
        .items-table td {
          padding: 12px 8px;
          font-size: 14px;
          color: #374151;
        }
        .items-table td:first-child { text-align: left; }
        .items-table td:nth-child(2) { text-align: center; }
        .items-table td:nth-child(3) { text-align: right; }
        .items-table td:nth-child(4) { text-align: right; }
        .totals {
          display: flex;
          justify-content: flex-end;
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
        /* ✅ Agregar indicador de moneda en la esquina superior derecha */
        .currency-indicator {
          position: absolute;
          top: 20px;
          right: 20px;
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
            <h1>${TEXTS.invoice.title}</h1>
            <p class="invoice-number">#${invoiceData.invoiceNumber}</p>
          </div>
          <div class="dates">
            <p>${TEXTS.invoiceInfo.date}: ${invoiceData.date}</p>
            <p>${TEXTS.invoiceInfo.dueDate}: ${invoiceData.dueDate}</p>
          </div>
        </div>

        <!-- Company & Client Info -->
        <div class="info-section">
          <div>
            <h3>${TEXTS.invoice.from}</h3>
            <div class="details">
              <p class="name">${invoiceData.company.name || TEXTS.invoice.defaultCompany}</p>
              ${invoiceData.company.email ? `<p>${invoiceData.company.email}</p>` : ''}
              ${invoiceData.company.phone ? `<p>${invoiceData.company.phone}</p>` : ''}
              ${invoiceData.company.taxId ? `<p>${invoiceData.company.taxId}</p>` : ''}
              ${invoiceData.company.address ? `<p>${invoiceData.company.address.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
          </div>
          <div>
            <h3>${TEXTS.invoice.to}</h3>
            <div class="details">
              <p class="name">${invoiceData.client.name || TEXTS.invoice.defaultClient}</p>
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
              <th>${TEXTS.invoice.description}</th>
              <th>${TEXTS.invoice.quantity}</th>
              <th>${TEXTS.invoice.price}</th>
              <th>${TEXTS.invoice.total}</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td>${item.description || TEXTS.items.defaultDescription}</td>
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
              <span class="label">${TEXTS.invoice.subtotal}</span>
              <span class="value">${formatWithCurrency(invoiceData.subtotal)}</span>
            </div>
            <div class="total-row">
              <span class="label">${TEXTS.invoice.tax} (${invoiceData.taxRate}%):</span>
              <span class="value">${formatWithCurrency(invoiceData.tax)}</span>
            </div>
            <div class="total-row final">
              <span class="label">${TEXTS.invoice.finalTotal}</span>
              <span class="value">${formatWithCurrency(invoiceData.total)}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        ${invoiceData.notes ? `
          <div class="notes">
            <h3>${TEXTS.notes.previewTitle}</h3>
            <p>${invoiceData.notes}</p>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}

// ✅ FUNCIÓN CORREGIDA: Ahora devuelve Uint8Array para solucionar el error de tipos
async function generatePDF(htmlContent: string): Promise<Uint8Array> {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    const page = await browser.newPage();
    
    // ✅ Configurar viewport para consistencia
    await page.setViewport({ width: 1200, height: 800 });
    
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0'
    });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true,
      preferCSSPageSize: true
    });
    
    // ✅ CLAVE: Convertir a Uint8Array para máxima compatibilidad con NextResponse
    return new Uint8Array(pdfBuffer);
    
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// ✅ Fix: Updated function signature to await params
export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    // ✅ Await the params promise
    const { token } = await context.params;

    // Buscar la factura pública
    const invoice = await prisma.invoice.findUnique({
      where: {
        publicToken: token,
        isPublic: true,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // Verificar si el enlace ha expirado
    if (invoice.publicExpiresAt && invoice.publicExpiresAt < new Date()) {
      return NextResponse.json({ error: 'Enlace expirado' }, { status: 410 });
    }

    // ✅ Transformar los datos de Prisma al formato InvoiceData con validación segura
    const invoiceData: InvoiceData = {
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      dueDate: invoice.dueDate,
      company: validateCompanyInfo(invoice.companyData),
      client: validateClientInfo(invoice.clientData),
      items: validateInvoiceItems(invoice.items),
      notes: invoice.notes || '',
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      taxRate: invoice.taxRate,
      total: invoice.total,
      currency: invoice.currency || 'EUR' // ✅ Fallback a EUR si no hay moneda
    };

    console.log(`Generating public PDF with currency: ${invoiceData.currency}`);

    // ✅ Generar HTML con la misma plantilla
    const htmlContent = generateInvoiceHTML(invoiceData);
    
    // ✅ Generar PDF con Puppeteer (ahora devuelve Uint8Array)
    const pdfBuffer = await generatePDF(htmlContent);
    
    // ✅ Incluir la moneda en el nombre del archivo
    const filename = `factura-${invoiceData.invoiceNumber}-${invoiceData.currency.toLowerCase()}.pdf`;
    
    // ✅ SOLUCIÓN: Convertir Uint8Array a Buffer para NextResponse
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString()
      }
    });

  } catch (error) {
    console.error('Error downloading public invoice:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}