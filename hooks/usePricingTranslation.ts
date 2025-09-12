// ./hooks/usePricingTranslation.ts
"use client";

import { useState, useEffect } from 'react';
import { 
  Language, 
  detectBrowserLanguage, 
  getStoredLanguage, 
  setStoredLanguage,
  dispatchLanguageChange,
  LANGUAGE_CHANGE_EVENT,
  getPricingTranslation
} from '../lib/i18n';

export const usePricingTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Obtener idioma inicial
    const storedLanguage = getStoredLanguage();
    const initialLanguage = storedLanguage || detectBrowserLanguage();
    setLanguage(initialLanguage);

    // Escuchar cambios de idioma desde otros componentes (como el navbar)
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setStoredLanguage(newLanguage);
    dispatchLanguageChange(newLanguage);
  };

  const t = getPricingTranslation(language);

  return {
    t,
    language,
    changeLanguage,
    isClient
  };
};