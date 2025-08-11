// hooks/usePublicLinks.ts
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface PublicLinkData {
  publicId: string;
  publicUrl: string;
  isPublic: boolean;
  createdAt: string;
}

interface PublicLinkState {
  [invoiceId: string]: PublicLinkData;
}

export function usePublicLinks() {
  const [publicLinks, setPublicLinks] = useState<PublicLinkState>({});
  const [generatingLink, setGeneratingLink] = useState<string | null>(null);
  const [removingLink, setRemovingLink] = useState<string | null>(null);
  const [copyingLink, setCopyingLink] = useState<string | null>(null);

  // ✅ Generar enlace público
  const generatePublicLink = useCallback(async (invoiceId: string): Promise<{ success: boolean; publicUrl?: string }> => {
    setGeneratingLink(invoiceId);
    
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/public-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const publicLinkData: PublicLinkData = {
          publicId: data.publicId,
          publicUrl: data.publicUrl,
          isPublic: true,
          createdAt: data.createdAt
        };

        // Actualizar estado local
        setPublicLinks(prev => ({
          ...prev,
          [invoiceId]: publicLinkData
        }));

        toast.success('Enlace público generado exitosamente');
        return { 
          success: true, 
          publicUrl: data.publicUrl 
        };
      } else {
        toast.error(data.error || 'Error al generar enlace público');
        return { success: false };
      }
    } catch (error) {
      console.error('Error generating public link:', error);
      toast.error('Error de conexión al generar enlace público');
      return { success: false };
    } finally {
      setGeneratingLink(null);
    }
  }, []);

  // ✅ Eliminar enlace público
  const removePublicLink = useCallback(async (invoiceId: string): Promise<boolean> => {
    setRemovingLink(invoiceId);
    
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/public-link`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Eliminar del estado local
        setPublicLinks(prev => {
          const newState = { ...prev };
          delete newState[invoiceId];
          return newState;
        });

        toast.success('Enlace público eliminado exitosamente');
        return true;
      } else {
        toast.error(data.error || 'Error al eliminar enlace público');
        return false;
      }
    } catch (error) {
      console.error('Error removing public link:', error);
      toast.error('Error de conexión al eliminar enlace público');
      return false;
    } finally {
      setRemovingLink(null);
    }
  }, []);

  // ✅ Copiar enlace al portapapeles
  const copyPublicLink = useCallback(async (invoiceId: string, publicUrl: string): Promise<boolean> => {
    setCopyingLink(invoiceId);
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(publicUrl);
      } else {
        // Fallback para navegadores sin soporte de clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = publicUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('No se pudo copiar al portapapeles');
        }
      }
      
      toast.success('Enlace copiado al portapapeles');
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Error al copiar enlace');
      return false;
    } finally {
      setCopyingLink(null);
    }
  }, []);

  // ✅ Abrir enlace público en nueva pestaña
  const openPublicLink = useCallback((publicUrl: string) => {
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  }, []);

  // ✅ Verificar si una factura tiene enlace público
  const hasPublicLink = useCallback((invoiceId: string): boolean => {
    return !!publicLinks[invoiceId]?.isPublic;
  }, [publicLinks]);

  // ✅ Obtener datos del enlace público
  const getPublicLinkData = useCallback((invoiceId: string): PublicLinkData | null => {
    return publicLinks[invoiceId] || null;
  }, [publicLinks]);

  // ✅ Cargar enlaces públicos existentes para una lista de facturas
  const loadPublicLinksForInvoices = useCallback(async (invoiceIds: string[]) => {
    try {
      const response = await fetch('/api/invoices/public-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceIds }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPublicLinks(data.publicLinks || {});
      }
    } catch (error) {
      console.error('Error loading public links:', error);
    }
  }, []);

  // ✅ Generar y copiar automáticamente
  const generateAndCopyPublicLink = useCallback(async (invoiceId: string): Promise<boolean> => {
    const result = await generatePublicLink(invoiceId);
    if (result.success && result.publicUrl) {
      return await copyPublicLink(invoiceId, result.publicUrl);
    }
    return false;
  }, [generatePublicLink, copyPublicLink]);

  // ✅ Alternar estado del enlace público (generar o eliminar)
  const togglePublicLink = useCallback(async (invoiceId: string): Promise<boolean> => {
    const hasLink = hasPublicLink(invoiceId);
    
    if (hasLink) {
      return await removePublicLink(invoiceId);
    } else {
      const result = await generatePublicLink(invoiceId);
      return result.success;
    }
  }, [hasPublicLink, removePublicLink, generatePublicLink]);

  return {
    // Estado
    publicLinks,
    generatingLink,
    removingLink,
    copyingLink,

    // Funciones principales
    generatePublicLink,
    removePublicLink,
    copyPublicLink,
    openPublicLink,

    // Funciones de utilidad
    hasPublicLink,
    getPublicLinkData,
    loadPublicLinksForInvoices,

    // Funciones combinadas
    generateAndCopyPublicLink,
    togglePublicLink,

    // Estados de loading específicos
    isGenerating: (invoiceId: string) => generatingLink === invoiceId,
    isRemoving: (invoiceId: string) => removingLink === invoiceId,
    isCopying: (invoiceId: string) => copyingLink === invoiceId,
  };
}