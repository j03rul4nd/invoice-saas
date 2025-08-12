// =================================================================== 
// ./hooks/useLanguage.ts 
// ===================================================================  

import { useState, useEffect } from 'react'; 
import {   
  Language,   
  detectBrowserLanguage,   
  getStoredLanguage,   
  setStoredLanguage,   
  dispatchLanguageChange,   
  LANGUAGE_CHANGE_EVENT,   
  getNavTranslation,  // ← Importar esta función   
  getHeroTranslation,  // ← Importar esta función
  getPublicInvoiceTranslation  // ← Nueva importación
} from '../lib/i18n';  

export const useLanguage = () => {   
  const [language, setLanguage] = useState<Language>('en');   
  const [isClient, setIsClient] = useState(false);    

  useEffect(() => {     
    setIsClient(true);          
    
    // Detectar idioma inicial     
    const storedLang = getStoredLanguage();     
    const detectedLang = storedLang || detectBrowserLanguage();     
    setLanguage(detectedLang);   
  }, []);    

  useEffect(() => {     
    if (!isClient) return;      
    
    // Escuchar cambios de idioma desde otros componentes     
    const handleLanguageChange = (event: CustomEvent<Language>) => {       
      setLanguage(event.detail);     
    };      
    
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener);          
    
    return () => {       
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener);     
    };   
  }, [isClient]);    

  const changeLanguage = (newLanguage: Language) => {     
    setLanguage(newLanguage);     
    setStoredLanguage(newLanguage);     
    dispatchLanguageChange(newLanguage);   
  };    

  return {     
    language,     
    changeLanguage,     
    isClient   
  }; 
};  

// Hook específico para traducciones del navbar 
export const useNavTranslation = () => {   
  const { language, changeLanguage, isClient } = useLanguage();      
  
  return {     
    t: getNavTranslation(language),  // ← Usar la función helper     
    language,     
    changeLanguage,     
    isClient   
  }; 
};  

// Hook específico para traducciones del hero 
export const useHeroTranslation = () => {   
  const { language, changeLanguage, isClient } = useLanguage();      
  
  return {     
    t: getHeroTranslation(language),  // ← Usar la función helper     
    language,     
    changeLanguage,     
    isClient   
  }; 
};

// Hook específico para traducciones de factura pública
export const usePublicInvoiceTranslation = () => {   
  const { language, changeLanguage, isClient } = useLanguage();      
  
  return {     
    t: getPublicInvoiceTranslation(language),  // ← Nueva función helper     
    language,     
    changeLanguage,     
    isClient   
  }; 
};