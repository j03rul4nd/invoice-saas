// lib/currency.ts
import { Currency, SUPPORTED_CURRENCIES } from '@/hooks/useCurrency';

/**
 * Obtiene la moneda por defecto basada en la configuración del navegador o ubicación
 * @returns Currency - La moneda por defecto detectada
 */
export function getDefaultCurrency(): Currency {
  // Intentar detectar la moneda por el idioma/región del navegador
  try {
    const locale = navigator.language || 'en-US';
    
    // Mapeo de locales a monedas
    const localeToCurrency: Record<string, string> = {
      'es-ES': 'EUR',
      'es-': 'EUR', // Cualquier español que no sea específico
      'en-US': 'USD',
      'en-GB': 'GBP',
      'ja-JP': 'JPY',
      'en-CA': 'CAD',
      'en-AU': 'AUD',
      'de-CH': 'CHF',
      'fr-CH': 'CHF',
      'sv-SE': 'SEK',
      'de-DE': 'EUR',
      'fr-FR': 'EUR',
      'it-IT': 'EUR',
      'pt-PT': 'EUR',
      'nl-NL': 'EUR',
    };
    
    // Buscar coincidencia exacta primero
    let currencyCode = localeToCurrency[locale];
    
    // Si no hay coincidencia exacta, buscar por prefijo de idioma
    if (!currencyCode) {
      const languagePrefix = locale.split('-')[0];
      const matchingLocale = Object.keys(localeToCurrency).find(key => 
        key.startsWith(languagePrefix + '-')
      );
      if (matchingLocale) {
        currencyCode = localeToCurrency[matchingLocale];
      }
    }
    
    // Si encontramos una moneda, verificar que esté soportada
    if (currencyCode) {
      const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
      if (currency) {
        return currency;
      }
    }
  } catch (error) {
    console.warn('Error detecting locale for currency:', error);
  }
  
  // Fallback a EUR como moneda por defecto
  return SUPPORTED_CURRENCIES.find(c => c.code === 'EUR') || SUPPORTED_CURRENCIES[0];
}

/**
 * Obtiene una moneda por su código
 * @param code - Código de la moneda (ej: 'EUR', 'USD')
 * @returns Currency | undefined
 */
export function getCurrencyByCode(code: string): Currency | undefined {
  return SUPPORTED_CURRENCIES.find(c => c.code === code);
}

/**
 * Valida si un código de moneda es soportado
 * @param code - Código de la moneda
 * @returns boolean
 */
export function isSupportedCurrency(code: string): boolean {
  return SUPPORTED_CURRENCIES.some(c => c.code === code);
}

/**
 * Obtiene la lista de códigos de moneda soportados
 * @returns string[]
 */
export function getSupportedCurrencyCodes(): string[] {
  return SUPPORTED_CURRENCIES.map(c => c.code);
}