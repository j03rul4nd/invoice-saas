// app/api/user/preferences/route.ts - Actualizado con soporte para idioma de facturas

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos para validación - Mantenemos consistencia con el hook
type InvoiceLanguageCode = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'ja' | 'zh' | 'ar';
type InterfaceLanguageCode = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca';

// GET - Obtener preferencias del usuario
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        preferredCurrency: true,
        preferredLanguage: true,
        // ✅ Agregamos el nuevo campo para idioma de facturas
        preferredInvoiceLanguage: true,
      }
    });

    if (!user) {
      // Si el usuario no existe, crearlo con valores por defecto
      const newUser = await prisma.user.create({
        data: {
          id: userId,
          email: '', // Se actualizará en el siguiente request
          preferredCurrency: 'EUR',
          preferredLanguage: 'es',
          preferredInvoiceLanguage: 'es', // ✅ Valor por defecto para idioma de facturas
        },
        select: {
          preferredCurrency: true,
          preferredLanguage: true,
          preferredInvoiceLanguage: true,
        }
      });

      return NextResponse.json(newUser);
    }

    // ✅ Si el usuario existe pero no tiene preferredInvoiceLanguage (migración)
    if (user.preferredInvoiceLanguage === null || user.preferredInvoiceLanguage === undefined) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          preferredInvoiceLanguage: 'es', // Valor por defecto
        },
        select: {
          preferredCurrency: true,
          preferredLanguage: true,
          preferredInvoiceLanguage: true,
        }
      });

      return NextResponse.json(updatedUser);
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar preferencias del usuario (campos específicos)
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      preferredCurrency, 
      preferredLanguage, 
      preferredInvoiceLanguage // ✅ Nuevo campo para idioma de facturas
    } = body;

    // Validación de tipos
    if (preferredLanguage && typeof preferredLanguage !== 'string') {
      return NextResponse.json(
        { error: 'El idioma de interfaz debe ser una cadena de texto' },
        { status: 400 }
      );
    }

    if (preferredInvoiceLanguage && typeof preferredInvoiceLanguage !== 'string') {
      return NextResponse.json(
        { error: 'El idioma de factura debe ser una cadena de texto' },
        { status: 400 }
      );
    }

    if (preferredCurrency && typeof preferredCurrency !== 'string') {
      return NextResponse.json(
        { error: 'La moneda debe ser una cadena de texto' },
        { status: 400 }
      );
    }

    // Validar idiomas de interfaz disponibles
    const validInterfaceLanguages: InterfaceLanguageCode[] = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ca'];
    if (preferredLanguage && !validInterfaceLanguages.includes(preferredLanguage as InterfaceLanguageCode)) {
      return NextResponse.json(
        { error: `Idioma de interfaz no válido. Valores permitidos: ${validInterfaceLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // ✅ Validar idiomas de facturas disponibles (más extenso que la interfaz)
    const validInvoiceLanguages: InvoiceLanguageCode[] = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ca', 'ja', 'zh', 'ar'];
    if (preferredInvoiceLanguage && !validInvoiceLanguages.includes(preferredInvoiceLanguage as InvoiceLanguageCode)) {
      return NextResponse.json(
        { error: `Idioma de factura no válido. Valores permitidos: ${validInvoiceLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // Crear objeto de actualización solo con campos definidos
    const updateData: {
      preferredCurrency?: string;
      preferredLanguage?: string;
      preferredInvoiceLanguage?: string;
    } = {};

    if (preferredCurrency !== undefined) updateData.preferredCurrency = preferredCurrency;
    if (preferredLanguage !== undefined) updateData.preferredLanguage = preferredLanguage;
    if (preferredInvoiceLanguage !== undefined) updateData.preferredInvoiceLanguage = preferredInvoiceLanguage;

    // Verificar que al menos un campo se está actualizando
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Al menos un campo debe ser proporcionado para actualizar' },
        { status: 400 }
      );
    }

    // Actualizar o crear usuario
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: updateData,
      create: {
        id: userId,
        email: '', // Se debe actualizar con el email real en otro endpoint
        preferredCurrency: preferredCurrency || 'EUR',
        preferredLanguage: preferredLanguage || 'es',
        preferredInvoiceLanguage: preferredInvoiceLanguage || 'es', // ✅ Campo para facturas
      },
      select: {
        preferredCurrency: true,
        preferredLanguage: true,
        preferredInvoiceLanguage: true, // ✅ Incluir en respuesta
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Preferencias actualizadas correctamente',
      data: user
    });

  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar todas las preferencias (reemplazar completamente)
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      preferredCurrency, 
      preferredLanguage, 
      preferredInvoiceLanguage // ✅ Nuevo campo obligatorio para PUT
    } = body;

    // Validación requerida para PUT (todos los campos obligatorios)
    if (!preferredCurrency || !preferredLanguage || !preferredInvoiceLanguage) {
      return NextResponse.json(
        { error: 'Los campos preferredCurrency, preferredLanguage y preferredInvoiceLanguage son obligatorios para PUT' },
        { status: 400 }
      );
    }

    // Validar tipos
    if (typeof preferredCurrency !== 'string' || typeof preferredLanguage !== 'string' || typeof preferredInvoiceLanguage !== 'string') {
      return NextResponse.json(
        { error: 'Todos los campos deben ser cadenas de texto' },
        { status: 400 }
      );
    }

    // Validar idiomas de interfaz
    const validInterfaceLanguages: InterfaceLanguageCode[] = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ca'];
    if (!validInterfaceLanguages.includes(preferredLanguage as InterfaceLanguageCode)) {
      return NextResponse.json(
        { error: `Idioma de interfaz no válido. Valores permitidos: ${validInterfaceLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // ✅ Validar idiomas de facturas
    const validInvoiceLanguages: InvoiceLanguageCode[] = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ca', 'ja', 'zh', 'ar'];
    if (!validInvoiceLanguages.includes(preferredInvoiceLanguage as InvoiceLanguageCode)) {
      return NextResponse.json(
        { error: `Idioma de factura no válido. Valores permitidos: ${validInvoiceLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // Actualizar o crear usuario con todos los campos
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        preferredCurrency,
        preferredLanguage,
        preferredInvoiceLanguage, // ✅ Nuevo campo
      },
      create: {
        id: userId,
        email: '', // Se debe actualizar con el email real en otro endpoint
        preferredCurrency,
        preferredLanguage,
        preferredInvoiceLanguage, // ✅ Nuevo campo
      },
      select: {
        preferredCurrency: true,
        preferredLanguage: true,
        preferredInvoiceLanguage: true, // ✅ Incluir en respuesta
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Todas las preferencias han sido actualizadas correctamente',
      data: user
    });

  } catch (error) {
    console.error('Error updating all user preferences:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}