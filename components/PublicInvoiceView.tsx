// components/PublicInvoiceView.tsx - Versión con multiidioma integrado
'use client';

import { usePublicInvoiceTranslation } from "@/hooks/useLanguage";
import { Language, languageNames } from "@/lib/i18n";

interface PublicInvoiceViewProps {
  invoice: {
    id: string;
    invoiceNumber: string;
    date: string; // String en tu schema
    dueDate: string; // String en tu schema
    companyData: any; // JSON en tu schema
    clientData: any; // JSON en tu schema
    items: any; // JSON array en tu schema
    currency: string;
    notes?: string | null;
    subtotal: number; // Float en tu schema
    tax: number; // Float en tu schema
    taxRate: number; // Float en tu schema
    total: number; // Float en tu schema
    publicToken?: string | null;
    isPublic: boolean;
    publicExpiresAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: {
      name: string | null;
      email: string;
    };
  };
}

export default function PublicInvoiceView({ invoice }: PublicInvoiceViewProps) {
  const { t, language, changeLanguage, isClient } = usePublicInvoiceTranslation();

  // Loading state durante la hidratación
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return t.paid;
      case 'pending':
        return t.pending;
      case 'overdue':
        return t.overdue;
      case 'cancelled':
        return t.cancelled;
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'en' ? 'en-US' : 
      language === 'es' ? 'es-ES' :
      language === 'pt' ? 'pt-BR' :
      language === 'ja' ? 'ja-JP' :
      language === 'fr' ? 'fr-FR' : 'de-DE'
    );
  };

  // Función para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(
      language === 'en' ? 'en-US' : 
      language === 'es' ? 'es-ES' :
      language === 'pt' ? 'pt-BR' :
      language === 'ja' ? 'ja-JP' :
      language === 'fr' ? 'fr-FR' : 'de-DE',
      {
        style: 'currency',
        currency: invoice.currency || 'EUR'
      }
    ).format(amount);
  };

  // Como no tienes campo status, vamos a simular uno basado en las fechas
  const getInvoiceStatus = () => {
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    
    // Si la fecha de vencimiento ya pasó, está vencida
    if (dueDate < today) {
      return 'overdue';
    }
    // Si está cerca de vencer (menos de 7 días), pendiente
    return 'pending';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de descarga - con efecto glass */}
        <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h1 className="text-2xl font-bold text-white">
              {t.invoiceTitle} {invoice.invoiceNumber}
            </h1>
          </div>
          <button
            onClick={() => {
              // Aquí implementarías la funcionalidad de descarga PDF
              alert(`${t.downloadPdf} - ${t.invoiceTitle} ${invoice.invoiceNumber}`);
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-200 px-4 py-2 rounded-lg"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t.downloadPdf}
          </button>
        </div>

        {/* Contenedor principal de la factura - fondo blanco limpio */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/30">
          <div className="relative p-8">
            {/* Header de la factura */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.invoiceTitle}</h1>
                <p className="text-gray-500 text-lg">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p className="mb-0">{t.issuedOn}: {formatDate(invoice.date)}</p>
                <p className="mb-0">{t.dueDate}: {formatDate(invoice.dueDate)}</p>
              </div>
            </div>
            {/* Información de empresa y cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.fromLabel}:</h3>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-900">{invoice.companyData?.name || invoice.user.name || 'N/A'}</p>
                  {(invoice.companyData?.email || invoice.user.email) && <p>{invoice.companyData?.email || invoice.user.email}</p>}
                  {invoice.companyData?.phone && <p>{invoice.companyData.phone}</p>}
                  {invoice.companyData?.taxId && <p>{invoice.companyData.taxId}</p>}
                  {invoice.companyData?.address && (
                    <p className="whitespace-pre-line">{invoice.companyData.address}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.toLabel}:</h3>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-900">{invoice.clientData?.name || 'N/A'}</p>
                  {invoice.clientData?.email && <p>{invoice.clientData.email}</p>}
                  {invoice.clientData?.phone && <p>{invoice.clientData.phone}</p>}
                  {invoice.clientData?.address && (
                    <p className="whitespace-pre-line">{invoice.clientData.address}</p>
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
                      {t.description}
                    </th>
                    <th className="text-center py-2 px-2 text-sm font-semibold text-gray-900">
                      {t.quantity}
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-900">
                      {t.unitPrice}
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-900">
                      {t.total}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Renderizar items desde invoice.items array */}
                  {invoice.items && Array.isArray(invoice.items) ? (
                    invoice.items.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-2 text-sm text-gray-700">
                          {item.description || item.name || 'N/A'}
                        </td>
                        <td className="text-center py-3 px-2 text-sm text-gray-700">
                          {item.quantity || 1}
                        </td>
                        <td className="text-right py-3 px-2 text-sm text-gray-700">
                          {formatCurrency(item.unitPrice || item.price || 0)}
                        </td>
                        <td className="text-right py-3 px-2 text-sm text-gray-700">
                          {formatCurrency((item.quantity || 1) * (item.unitPrice || item.price || 0))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-700">
                        {t.invoiceTitle} {invoice.invoiceNumber}
                      </td>
                      <td className="text-center py-3 px-2 text-sm text-gray-700">1</td>
                      <td className="text-right py-3 px-2 text-sm text-gray-700">
                        {formatCurrency(invoice.subtotal)}
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-700">
                        {formatCurrency(invoice.subtotal)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totales - alineados a la derecha como en el HTML */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">{t.subtotal}:</span>
                  <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.tax > 0 && (
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-600">{t.tax} ({invoice.taxRate}%):</span>
                    <span className="text-gray-900">{formatCurrency(invoice.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 pt-4 text-lg font-semibold border-t border-gray-200">
                  <span className="text-gray-600">{t.finalAmount}:</span>
                  <span className="text-gray-900">{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>

            {/* Notas */}
            {invoice.notes && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Notes' : 
                   language === 'es' ? 'Notas' :
                   language === 'pt' ? 'Notas' :
                   language === 'ja' ? 'ノート' :
                   language === 'fr' ? 'Notes' : 'Notizen'}:
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {invoice.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-white/60">
          <p>{t.footerText}</p>
        </div>
      </div>
    </div>
  );
}