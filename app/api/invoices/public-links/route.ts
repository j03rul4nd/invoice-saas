import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Función helper para construir la URL base correctamente
function getBaseUrl(): string {
  const productionUrl = process.env.PRODUCTION_URL;
  const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fallbackUrl = 'http://localhost:3000';
  
  let baseUrl = productionUrl || publicUrl || fallbackUrl;
  
  // ✅ Eliminar barra final si existe para consistencia
  baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return baseUrl;
}

// POST: Obtener enlaces públicos para múltiples facturas
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { invoiceIds }: { invoiceIds: string[] } = await request.json();

    if (!invoiceIds || !Array.isArray(invoiceIds)) {
      return NextResponse.json({ error: 'invoiceIds debe ser un array' }, { status: 400 });
    }

    // Obtener facturas que pertenecen al usuario con sus datos de enlaces públicos
    const invoices = await prisma.invoice.findMany({
      where: {
        id: { in: invoiceIds },
        userId: userId,
        // ✅ Buscar todas las facturas del usuario, no solo las públicas
        // Esto permite mostrar el estado correcto para cada factura
      },
      select: {
        id: true,
        publicToken: true,
        isPublic: true,
        publicExpiresAt: true,
        createdAt: true,
      },
    });

    // Transformar los datos al formato esperado por el hook
    const publicLinks: Record<string, any> = {};
    
    invoices.forEach(invoice => {
      // ✅ Solo incluir facturas que realmente tienen enlace público activo
      if (invoice.isPublic && invoice.publicToken) {
        // ✅ Verificar si el enlace no ha expirado (si hay fecha de expiración)
        const isExpired = invoice.publicExpiresAt && new Date() > invoice.publicExpiresAt;
        
        if (!isExpired) {
          const publicUrl = `${getBaseUrl()}/invoice/public/${invoice.publicToken}`;
          
          publicLinks[invoice.id] = {
            publicId: invoice.publicToken,
            publicUrl: publicUrl,
            isPublic: invoice.isPublic,
            createdAt: invoice.createdAt.toISOString(),
            expiresAt: invoice.publicExpiresAt?.toISOString() || null,
          };
        }
      }
    });

    return NextResponse.json({
      success: true,
      publicLinks,
    });

  } catch (error) {
    console.error('Error loading public links:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      success: false 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}