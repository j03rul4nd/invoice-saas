// app/api/user/currency/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lista de monedas soportadas (debe coincidir con tu hook)
const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'SEK'];

export async function GET() {
  let userId: string | null = null;
  
  try {
    const authResult = await auth();
    userId = authResult?.userId || null;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferredCurrency: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      preferredCurrency: user.preferredCurrency || 'EUR'
    });
    
  } catch (error) {
    console.error('Error fetching user currency:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest) {
  let userId: string | null = null;
  
  try {
    // Hacer await de auth() de forma consistente
    const authResult = await auth();
    userId = authResult?.userId || null;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { preferredCurrency } = body;

    // Validar que preferredCurrency existe en el body
    if (!preferredCurrency) {
      return NextResponse.json(
        { error: 'preferredCurrency is required' },
        { status: 400 }
      );
    }

    // Validar que la moneda es soportada
    if (!SUPPORTED_CURRENCIES.includes(preferredCurrency)) {
      return NextResponse.json(
        { error: 'Unsupported currency' },
        { status: 400 }
      );
    }

    // Actualizar o crear usuario con la nueva moneda
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { 
        preferredCurrency,
        updatedAt: new Date() // Asumiendo que tienes este campo
      },
      create: {
        id: userId,
        email: '', // Será actualizado por el webhook de Clerk
        preferredCurrency,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      select: { preferredCurrency: true }
    });

    return NextResponse.json({
      preferredCurrency: user.preferredCurrency
    });
    
  } catch (error) {
    console.error('Error updating user currency:', error);
    
    // Manejo más específico de errores de Prisma
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}