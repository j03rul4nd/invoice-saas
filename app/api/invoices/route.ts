import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos para campos JSON
type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
};

type ClientInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CompanyInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
};

type InvoiceLanguageCode = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'ja' | 'zh' | 'ar';

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

// Helper para el límite dinámico
async function getInvoiceLimitStatus(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  const now = new Date();
  let currentUsage = user.currentInvoiceUsage ?? 0;
  let lastReset = user.lastInvoiceReset ?? new Date(0);

  // Reseteo mensual
  if (
    now.getMonth() !== lastReset.getMonth() ||
    now.getFullYear() !== lastReset.getFullYear()
  ) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        currentInvoiceUsage: 0,
        lastInvoiceReset: now,
      },
    });
    currentUsage = 0;
    lastReset = now;
  }

  return {
    limit: user.monthlyInvoiceLimit,
    usage: currentUsage,
    canCreateInvoice: currentUsage < user.monthlyInvoiceLimit,
    remaining: user.monthlyInvoiceLimit - currentUsage,
  };
}

// Incrementar consumo
async function consumeInvoiceLimit(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { currentInvoiceUsage: { increment: 1 } },
  });
}

// GET - Obtener facturas
export async function GET() {
  try {
    const { userId } = await auth(); // `auth()` es síncrono en Clerk v4
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const formattedInvoices = invoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      dueDate: invoice.dueDate,
      company: invoice.companyData as CompanyInfo,
      currency: invoice.currency,
      language: invoice.language as InvoiceLanguageCode,
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

// POST - Crear factura
export async function POST(request: Request) {
  try {
    const { userId } = await auth(); // corregido: no necesita await
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const invoiceData: InvoiceDataInput = await request.json();

    // Validación básica
    if (!invoiceData.invoiceNumber || !invoiceData.currency) {
      return NextResponse.json(
        { error: 'Datos de factura incompletos' },
        { status: 400 }
      );
    }

    // Check límite
    const limitStatus = await getInvoiceLimitStatus(userId);
    if (!limitStatus.canCreateInvoice) {
      return NextResponse.json(
        { error: `Has alcanzado el límite máximo de ${limitStatus.limit} facturas este mes` },
        { status: 400 }
      );
    }

    // Verificar duplicados
    const existingInvoice = await prisma.invoice.findFirst({
      where: { userId, invoiceNumber: invoiceData.invoiceNumber },
    });

    if (existingInvoice) {
      return NextResponse.json(
        { error: 'Ya existe una factura con este número' },
        { status: 400 }
      );
    }

    // Crear factura
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

    // Incrementar consumo
    await consumeInvoiceLimit(userId);

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
      remainingInvoices: limitStatus.remaining - 1,
    });
  } catch (error) {
    console.error('Error al guardar factura:', error);

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
