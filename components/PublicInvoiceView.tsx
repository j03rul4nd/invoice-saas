// components/PublicInvoiceView.tsx - Versión con hook de descarga integrado
'use client';

import { useState, useEffect } from 'react';
import { getInvoiceTexts, INVOICE_LANGUAGES, type InvoiceLanguageCode } from "@/utils/invoice-translations";
import { usePublicInvoiceDownload } from "@/hooks/usePublicInvoiceDownload";

interface PublicInvoiceViewProps {
  invoice: {
    id: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    companyData: any;
    clientData: any;
    items: any;
    currency: string;
    language: string; // Campo language de la factura
    notes?: string | null;
    subtotal: number;
    tax: number;
    taxRate: number;
    total: number;
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
  publicToken: string; // Necesitamos pasar el token desde la página
}

export default function PublicInvoiceView({ invoice, publicToken }: PublicInvoiceViewProps) {
  // Estado para el idioma actual (inicializado con el idioma de la factura)
  const [currentLanguage, setCurrentLanguage] = useState<InvoiceLanguageCode>(
    (invoice.language as InvoiceLanguageCode) || 'es'
  );
  
  // Estado para manejar la hidratación
  const [isClient, setIsClient] = useState(false);
  
  // Hook para descarga de PDF
  const { isDownloading, downloadError, downloadPDF } = usePublicInvoiceDownload({
    token: publicToken,
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    currency: invoice.currency
  });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Obtener traducciones para el idioma actual
  const t = getInvoiceTexts(currentLanguage);
  
  // Idioma original de la factura
  const originalLanguage = (invoice.language as InvoiceLanguageCode) || 'es';

  // Loading state durante la hidratación
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === 'en' ? 'en-US' : 
      currentLanguage === 'es' ? 'es-ES' :
      currentLanguage === 'pt' ? 'pt-BR' :
      currentLanguage === 'ja' ? 'ja-JP' :
      currentLanguage === 'fr' ? 'fr-FR' : 
      currentLanguage === 'de' ? 'de-DE' :
      currentLanguage === 'it' ? 'it-IT' :
      currentLanguage === 'ca' ? 'ca-ES' :
      currentLanguage === 'zh' ? 'zh-CN' :
      currentLanguage === 'ar' ? 'ar-SA' : 'es-ES'
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(
      currentLanguage === 'en' ? 'en-US' : 
      currentLanguage === 'es' ? 'es-ES' :
      currentLanguage === 'pt' ? 'pt-BR' :
      currentLanguage === 'ja' ? 'ja-JP' :
      currentLanguage === 'fr' ? 'fr-FR' : 
      currentLanguage === 'de' ? 'de-DE' :
      currentLanguage === 'it' ? 'it-IT' :
      currentLanguage === 'ca' ? 'ca-ES' :
      currentLanguage === 'zh' ? 'zh-CN' :
      currentLanguage === 'ar' ? 'ar-SA' : 'es-ES',
      {
        style: 'currency',
        currency: invoice.currency || 'EUR'
      }
    ).format(amount);
  };

  const getDownloadText = () => {
    return currentLanguage === 'en' ? 'Download PDF' : 
           currentLanguage === 'es' ? 'Descargar PDF' :
           currentLanguage === 'pt' ? 'Baixar PDF' :
           currentLanguage === 'ja' ? 'PDFダウンロード' :
           currentLanguage === 'fr' ? 'Télécharger PDF' : 
           currentLanguage === 'de' ? 'PDF herunterladen' :
           currentLanguage === 'it' ? 'Scarica PDF' :
           currentLanguage === 'ca' ? 'Descarregar PDF' :
           currentLanguage === 'zh' ? '下载PDF' :
           currentLanguage === 'ar' ? 'تحميل PDF' : 'Descargar PDF';
  };

  const getDownloadingText = () => {
    return currentLanguage === 'en' ? 'Downloading...' : 
           currentLanguage === 'es' ? 'Descargando...' :
           currentLanguage === 'pt' ? 'Baixando...' :
           currentLanguage === 'ja' ? 'ダウンロード中...' :
           currentLanguage === 'fr' ? 'Téléchargement...' : 
           currentLanguage === 'de' ? 'Herunterladen...' :
           currentLanguage === 'it' ? 'Scaricando...' :
           currentLanguage === 'ca' ? 'Descarregant...' :
           currentLanguage === 'zh' ? '下载中...' :
           currentLanguage === 'ar' ? 'جاري التحميل...' : 'Descargando...';
  };

