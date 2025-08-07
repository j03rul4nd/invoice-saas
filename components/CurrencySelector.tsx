// components/CurrencySelector.tsx
import React, { useState } from 'react';
import { ChevronDown, DollarSign, Check } from 'lucide-react';
import { Currency, SUPPORTED_CURRENCIES } from '@/hooks/useCurrency';

interface CurrencySelectorProps {
  currentCurrency: Currency;
  onCurrencyChange: (currencyCode: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function CurrencySelector({
  currentCurrency,
  onCurrencyChange,
  isLoading,
  error
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg 
                 text-white hover:border-purple-400 focus:border-purple-400 focus:outline-none 
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <DollarSign className="h-4 w-4" />
        <span className="font-mono">
          {currentCurrency.symbol} {currentCurrency.code}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg 
                      shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2 font-medium uppercase tracking-wide">
              Seleccionar Moneda
            </div>
            {SUPPORTED_CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencySelect(currency)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-white 
                         hover:bg-gray-700 rounded-md transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-purple-300 w-8">
                    {currency.symbol}
                  </span>
                  <div className="text-left">
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-xs text-gray-400">{currency.name}</div>
                  </div>
                </div>
                {currentCurrency.code === currency.code && (
                  <Check className="h-4 w-4 text-purple-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-full mt-2 w-full p-2 bg-red-500/10 border border-red-400/20 
                      rounded-lg text-red-300 text-xs">
          Error: {error}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}