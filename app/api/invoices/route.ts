import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos derivados del esquema de Prisma para campos JSON
// Esto asegura que tus tipos de TypeScript coincidan con tu base de datos
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

// Tipo para los datos de entrada de la solicitud POST
interface InvoiceDataInput {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: CompanyInfo;
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

    // Transformar los datos para el frontend con un tipado seguro
    const formattedInvoices = invoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      dueDate: invoice.dueDate,
      company: invoice.companyData as CompanyInfo,
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

    // Tipar los datos de la solicitud con el tipo de entrada
    const invoiceData: InvoiceDataInput = await request.json();

    const existingInvoicesCount = await prisma.invoice.count({
      where: { userId },
    });

    if (existingInvoicesCount >= 5) {
      return NextResponse.json(
        {
          error: 'Has alcanzado el límite máximo de 5 facturas guardadas',
        },
        { status: 400 }
      );
    }

    // Prisma acepta los objetos JSON directamente, sin necesidad de casting
    const invoice = await prisma.invoice.create({
      data: {
        userId,
        invoiceNumber: invoiceData.invoiceNumber,
        date: invoiceData.date,
        dueDate: invoiceData.dueDate,
        companyData: invoiceData.company,
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
        total: invoice.total,
      },
    });
  } catch (error) {
    console.error('Error al guardar factura:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}