  const getFooterText = () => {
    return currentLanguage === 'en' ? 'Invoice generated automatically' : 
           currentLanguage === 'es' ? 'Factura generada automáticamente' :
           currentLanguage === 'pt' ? 'Fatura gerada automaticamente' :
           currentLanguage === 'ja' ? '自動生成された請求書' :
           currentLanguage === 'fr' ? 'Facture générée automatiquement' : 
           currentLanguage === 'de' ? 'Automatisch erstellte Rechnung' :
           currentLanguage === 'it' ? 'Fattura generata automaticamente' :
           currentLanguage === 'ca' ? 'Factura generada automàticament' :
           currentLanguage === 'zh' ? '自动生成的发票' :
           currentLanguage === 'ar' ? 'فاتورة مُنشأة تلقائياً' : 'Factura generada automáticamente';
  };

  const handleDownloadClick = async () => {
    await downloadPDF();
  };

  return (
    <div className="min-h-screen py-8 px-4" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header con selector de idioma y botón de descarga */}
        <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h1 className="text-2xl font-bold text-white">
              {t.invoice.title} {invoice.invoiceNumber}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Selector de idioma */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as InvoiceLanguageCode)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
                style={{ backgroundImage: 'none' }}
              >
                {INVOICE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-gray-800 text-white">
                    {lang.flag} {lang.name}
                    {lang.code === originalLanguage ? ' (Original)' : ''}
                  </option>
                ))}
              </select>
              {/* Flecha personalizada */}
              <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Botón de descarga */}
            <button
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30 text-white transition-all duration-200 px-4 py-2 rounded-lg"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {getDownloadingText()}
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {getDownloadText()}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mensaje de error de descarga */}
        {downloadError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{downloadError}</p>
            </div>
          </div>
        )}

        {/* Indicador de idioma original si es diferente */}
        {currentLanguage !== originalLanguage && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              {currentLanguage === 'en' ? 'Original invoice language: ' : 
               currentLanguage === 'es' ? 'Idioma original de la factura: ' :
               currentLanguage === 'pt' ? 'Idioma original da fatura: ' :
               currentLanguage === 'ja' ? '元の請求書の言語: ' :
               currentLanguage === 'fr' ? 'Langue originale de la facture: ' : 
               currentLanguage === 'de' ? 'Originalsprache der Rechnung: ' :
               currentLanguage === 'it' ? 'Lingua originale della fattura: ' :
               currentLanguage === 'ca' ? 'Idioma original de la factura: ' :
               currentLanguage === 'zh' ? '发票原始语言: ' :
               currentLanguage === 'ar' ? 'لغة الفاتورة الأصلية: ' : 'Idioma original de la factura: '}
              <span className="font-medium">
                {INVOICE_LANGUAGES.find(lang => lang.code === originalLanguage)?.name || 'Español'}
              </span>
            </p>
          </div>
        )}

        {/* Contenedor principal de la factura */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/30">
          <div className="relative p-8">
            {/* Header de la factura */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.invoice.title}</h1>
                <p className="text-gray-500 text-lg">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p className="mb-0">{t.invoice.date}: {formatDate(invoice.date)}</p>
                <p className="mb-0">{t.invoice.dueDate}: {formatDate(invoice.dueDate)}</p>
              </div>
            </div>

            {/* Información de empresa y cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.invoice.from}</h3>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.invoice.to}</h3>
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
                      {t.table.description}
                    </th>
                    <th className="text-center py-2 px-2 text-sm font-semibold text-gray-900">
                      {t.table.quantity}
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-900">
                      {t.table.price}
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-900">
                      {t.table.total}
                    </th>
                  </tr>
                </thead>
                <tbody>
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
                        {t.invoice.title} {invoice.invoiceNumber}
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

            {/* Totales */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">{t.totals.subtotal}</span>
                  <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.tax > 0 && (
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-600">{t.totals.tax} ({invoice.taxRate}%):</span>
                    <span className="text-gray-900">{formatCurrency(invoice.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 pt-4 text-lg font-semibold border-t border-gray-200">
                  <span className="text-gray-600">{t.totals.total}</span>
                  <span className="text-gray-900">{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>

            {/* Notas */}
            {invoice.notes && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.other.notes}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {invoice.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-white/60">
          <p>{getFooterText()}</p>
        </div>
      </div>
    </div>
  );
}