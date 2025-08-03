// ./utils/i18n.ts
export type Language = 'en' | 'es' | 'pt' | 'ja' | 'fr' | 'de';

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español", 
  pt: "Português",
  ja: "日本語",
  fr: "Français",
  de: "Deutsch"
};

// Traducciones del navbar
export const navTranslations: Record<Language, {
  home: string;
  pricing: string;
  dashboard: string;
  signIn: string;
  signOut: string;
  language: string;
}> = {
  en: {
    home: "Home",
    pricing: "Pricing", 
    dashboard: "Dashboard",
    signIn: "Sign In",
    signOut: "Sign Out",
    language: "Language"
  },
  es: {
    home: "Inicio",
    pricing: "Precios",
    dashboard: "Panel",
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión", 
    language: "Idioma"
  },
  pt: {
    home: "Início",
    pricing: "Preços",
    dashboard: "Painel",
    signIn: "Entrar",
    signOut: "Sair",
    language: "Idioma"
  },
  ja: {
    home: "ホーム",
    pricing: "料金",
    dashboard: "ダッシュボード", 
    signIn: "ログイン",
    signOut: "ログアウト",
    language: "言語"
  },
  fr: {
    home: "Accueil",
    pricing: "Tarifs",
    dashboard: "Tableau de bord",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    language: "Langue"
  },
  de: {
    home: "Startseite",
    pricing: "Preise", 
    dashboard: "Dashboard",
    signIn: "Anmelden",
    signOut: "Abmelden",
    language: "Sprache"
  }
};

// Traducciones del hero section
export const heroTranslations: Record<Language, {
  title: string;
  subtitle: string;
  subtitleHighlight: string;
  getStarted: string;
  viewPricing: string;
  features: {
    ai: { title: string; description: string };
    fast: { title: string; description: string };
    secure: { title: string; description: string };
    multilingual: { title: string; description: string };
  };
}> = {
  en: {
    title: "PDF Analyzer",
    subtitle: "Transform lengthy documents into intelligent summaries with advanced AI",
    subtitleHighlight: "intelligent summaries",
    getStarted: "Get Started",
    viewPricing: "View Pricing",
    features: {
      ai: {
        title: "AI-Powered",
        description: "Advanced algorithms for precise analysis"
      },
      fast: {
        title: "Lightning Fast",
        description: "Process documents in seconds"
      },
      secure: {
        title: "Secure & Private",
        description: "Your documents are always protected"
      },
      multilingual: {
        title: "Multi-language",
        description: "Support for 50+ languages"
      }
    }
  },
  es: {
    title: "Analizador de PDF",
    subtitle: "Transforma documentos extensos en resúmenes inteligentes con IA avanzada",
    subtitleHighlight: "resúmenes inteligentes",
    getStarted: "Comenzar",
    viewPricing: "Ver Precios",
    features: {
      ai: {
        title: "Impulsado por IA",
        description: "Algoritmos avanzados para análisis preciso"
      },
      fast: {
        title: "Súper Rápido",
        description: "Procesa documentos en segundos"
      },
      secure: {
        title: "Seguro y Privado",
        description: "Tus documentos siempre protegidos"
      },
      multilingual: {
        title: "Multiidioma",
        description: "Soporte para más de 50 idiomas"
      }
    }
  },
  pt: {
    title: "Analisador de PDF",
    subtitle: "Transforme documentos longos em resumos inteligentes com IA avançada",
    subtitleHighlight: "resumos inteligentes",
    getStarted: "Começar",
    viewPricing: "Ver Preços",
    features: {
      ai: {
        title: "Powered by IA",
        description: "Algoritmos avançados para análise precisa"
      },
      fast: {
        title: "Super Rápido",
        description: "Processa documentos em segundos"
      },
      secure: {
        title: "Seguro e Privado",
        description: "Seus documentos sempre protegidos"
      },
      multilingual: {
        title: "Multilíngue",
        description: "Suporte para mais de 50 idiomas"
      }
    }
  },
  ja: {
    title: "PDF アナライザー",
    subtitle: "高度なAIで長い文書をインテリジェントな要約に変換",
    subtitleHighlight: "インテリジェントな要約",
    getStarted: "始める",
    viewPricing: "料金を見る",
    features: {
      ai: {
        title: "AI駆動",
        description: "精密な分析のための高度なアルゴリズム"
      },
      fast: {
        title: "超高速",
        description: "数秒で文書を処理"
      },
      secure: {
        title: "安全・プライベート",
        description: "あなたの文書は常に保護されています"
      },
      multilingual: {
        title: "多言語対応",
        description: "50以上の言語をサポート"
      }
    }
  },
  fr: {
    title: "Analyseur PDF",
    subtitle: "Transformez de longs documents en résumés intelligents avec une IA avancée",
    subtitleHighlight: "résumés intelligents",
    getStarted: "Commencer",
    viewPricing: "Voir les Prix",
    features: {
      ai: {
        title: "Alimenté par IA",
        description: "Algorithmes avancés pour une analyse précise"
      },
      fast: {
        title: "Ultra Rapide",
        description: "Traite les documents en quelques secondes"
      },
      secure: {
        title: "Sécurisé et Privé",
        description: "Vos documents sont toujours protégés"
      },
      multilingual: {
        title: "Multilingue",
        description: "Support de plus de 50 langues"
      }
    }
  },
  de: {
    title: "PDF Analyzer",
    subtitle: "Verwandeln Sie lange Dokumente mit fortschrittlicher KI in intelligente Zusammenfassungen",
    subtitleHighlight: "intelligente Zusammenfassungen",
    getStarted: "Loslegen",
    viewPricing: "Preise Ansehen",
    features: {
      ai: {
        title: "KI-Powered",
        description: "Erweiterte Algorithmen für präzise Analyse"
      },
      fast: {
        title: "Blitzschnell",
        description: "Verarbeitet Dokumente in Sekunden"
      },
      secure: {
        title: "Sicher & Privat",
        description: "Ihre Dokumente sind immer geschützt"
      },
      multilingual: {
        title: "Mehrsprachig",
        description: "Unterstützung für über 50 Sprachen"
      }
    }
  }
};

// Utilidades para detectar idioma
export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0];
  const supportedLanguages: Language[] = ['en', 'es', 'pt', 'ja', 'fr', 'de'];
  
  return supportedLanguages.includes(browserLang as Language) 
    ? (browserLang as Language) 
    : 'en';
};

export const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('preferred-language');
  const supportedLanguages: Language[] = ['en', 'es', 'pt', 'ja', 'fr', 'de'];
  
  return stored && supportedLanguages.includes(stored as Language) 
    ? (stored as Language) 
    : null;
};

export const setStoredLanguage = (language: Language): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('preferred-language', language);
};

// Evento personalizado para comunicación entre componentes
export const LANGUAGE_CHANGE_EVENT = 'languageChange';

export const dispatchLanguageChange = (language: Language): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: language }));
};

// Función helper para obtener traducciones
export const getNavTranslation = (language: Language) => {
  return navTranslations[language] || navTranslations.en;
};

export const getHeroTranslation = (language: Language) => {
  return heroTranslations[language] || heroTranslations.en;
};