import { useState } from 'react';

interface UsePublicInvoiceDownloadProps {
  token: string;
  invoiceId: string;
  invoiceNumber: string;
  currency?: string;
}

interface UsePublicInvoiceDownloadReturn {
  isDownloading: boolean;
  downloadError: string | null;
  downloadPDF: () => Promise<void>;
}

export function usePublicInvoiceDownload({
  token,
  invoiceId,
  invoiceNumber,
  currency = 'EUR'
}: UsePublicInvoiceDownloadProps): UsePublicInvoiceDownloadReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const downloadPDF = async () => {
    if (isDownloading) {
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const downloadUrl = `/api/invoices/public/${token}/download`;

      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al descargar la factura';
        
        try {
          const responseText = await response.text();
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          if (response.status === 404) {
            errorMessage = 'Factura no encontrada';
          } else if (response.status === 410) {
            errorMessage = 'El enlace de descarga ha expirado';
          } else if (response.status === 500) {
            errorMessage = 'Error interno del servidor';
          }
        }
        
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('El archivo PDF está vacío');
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const filename = `factura-${invoiceNumber}-${currency.toLowerCase()}.pdf`;
      
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al descargar la factura';
      
      setDownloadError(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    downloadError,
    downloadPDF,
  };
}