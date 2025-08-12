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




// Traducciones para la vista pública de factura
export const publicInvoiceTranslations: Record<Language, {
  title: string;
  invoiceTitle: string;
  issuedOn: string;
  dueDate: string;
  amount: string;
  status: string;
  fromLabel: string;
  toLabel: string;
  description: string;
  quantity: string;
  unitPrice: string;
  total: string;
  subtotal: string;
  tax: string;
  discount: string;
  finalAmount: string;
  footerText: string;
  paid: string;
  pending: string;
  overdue: string;
  cancelled: string;
  downloadPdf: string;
  printInvoice: string;
  contactInfo: string;
  items: string;
  language: string;
}> = {
  en: {
    title: "Public Invoice View",
    invoiceTitle: "Invoice",
    issuedOn: "Issued on",
    dueDate: "Due date",
    amount: "Amount",
    status: "Status",
    fromLabel: "From",
    toLabel: "To",
    description: "Description",
    quantity: "Qty",
    unitPrice: "Unit Price",
    total: "Total",
    subtotal: "Subtotal",
    tax: "Tax",
    discount: "Discount", 
    finalAmount: "Final Amount",
    footerText: "This is a public view of the invoice. For questions, please contact the issuer.",
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue",
    cancelled: "Cancelled",
    downloadPdf: "Download PDF",
    printInvoice: "Print Invoice",
    contactInfo: "Contact Information",
    items: "Items",
    language: "Language"
  },
  es: {
    title: "Vista Pública de Factura",
    invoiceTitle: "Factura",
    issuedOn: "Emitida el",
    dueDate: "Fecha de vencimiento",
    amount: "Importe",
    status: "Estado",
    fromLabel: "De",
    toLabel: "Para",
    description: "Descripción",
    quantity: "Cant.",
    unitPrice: "Precio Unit.",
    total: "Total",
    subtotal: "Subtotal",
    tax: "Impuestos",
    discount: "Descuento",
    finalAmount: "Importe Final",
    footerText: "Esta es una vista pública de la factura. Para consultas, contacte al emisor.",
    paid: "Pagada",
    pending: "Pendiente",
    overdue: "Vencida",
    cancelled: "Cancelada",
    downloadPdf: "Descargar PDF",
    printInvoice: "Imprimir Factura",
    contactInfo: "Información de Contacto",
    items: "Elementos",
    language: "Idioma"
  },
  pt: {
    title: "Visualização Pública da Fatura",
    invoiceTitle: "Fatura",
    issuedOn: "Emitida em",
    dueDate: "Data de vencimento",
    amount: "Valor",
    status: "Status",
    fromLabel: "De",
    toLabel: "Para",
    description: "Descrição",
    quantity: "Qtd.",
    unitPrice: "Preço Unit.",
    total: "Total",
    subtotal: "Subtotal",
    tax: "Impostos",
    discount: "Desconto",
    finalAmount: "Valor Final",
    footerText: "Esta é uma visualização pública da fatura. Para dúvidas, entre em contato com o emissor.",
    paid: "Paga",
    pending: "Pendente",
    overdue: "Vencida",
    cancelled: "Cancelada",
    downloadPdf: "Baixar PDF",
    printInvoice: "Imprimir Fatura",
    contactInfo: "Informações de Contato",
    items: "Itens",
    language: "Idioma"
  },
  ja: {
    title: "請求書公開ビュー",
    invoiceTitle: "請求書",
    issuedOn: "発行日",
    dueDate: "支払期限",
    amount: "金額",
    status: "ステータス",
    fromLabel: "発行者",
    toLabel: "宛先",
    description: "説明",
    quantity: "数量",
    unitPrice: "単価",
    total: "合計",
    subtotal: "小計",
    tax: "税金",
    discount: "割引",
    finalAmount: "最終金額",
    footerText: "これは請求書の公開ビューです。ご質問は発行者にお問い合わせください。",
    paid: "支払済み",
    pending: "支払待ち",
    overdue: "期限切れ",
    cancelled: "キャンセル",
    downloadPdf: "PDF ダウンロード",
    printInvoice: "請求書を印刷",
    contactInfo: "連絡先情報",
    items: "項目",
    language: "言語"
  },
  fr: {
    title: "Vue Publique de la Facture",
    invoiceTitle: "Facture",
    issuedOn: "Émise le",
    dueDate: "Date d'échéance",
    amount: "Montant",
    status: "Statut",
    fromLabel: "De",
    toLabel: "À",
    description: "Description",
    quantity: "Qté",
    unitPrice: "Prix Unit.",
    total: "Total",
    subtotal: "Sous-total",
    tax: "Taxe",
    discount: "Remise",
    finalAmount: "Montant Final",
    footerText: "Il s'agit d'une vue publique de la facture. Pour toute question, contactez l'émetteur.",
    paid: "Payée",
    pending: "En attente",
    overdue: "En retard",
    cancelled: "Annulée",
    downloadPdf: "Télécharger PDF",
    printInvoice: "Imprimer Facture",
    contactInfo: "Informations de Contact",
    items: "Articles",
    language: "Langue"
  },
  de: {
    title: "Öffentliche Rechnungsansicht",
    invoiceTitle: "Rechnung",
    issuedOn: "Ausgestellt am",
    dueDate: "Fälligkeitsdatum",
    amount: "Betrag",
    status: "Status",
    fromLabel: "Von",
    toLabel: "An",
    description: "Beschreibung",
    quantity: "Anz.",
    unitPrice: "Einzelpreis",
    total: "Gesamt",
    subtotal: "Zwischensumme",
    tax: "Steuer",
    discount: "Rabatt",
    finalAmount: "Endbetrag",
    footerText: "Dies ist eine öffentliche Ansicht der Rechnung. Bei Fragen wenden Sie sich an den Aussteller.",
    paid: "Bezahlt",
    pending: "Ausstehend",
    overdue: "Überfällig",
    cancelled: "Storniert",
    downloadPdf: "PDF Herunterladen",
    printInvoice: "Rechnung Drucken",
    contactInfo: "Kontaktinformationen",
    items: "Artikel",
    language: "Sprache"
  }
};

// Función helper para traducciones de factura pública
export const getPublicInvoiceTranslation = (language: Language) => {
  return publicInvoiceTranslations[language] || publicInvoiceTranslations.en;
};