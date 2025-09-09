import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos derivados del esquema de Prisma para campos JSON
type InvoiceItem = Prisma.JsonValue & {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
};

type ClientInfo = Prisma.JsonValue & {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CompanyInfo = Prisma.JsonValue & {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
};

type InvoiceLanguageCode = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'ja' | 'zh' | 'ar';

// Tipo para los datos de entrada de la solicitud POST/PUT
interface InvoiceDataInput {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: CompanyInfo;
  currency: string;
  language: InvoiceLanguageCode;
  client: ClientInfo;
  items: InvoiceItem[];
  notes?: string;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
}

// GET - Obtener todas las facturas del usuario
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Transformar los datos para el frontend con tipado seguro
    const formattedInvoices = invoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      dueDate: invoice.dueDate,
      company: invoice.companyData as CompanyInfo,
      currency: invoice.currency,
      language: invoice.language,
      client: invoice.clientData as ClientInfo,
      items: invoice.items as InvoiceItem[],
      notes: invoice.notes,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      taxRate: invoice.taxRate,
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }));

    return NextResponse.json({ invoices: formattedInvoices });
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST - Crear nueva factura
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const invoiceData: InvoiceDataInput = await request.json();

    // Validar datos requeridos
    if (!invoiceData.invoiceNumber || !invoiceData.currency) {
      return NextResponse.json(
        { error: 'Datos de factura incompletos' },
        { status: 400 }
      );
    }

    const existingInvoicesCount = await prisma.invoice.count({
      where: { userId },
    });

    if (existingInvoicesCount >= 5) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite máximo de 5 facturas guardadas' },
        { status: 400 }
      );
    }

    // Verificar que no exista una factura con el mismo número para este usuario
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        userId,
        invoiceNumber: invoiceData.invoiceNumber,
      },
    });

    if (existingInvoice) {
      return NextResponse.json(
        { error: 'Ya existe una factura con este número' },
        { status: 400 }
      );
    }

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        invoiceNumber: invoiceData.invoiceNumber,
        date: invoiceData.date,
        dueDate: invoiceData.dueDate,
        companyData: invoiceData.company,
        currency: invoiceData.currency,
        language: invoiceData.language,
        clientData: invoiceData.client,
        items: invoiceData.items,
        notes: invoiceData.notes || '',
        subtotal: invoiceData.subtotal,
        tax: invoiceData.tax,
        taxRate: invoiceData.taxRate,
        total: invoiceData.total,
      },
    });

    return NextResponse.json({
      message: 'Factura guardada exitosamente',
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        currency: invoice.currency,
        language: invoice.language,
        total: invoice.total,
      },
    });
  } catch (error) {
    console.error('Error al guardar factura:', error);
    
    // Manejar errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Ya existe una factura con estos datos únicos' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}