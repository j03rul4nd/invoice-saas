// hooks/useInvoiceLanguage.ts - Hook específico para el idioma de las FACTURAS (no de la interfaz)

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

// Tipos específicos para idiomas de facturas
export type InvoiceLanguageCode = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'ja' | 'zh' | 'ar';

// ✅ EXPORTAR el tipo InvoiceLanguage
export interface InvoiceLanguage {
  code: InvoiceLanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

interface UseInvoiceLanguageReturn {
  currentInvoiceLanguage: InvoiceLanguage;
  defaultInvoiceLanguage: InvoiceLanguage;
  isLoading: boolean;
  error: string | null;
  updateUserInvoiceLanguage: (languageCode: InvoiceLanguageCode) => Promise<boolean>;
}

// Idiomas disponibles para facturas (más extenso que la interfaz)
export const AVAILABLE_INVOICE_LANGUAGES: InvoiceLanguage[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];

const DEFAULT_INVOICE_LANGUAGE = AVAILABLE_INVOICE_LANGUAGES.find(lang => lang.code === 'es') || AVAILABLE_INVOICE_LANGUAGES[0];

export const useInvoiceLanguage = (): UseInvoiceLanguageReturn => {
  const { user, isLoaded } = useUser();
  const [currentInvoiceLanguage, setCurrentInvoiceLanguage] = useState<InvoiceLanguage>(DEFAULT_INVOICE_LANGUAGE);
  const [defaultInvoiceLanguage, setDefaultInvoiceLanguage] = useState<InvoiceLanguage>(DEFAULT_INVOICE_LANGUAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función helper para convertir código a InvoiceLanguage
  const getInvoiceLanguageInfo = useCallback((code: InvoiceLanguageCode): InvoiceLanguage => {
    return AVAILABLE_INVOICE_LANGUAGES.find(lang => lang.code === code) || DEFAULT_INVOICE_LANGUAGE;
  }, []);

  // Cargar idioma preferido para facturas del usuario
  useEffect(() => {
    const loadUserInvoiceLanguage = async () => {
      if (!isLoaded || !user) {
        // Si no está logueado, usar idioma por defecto
        setCurrentInvoiceLanguage(DEFAULT_INVOICE_LANGUAGE);
        setDefaultInvoiceLanguage(DEFAULT_INVOICE_LANGUAGE);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Llamar a la API para obtener las preferencias del usuario
        const response = await fetch('/api/user/preferences');
        
        if (response.ok) {
          const preferences = await response.json();
          // Nuevo campo específico para idioma de facturas
          const userInvoiceLanguageCode = preferences.preferredInvoiceLanguage as InvoiceLanguageCode || 'es';
          
          const userInvoiceLanguage = getInvoiceLanguageInfo(userInvoiceLanguageCode);
          
          setCurrentInvoiceLanguage(userInvoiceLanguage);
          setDefaultInvoiceLanguage(userInvoiceLanguage);
        } else {
          // Si no se pueden cargar las preferencias, usar el idioma por defecto
          setCurrentInvoiceLanguage(DEFAULT_INVOICE_LANGUAGE);
          setDefaultInvoiceLanguage(DEFAULT_INVOICE_LANGUAGE);
        }
      } catch (err) {
        console.error('Error loading user invoice language:', err);
        setError('Error al cargar el idioma de facturas del usuario');
        setCurrentInvoiceLanguage(DEFAULT_INVOICE_LANGUAGE);
        setDefaultInvoiceLanguage(DEFAULT_INVOICE_LANGUAGE);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInvoiceLanguage();
  }, [user, isLoaded, getInvoiceLanguageInfo]);

  // Función para actualizar el idioma preferido para facturas
  const updateUserInvoiceLanguage = useCallback(async (languageCode: InvoiceLanguageCode): Promise<boolean> => {
    const newInvoiceLanguage = getInvoiceLanguageInfo(languageCode);

    if (!user) {
      // Si no está logueado, solo cambiar localmente
      setCurrentInvoiceLanguage(newInvoiceLanguage);
      return true;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferredInvoiceLanguage: languageCode,
        }),
      });

      if (response.ok) {
        setCurrentInvoiceLanguage(newInvoiceLanguage);
        setDefaultInvoiceLanguage(newInvoiceLanguage);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al actualizar el idioma de facturas');
        return false;
      }
    } catch (err) {
      console.error('Error updating user invoice language:', err);
      setError('Error de conexión al actualizar el idioma de facturas');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, getInvoiceLanguageInfo]);

  return {
    currentInvoiceLanguage,
    defaultInvoiceLanguage,
    isLoading,
    error,
    updateUserInvoiceLanguage,
  };
};