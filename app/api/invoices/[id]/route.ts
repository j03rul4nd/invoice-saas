import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos para los campos JSON
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

// Tipo para los datos de entrada de la solicitud PUT
interface InvoiceUpdateInput {
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  company?: CompanyInfo;
  currency?: string;
  client?: ClientInfo;
  items?: InvoiceItem[];
  notes?: string;
  subtotal?: number;
  tax?: number;
  taxRate?: number;
  total?: number;
}

// GET - Obtener una factura específica
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: invoiceId } = await params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId
      }
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // Formatear los datos para el frontend
    const formattedInvoice = {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      dueDate: invoice.dueDate,
      company: invoice.companyData as CompanyInfo,
      currency: invoice.currency,
      client: invoice.clientData as ClientInfo,
      items: invoice.items as InvoiceItem[],
      notes: invoice.notes,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      taxRate: invoice.taxRate,
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };

    return NextResponse.json({ invoice: formattedInvoice });
  } catch (error) {
    console.error('Error al obtener factura:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// PUT - Actualizar factura existente
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: invoiceId } = await params;
    const updateData: InvoiceUpdateInput = await request.json();

    // Verificar que la factura existe y pertenece al usuario
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId
      }
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // Si se está actualizando el número de factura, verificar que no exista otro con el mismo número
    if (updateData.invoiceNumber && updateData.invoiceNumber !== existingInvoice.invoiceNumber) {
      const duplicateInvoice = await prisma.invoice.findFirst({
        where: {
          userId,
          invoiceNumber: updateData.invoiceNumber,
          id: { not: invoiceId }, // Excluir la factura actual
        },
      });

      if (duplicateInvoice) {
        return NextResponse.json(
          { error: 'Ya existe una factura con este número' },
          { status: 400 }
        );
      }
    }

    // Preparar los datos para la actualización
    const updatePayload: any = {};
    
    if (updateData.invoiceNumber !== undefined) updatePayload.invoiceNumber = updateData.invoiceNumber;
    if (updateData.date !== undefined) updatePayload.date = updateData.date;
    if (updateData.dueDate !== undefined) updatePayload.dueDate = updateData.dueDate;
    if (updateData.company !== undefined) updatePayload.companyData = updateData.company;
    if (updateData.currency !== undefined) updatePayload.currency = updateData.currency;
    if (updateData.client !== undefined) updatePayload.clientData = updateData.client;
    if (updateData.items !== undefined) updatePayload.items = updateData.items;
    if (updateData.notes !== undefined) updatePayload.notes = updateData.notes;
    if (updateData.subtotal !== undefined) updatePayload.subtotal = updateData.subtotal;
    if (updateData.tax !== undefined) updatePayload.tax = updateData.tax;
    if (updateData.taxRate !== undefined) updatePayload.taxRate = updateData.taxRate;
    if (updateData.total !== undefined) updatePayload.total = updateData.total;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: updatePayload,
    });

    return NextResponse.json({
      message: 'Factura actualizada exitosamente',
      invoice: {
        id: updatedInvoice.id,
        invoiceNumber: updatedInvoice.invoiceNumber,
        date: updatedInvoice.date,
        currency: updatedInvoice.currency,
        total: updatedInvoice.total,
        updatedAt: updatedInvoice.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error al actualizar factura:', error);
    
    // Manejar errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Ya existe una factura con estos datos únicos' },
          { status: 400 }
        );
      }
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Factura no encontrada' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// DELETE - Eliminar factura
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: invoiceId } = await params;

    // Verificar que la factura pertenece al usuario
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId
      }
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // Eliminar la factura
    await prisma.invoice.delete({
      where: { id: invoiceId }
    });

    return NextResponse.json({ 
      message: 'Factura eliminada exitosamente',
      deletedInvoiceId: invoiceId
    });
  } catch (error) {
    console.error('Error al eliminar factura:', error);
    
    // Manejar errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Factura no encontrada' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}