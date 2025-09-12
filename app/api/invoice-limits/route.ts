// api/invoice-limits/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getInvoiceLimitStatus } from '@/lib/invoiceLimits';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    const limitStatus = await getInvoiceLimitStatus(userId);
    return NextResponse.json(limitStatus);
    
  } catch (error) {
    console.error('Error getting invoice limits:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}