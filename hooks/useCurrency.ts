// hooks/useCurrency.ts
import { useState, useEffect, useCallback } from 'react';
import { getDefaultCurrency, getCurrencyByCode } from '@/lib/currency';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  position: 'before' | 'after'; // Posición del símbolo
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', position: 'after' },
  { code: 'USD', symbol: '$', name: 'US Dollar', position: 'before' },
  { code: 'GBP', symbol: '£', name: 'British Pound', position: 'before' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', position: 'before' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', position: 'before' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', position: 'before' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', position: 'before' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', position: 'after' },
];

export const useCurrency = () => {
  // Inicializar con la moneda detectada automáticamente
  const [defaultCurrency, setDefaultCurrency] = useState<Currency>(() => getDefaultCurrency());
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => getDefaultCurrency());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener la moneda preferida del usuario
  const fetchUserCurrency = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/currency');
      if (response.ok) {
        const data = await response.json();
        const userCurrency = getCurrencyByCode(data.preferredCurrency);
        if (userCurrency) {
          setCurrentCurrency(userCurrency);
          setDefaultCurrency(userCurrency);
        }
      } else {
        // Si no hay moneda guardada, mantener la detectada automáticamente
        console.log('No saved currency found, using auto-detected default');
      }
    } catch (err) {
      console.error('Error fetching user currency:', err);
      // En caso de error, mantener la moneda detectada automáticamente
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para actualizar la moneda del usuario
  const updateUserCurrency = useCallback(async (currencyCode: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/currency', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferredCurrency: currencyCode }),
      });

      if (response.ok) {
        const newCurrency = getCurrencyByCode(currencyCode);
        if (newCurrency) {
          setCurrentCurrency(newCurrency);
          setDefaultCurrency(newCurrency);
        }
      } else {
        throw new Error('Failed to update currency');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error updating currency:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para formatear precio según la moneda actual
  const formatPrice = useCallback((amount: number, decimals = 2) => {
    const formattedAmount = amount.toFixed(decimals);
    
    if (currentCurrency.position === 'before') {
      return `${currentCurrency.symbol}${formattedAmount}`;
    } else {
      return `${formattedAmount}${currentCurrency.symbol}`;
    }
  }, [currentCurrency]);

  // Cargar moneda del usuario al montar el componente
  useEffect(() => {
    fetchUserCurrency();
  }, [fetchUserCurrency]);

  return {
    currentCurrency,
    defaultCurrency,
    supportedCurrencies: SUPPORTED_CURRENCIES,
    isLoading,
    error,
    updateUserCurrency,
    formatPrice,
    refreshUserCurrency: fetchUserCurrency,
  };
};