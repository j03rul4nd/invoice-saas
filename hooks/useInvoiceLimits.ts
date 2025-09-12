// hooks/useInvoiceLimits.ts
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

export interface InvoiceLimitStatus {
  limit: number;
  used: number;
  remaining: number;
  resetDate: Date;
  canCreateInvoice: boolean;
}

interface UseInvoiceLimitsReturn {
  invoiceLimitStatus: InvoiceLimitStatus | null;
  loading: boolean;
  error: string | null;
  refreshLimits: () => Promise<void>;
}

export function useInvoiceLimits(): UseInvoiceLimitsReturn {
  const { user, isLoaded } = useUser();
  const [invoiceLimitStatus, setInvoiceLimitStatus] = useState<InvoiceLimitStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el estado actual de los límites
  const fetchInvoiceLimits = useCallback(async (): Promise<InvoiceLimitStatus | null> => {
    if (!user) return null;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/invoice-limits', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al obtener límites de facturas';
      setError(errorMessage);
      console.error('Error fetching invoice limits:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Función para refrescar los límites
  const refreshLimits = useCallback(async () => {
    const limits = await fetchInvoiceLimits();
    if (limits) {
      setInvoiceLimitStatus({
        ...limits,
        resetDate: new Date(limits.resetDate)
      });
    }
  }, [fetchInvoiceLimits]);

  // Efecto para cargar los límites inicialmente
  useEffect(() => {
    if (isLoaded && user) {
      refreshLimits();
    }
  }, [isLoaded, user, refreshLimits]);

  // Limpiar error y estado cuando el usuario cambie
  useEffect(() => {
    if (!user) {
      setInvoiceLimitStatus(null);
      setError(null);
    }
  }, [user]);

  return {
    invoiceLimitStatus,
    loading,
    error,
    refreshLimits
  };
}