import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

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

    // Aquí generas el PDF usando tu librería favorita (puppeteer, jsPDF, etc.)
    // Por ejemplo, usando puppeteer:
    
    // const pdf = await generateInvoicePDF(invoice);
    
    // return new NextResponse(pdf, {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename="Factura-${invoice.invoiceNumber}.pdf"`,
    //   },
    // });

    // Placeholder response - implementa tu generación de PDF aquí
    return NextResponse.json({ error: 'PDF generation not implemented' }, { status: 501 });

  } catch (error) {
    console.error('Error downloading public invoice:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}