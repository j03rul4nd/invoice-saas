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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header con botón de descarga */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Factura {invoice.invoiceNumber}
          </h1>
        </div>
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? 'Descargando...' : 'Descargar PDF'}
        </Button>
      </div>

      {/* Contenido de la factura */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Header de la factura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">De:</h2>
            <div className="text-gray-700">
              <p className="font-semibold">{companyData.name}</p>
              <p>{companyData.address}</p>
              <p>{companyData.city}, {companyData.zipCode}</p>
              {companyData.country && <p>{companyData.country}</p>}
              {companyData.email && <p>Email: {companyData.email}</p>}
              {companyData.phone && <p>Teléfono: {companyData.phone}</p>}
              {companyData.taxId && <p>NIF/CIF: {companyData.taxId}</p>}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Para:</h2>
            <div className="text-gray-700">
              <p className="font-semibold">{clientData.name}</p>
              <p>{clientData.address}</p>
              <p>{clientData.city}, {clientData.zipCode}</p>
              {clientData.country && <p>{clientData.country}</p>}
              {clientData.email && <p>Email: {clientData.email}</p>}
              {clientData.phone && <p>Teléfono: {clientData.phone}</p>}
              {clientData.taxId && <p>NIF/CIF: {clientData.taxId}</p>}
            </div>
          </div>
        </div>

        {/* Información de la factura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Número de Factura</p>
            <p className="font-semibold">{invoice.invoiceNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha</p>
            <p className="font-semibold">{invoice.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha de Vencimiento</p>
            <p className="font-semibold">{invoice.dueDate}</p>
          </div>
        </div>

        {/* Tabla de items */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Descripción</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Cantidad</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Precio</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">{item.description}</td>
                  <td className="text-right py-3 px-4 text-gray-700">{item.quantity}</td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {item.price.toFixed(2)} {invoice.currency}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {item.total.toFixed(2)} {invoice.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3">
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700">{invoice.subtotal.toFixed(2)} {invoice.currency}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">IVA ({invoice.taxRate}%):</span>
              <span className="text-gray-700">{invoice.tax.toFixed(2)} {invoice.currency}</span>
            </div>
            <div className="flex justify-between py-2 text-xl font-bold border-t border-gray-200">
              <span>Total:</span>
              <span>{invoice.total.toFixed(2)} {invoice.currency}</span>
            </div>
          </div>
        </div>

        {/* Notas */}
        {invoice.notes && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Notas:</h3>
            <p className="text-gray-700">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>Esta es una factura generada digitalmente.</p>
      </div>
    </div>
  );
}