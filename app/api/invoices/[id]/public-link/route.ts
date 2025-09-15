import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

// ✅ Función helper para construir la URL base correctamente
function getBaseUrl(): string {
  // Verificar si estamos en Vercel y usar VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Variables de entorno personalizadas
  const productionUrl = process.env.PRODUCTION_URL;
  const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fallbackUrl = 'http://localhost:3000';
  
  let baseUrl = productionUrl || publicUrl || fallbackUrl;
  
  // ✅ Limpiar URL duplicadas y normalizar
  // Si la URL contiene el dominio duplicado, limpiarlo
  if (baseUrl.includes('rapidinvoice.eu/rapidinvoice.eu')) {
    baseUrl = baseUrl.replace('/rapidinvoice.eu/invoice/public/', '/invoice/public/');
    baseUrl = 'https://rapidinvoice.eu';
  }
  
  // ✅ Asegurarse de que tenga https:// al inicio si es production
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = baseUrl.includes('localhost') ? `http://${baseUrl}` : `https://${baseUrl}`;
  }
  
  // ✅ Eliminar barra final si existe para consistencia
  baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  console.log('🔍 getBaseUrl() result:', baseUrl); // Para debugging
  
  return baseUrl;
}

// ✅ POST: Generar enlace público
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: invoiceId } = await context.params;

    // Verificar que la factura pertenece al usuario
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // ✅ Verificar si ya tiene un enlace público activo
    if (invoice.isPublic && invoice.publicToken) {
      // Si ya existe, devolver el enlace actual
      const baseUrl = getBaseUrl();
      const publicUrl = `${baseUrl}/invoice/public/${invoice.publicToken}`;
      
      console.log('🔗 Returning existing public URL:', publicUrl); // Para debugging
      
      return NextResponse.json({
        success: true,
        publicUrl,
        publicToken: invoice.publicToken,
        message: 'Enlace público ya existe'
      });
    }

    // Generar nuevo token único
    const publicToken = nanoid(32);

    // Actualizar la factura con el token público
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        publicToken,
        isPublic: true,
        // ✅ Establecer fecha de expiración (30 días)
        publicExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    const baseUrl = getBaseUrl();
    const publicUrl = `${baseUrl}/invoice/public/${publicToken}`;
    
    console.log('🔗 Generated new public URL:', publicUrl); // Para debugging

    return NextResponse.json({
      success: true,
      publicUrl,
      publicToken,
      createdAt: updatedInvoice.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error('Error generating public link:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      success: false 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ DELETE: Desactivar enlace público
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: invoiceId } = await context.params;

    // Verificar que la factura pertenece al usuario
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // Desactivar enlace público
    await prisma.invoice.update({
      where: {
        id: invoiceId,
        userId: userId,
      },
      data: {
        publicToken: null,
        isPublic: false,
        publicExpiresAt: null,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Enlace público eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error disabling public link:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      success: false 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ GET: Obtener estado del enlace público
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id: invoiceId } = await context.params;

    // Obtener la factura con su información de enlace público
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: userId,
      },
      select: {
        id: true,
        publicToken: true,
        isPublic: true,
        publicExpiresAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 });
    }

    // Si no tiene enlace público, devolver estado
    if (!invoice.isPublic || !invoice.publicToken) {
      return NextResponse.json({
        success: true,
        isPublic: false,
        publicToken: null,
        publicUrl: null,
      });
    }

    // ✅ Verificar si el enlace ha expirado
    const isExpired = invoice.publicExpiresAt && new Date() > invoice.publicExpiresAt;
    
    if (isExpired) {
      // Auto-limpiar enlaces expirados
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          publicToken: null,
          isPublic: false,
          publicExpiresAt: null,
        },
      });

      return NextResponse.json({
        success: true,
        isPublic: false,
        publicToken: null,
        publicUrl: null,
        message: 'Enlace público expirado y eliminado'
      });
    }

    // Si tiene enlace público válido, devolver información completa
    const baseUrl = getBaseUrl();
    const publicUrl = `${baseUrl}/invoice/public/${invoice.publicToken}`;
    
    console.log('🔗 Retrieved public URL:', publicUrl); // Para debugging

    return NextResponse.json({
      success: true,
      isPublic: invoice.isPublic,
      publicToken: invoice.publicToken,
      publicUrl: publicUrl,
      createdAt: invoice.createdAt.toISOString(),
      expiresAt: invoice.publicExpiresAt?.toISOString() || null,
    });

  } catch (error) {
    console.error('Error getting public link:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      success: false 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}