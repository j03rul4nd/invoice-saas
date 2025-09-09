// components/InvoiceLanguageSelector.tsx - Selector específico para idioma de FACTURAS

'use client';

import React from 'react';
import { Languages, FileText } from 'lucide-react';
import { 
  InvoiceLanguageCode, 
  InvoiceLanguage, 
  AVAILABLE_INVOICE_LANGUAGES 
} from '@/hooks/useInvoiceLanguage'; // ✅ Importar todo desde el hook

interface InvoiceLanguageSelectorProps {
  currentInvoiceLanguage: InvoiceLanguage;
  onInvoiceLanguageChange: (languageCode: InvoiceLanguageCode) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
  compact?: boolean;
}

const InvoiceLanguageSelector: React.FC<InvoiceLanguageSelectorProps> = ({
  currentInvoiceLanguage,
  onInvoiceLanguageChange,
  isLoading = false,
  error = null,
  className = '',
  compact = false
}) => {
  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguageCode = e.target.value as InvoiceLanguageCode;
    await onInvoiceLanguageChange(newLanguageCode);
  };

  if (compact) {
    // Versión compacta
    return (
      <div className={`relative ${className}`}>
        <select
          value={currentInvoiceLanguage.code}
          onChange={handleLanguageChange}
          disabled={isLoading}
          className="appearance-none bg-transparent border border-gray-600/50 rounded-md 
                   px-2 py-1 text-white text-sm focus:border-purple-400 
                   focus:outline-none transition-colors min-w-[90px]
                   disabled:opacity-50 disabled:cursor-not-allowed"
          title="Idioma de la factura"
        >
          {AVAILABLE_INVOICE_LANGUAGES.map((language) => (
            <option key={language.code} value={language.code} className="bg-gray-800">
              {language.flag} {language.nativeName}
            </option>
          ))}
        </select>
        
        {isLoading && (
          <div className="absolute -bottom-4 left-0">
            <div className="text-xs text-blue-400 flex items-center gap-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Versión completa para formularios
  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col items-end">
        <label className="text-xs text-gray-400 mb-1 flex items-center gap-1">
          <FileText className="h-3 w-3" />
          <Languages className="h-3 w-3" />
          Idioma Factura
        </label>
        
        <select
          value={currentInvoiceLanguage.code}
          onChange={handleLanguageChange}
          disabled={isLoading}
          className="appearance-none bg-gray-800/50 border border-gray-600 rounded-lg 
                   px-3 py-2 text-white text-sm focus:border-purple-400 
                   focus:outline-none transition-colors min-w-[140px]
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {AVAILABLE_INVOICE_LANGUAGES.map((language) => (
            <option key={language.code} value={language.code} className="bg-gray-800">
              {language.flag} {language.nativeName}
            </option>
          ))}
        </select>
        
        {/* Indicador de carga */}
        {isLoading && (
          <div className="absolute -bottom-5 right-0">
            <div className="text-xs text-blue-400 flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Actualizando...
            </div>
          </div>
        )}
        
        {/* Mostrar errores */}
        {error && (
          <div className="absolute -bottom-5 right-0">
            <div className="text-xs text-red-400">
              {error}
            </div>
          </div>
        )}
      </div>
      
      {/* Información actual */}
      <div className="mt-2 text-xs text-gray-500 text-right">
        Factura en: {currentInvoiceLanguage.flag} {currentInvoiceLanguage.nativeName}
      </div>
    </div>
  );
};

export default InvoiceLanguageSelector;