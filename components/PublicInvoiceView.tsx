'use client';

import { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PublicInvoiceViewProps {
  invoice: any; // Usa el tipo correcto según tu schema
}

export default function PublicInvoiceView({ invoice }: PublicInvoiceViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/invoices/public/${invoice.publicToken}/download`);
      
      if (!response.ok) {
        throw new Error('Error al descargar la factura');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `Factura-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al descargar la factura');
    } finally {
      setIsDownloading(false);
    }
  };

  const companyData = invoice.companyData as any;
  const clientData = invoice.clientData as any;
  const items = invoice.items as any[];

  const formatWithCurrency = (amount: number) => {
    return `${amount.toFixed(2)} ${invoice.currency}`;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de descarga - con efecto glass */}
        <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">
              Factura {invoice.invoiceNumber}
            </h1>
          </div>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Descargando...' : 'Descargar PDF'}
          </Button>
        </div>

        {/* Contenedor principal de la factura - fondo blanco limpio */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/30">
          <div className="relative p-8">
            

            {/* Header de la factura */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Factura</h1>
                <p className="text-gray-500 text-lg">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p className="mb-0">Fecha: {invoice.date}</p>
                <p className="mb-0">Vencimiento: {invoice.dueDate}</p>
              </div>
            </div>

            {/* Información de empresa y cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">De:</h3>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-900">{companyData.name}</p>
                  {companyData.email && <p>{companyData.email}</p>}
                  {companyData.phone && <p>{companyData.phone}</p>}
                  {companyData.taxId && <p>{companyData.taxId}</p>}
                  {companyData.address && (
                    <p className="whitespace-pre-line">{companyData.address}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Para:</h3>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-900">{clientData.name}</p>
                  {clientData.email && <p>{clientData.email}</p>}
                  {clientData.phone && <p>{clientData.phone}</p>}
                  {clientData.address && (
                    <p className="whitespace-pre-line">{clientData.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tabla de items */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-900">
                      Descripción
                    </th>
                    <th className="text-center py-2 px-2 text-sm font-semibold text-gray-900">
                      Cantidad
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-900">
                      Precio
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-900">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-700">
                        {item.description}
                      </td>
                      <td className="text-center py-3 px-2 text-sm text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-700">
                        {formatWithCurrency(item.price)}
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-700">
                        {formatWithCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totales - alineados a la derecha como en el HTML */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">{formatWithCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">IVA ({invoice.taxRate}%):</span>
                  <span className="text-gray-900">{formatWithCurrency(invoice.tax)}</span>
                </div>
                <div className="flex justify-between py-2 pt-4 text-lg font-semibold border-t border-gray-200">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-900">{formatWithCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>

            {/* Notas */}
            {invoice.notes && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Notas:</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {invoice.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-white/60">
          <p>Esta es una factura generada digitalmente.</p>
        </div>
      </div>
    </div>
  );
}