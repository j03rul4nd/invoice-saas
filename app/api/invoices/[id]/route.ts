import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE - Eliminar factura
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const invoiceId = params.id;

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

    return NextResponse.json({ message: 'Factura eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar factura:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}