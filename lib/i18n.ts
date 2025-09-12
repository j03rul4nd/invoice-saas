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

// **NUEVAS TRADUCCIONES PARA PROMPT USAGE DISPLAY**
export const promptUsageTranslations: Record<Language, {
  title: string;
  available: string;
  limitReached: string;
  progress: string;
  remainingPrompts: string;
  nextReset: string;
  limitReachedMessage: string;
  lowUsageWarning: string;
  error: string;
}> = {
  en: {
    title: "Monthly Prompt Usage",
    available: "Available",
    limitReached: "Limit reached",
    progress: "Progress",
    remainingPrompts: "Remaining Prompts",
    nextReset: "Next Reset",
    limitReachedMessage: "You've reached your monthly prompt limit. Your quota will reset on",
    lowUsageWarning: "You're running low on prompts this month. Consider upgrading your plan for more access.",
    error: "Error"
  },
  es: {
    title: "Uso Mensual de Prompts",
    available: "Disponible",
    limitReached: "Límite alcanzado",
    progress: "Progreso",
    remainingPrompts: "Prompts Restantes",
    nextReset: "Próximo Reinicio",
    limitReachedMessage: "Has alcanzado tu límite mensual de prompts. Tu cuota se reiniciará el",
    lowUsageWarning: "Te quedan pocos prompts este mes. Considera actualizar tu plan para más acceso.",
    error: "Error"
  },
  pt: {
    title: "Uso Mensal de Prompts",
    available: "Disponível",
    limitReached: "Limite atingido",
    progress: "Progresso",
    remainingPrompts: "Prompts Restantes",
    nextReset: "Próximo Reset",
    limitReachedMessage: "Você atingiu seu limite mensal de prompts. Sua cota será reiniciada em",
    lowUsageWarning: "Você está ficando com poucos prompts este mês. Considere fazer upgrade do seu plano para mais acesso.",
    error: "Erro"
  },
  ja: {
    title: "月間プロンプト使用量",
    available: "利用可能",
    limitReached: "制限に達しました",
    progress: "進行状況",
    remainingPrompts: "残りプロンプト",
    nextReset: "次回リセット",
    limitReachedMessage: "月間プロンプト制限に達しました。クォータは次の日にリセットされます：",
    lowUsageWarning: "今月のプロンプトが不足しています。より多くのアクセスのためにプランのアップグレードを検討してください。",
    error: "エラー"
  },
  fr: {
    title: "Usage Mensuel des Prompts",
    available: "Disponible",
    limitReached: "Limite atteinte",
    progress: "Progression",
    remainingPrompts: "Prompts Restants",
    nextReset: "Prochaine Réinitialisation",
    limitReachedMessage: "Vous avez atteint votre limite mensuelle de prompts. Votre quota sera réinitialisé le",
    lowUsageWarning: "Il vous reste peu de prompts ce mois-ci. Envisagez de mettre à niveau votre plan pour plus d'accès.",
    error: "Erreur"
  },
  de: {
    title: "Monatliche Prompt-Nutzung",
    available: "Verfügbar",
    limitReached: "Limit erreicht",
    progress: "Fortschritt",
    remainingPrompts: "Verbleibende Prompts",
    nextReset: "Nächster Reset",
    limitReachedMessage: "Sie haben Ihr monatliches Prompt-Limit erreicht. Ihr Kontingent wird zurückgesetzt am",
    lowUsageWarning: "Ihnen gehen die Prompts in diesem Monat aus. Erwägen Sie ein Upgrade Ihres Plans für mehr Zugang.",
    error: "Fehler"
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

// Traducciones para la página de pricing
export const pricingTranslations: Record<Language, {
  title: string;
  back: string;
  popularBadge: string;
  activeBadge: string;
  plan: {
    title: string;
    subtitle: string;
    price: string;
    period: string;
    mainFeatures: {
      invoicesTitle: string;
      invoicesSubtitle: string;
      promptsTitle: string;
      promptsSubtitle: string;
      earlyAccessTitle: string;
      earlyAccessSubtitle: string;
    };
    button: {
      subscribe: string;
      manageSubscription: string;
      signInToSubscribe: string;
    };
    securityText: string;
    toggleDetails: {
      show: string;
      hide: string;
    };
    extendedStorage: {
      title: string;
      description: string;
      subtitle: string;
    };
    premiumFeatures: {
      title: string;
      emailSend: {
        title: string;
        subtitle: string;
      };
      prioritySupport: {
        title: string;
        subtitle: string;
      };
    };
    comingSoon: {
      title: string;
      qrTemplates: {
        title: string;
        subtitle: string;
      };
      stripePayment: {
        title: string;
        subtitle: string;
      };
    };
    betaAccess: {
      title: string;
      api: {
        title: string;
        subtitle: string;
      };
      betaTesting: {
        title: string;
        subtitle: string;
      };
      exclusiveTemplates: {
        title: string;
        subtitle: string;
      };
    };
  };
}> = {
  en: {
    title: "Subscription Plan",
    back: "Back",
    popularBadge: "Most Popular Plan",
    activeBadge: "Active",
    plan: {
      title: "Invoice Generator Pro",
      subtitle: "Complete plan for professionals and small businesses",
      price: "$19.99",
      period: "/month",
      mainFeatures: {
        invoicesTitle: "100 invoices per month",
        invoicesSubtitle: "vs 5 in free plan - 20x more capacity",
        promptsTitle: "100 AI prompts per month", 
        promptsSubtitle: "vs 10 in free plan - Total automation",
        earlyAccessTitle: "Early Access",
        earlyAccessSubtitle: "New features before anyone else"
      },
      button: {
        subscribe: "🚀 Upgrade to Pro - $19.99/month",
        manageSubscription: "Manage Subscription",
        signInToSubscribe: "Sign In to Subscribe"
      },
      securityText: "✅ Cancel anytime • 💳 Secure payment with Stripe",
      toggleDetails: {
        show: "See all benefits",
        hide: "Hide details"
      },
      extendedStorage: {
        title: "Extended Storage",
        description: "2-year storage",
        subtitle: "vs 30 days in free plan"
      },
      premiumFeatures: {
        title: "Premium Features",
        emailSend: {
          title: "Email sending",
          subtitle: "Share invoices directly"
        },
        prioritySupport: {
          title: "Priority support",
          subtitle: "24h response guaranteed"
        }
      },
      comingSoon: {
        title: "Coming Soon",
        qrTemplates: {
          title: "QR templates",
          subtitle: "Automatic QR codes"
        },
        stripePayment: {
          title: "Stripe payment button",
          subtitle: "Integrated collections"
        }
      },
      betaAccess: {
        title: "Early Access Beta",
        api: {
          title: "MCP API",
          subtitle: "Advanced automation"
        },
        betaTesting: {
          title: "Beta testing",
          subtitle: "Features first"
        },
        exclusiveTemplates: {
          title: "Exclusive templates",
          subtitle: "Unique designs"
        }
      }
    }
  },
  es: {
    title: "Plan de Suscripción",
    back: "Atrás",
    popularBadge: "Plan Más Popular",
    activeBadge: "Activo",
    plan: {
      title: "Invoice Generator Pro",
      subtitle: "Plan completo para profesionales y pequeños negocios",
      price: "€19.99",
      period: "/mes",
      mainFeatures: {
        invoicesTitle: "100 facturas por mes",
        invoicesSubtitle: "vs 5 en plan gratuito - 20x más capacidad",
        promptsTitle: "100 prompts de IA por mes",
        promptsSubtitle: "vs 10 en plan gratuito - Automatización total",
        earlyAccessTitle: "Acceso Anticipado",
        earlyAccessSubtitle: "Nuevas funciones antes que nadie"
      },
      button: {
        subscribe: "🚀 Actualizar a Pro - €19.99/mes",
        manageSubscription: "Gestionar Suscripción",
        signInToSubscribe: "Iniciar Sesión para Suscribirse"
      },
      securityText: "✅ Cancela cuando quieras • 💳 Pago seguro con Stripe",
      toggleDetails: {
        show: "Ver todos los beneficios",
        hide: "Ocultar detalles"
      },
      extendedStorage: {
        title: "Almacenamiento Extendido",
        description: "Almacenamiento 2 años",
        subtitle: "vs 30 días en plan gratuito"
      },
      premiumFeatures: {
        title: "Características Premium",
        emailSend: {
          title: "Envío por email",
          subtitle: "Comparte facturas directamente"
        },
        prioritySupport: {
          title: "Soporte prioritario",
          subtitle: "Respuesta en 24h garantizada"
        }
      },
      comingSoon: {
        title: "Próximamente Disponible",
        qrTemplates: {
          title: "Plantillas con QR",
          subtitle: "Códigos QR automáticos"
        },
        stripePayment: {
          title: "Botón de pago Stripe",
          subtitle: "Cobros integrados"
        }
      },
      betaAccess: {
        title: "Acceso Anticipado Beta",
        api: {
          title: "API MCP",
          subtitle: "Automatización avanzada"
        },
        betaTesting: {
          title: "Beta testing",
          subtitle: "Funciones primero"
        },
        exclusiveTemplates: {
          title: "Plantillas exclusivas",
          subtitle: "Diseños únicos"
        }
      }
    }
  },
  pt: {
    title: "Plano de Assinatura",
    back: "Voltar",
    popularBadge: "Plano Mais Popular",
    activeBadge: "Ativo",
    plan: {
      title: "Invoice Generator Pro",
      subtitle: "Plano completo para profissionais e pequenas empresas",
      price: "$19.99",
      period: "/mês",
      mainFeatures: {
        invoicesTitle: "100 faturas por mês",
        invoicesSubtitle: "vs 5 no plano gratuito - 20x mais capacidade",
        promptsTitle: "100 prompts de IA por mês",
        promptsSubtitle: "vs 10 no plano gratuito - Automação total",
        earlyAccessTitle: "Acesso Antecipado",
        earlyAccessSubtitle: "Novos recursos antes de todos"
      },
      button: {
        subscribe: "🚀 Atualizar para Pro - $19.99/mês",
        manageSubscription: "Gerenciar Assinatura",
        signInToSubscribe: "Entrar para Assinar"
      },
      securityText: "✅ Cancele a qualquer momento • 💳 Pagamento seguro com Stripe",
      toggleDetails: {
        show: "Ver todos os benefícios",
        hide: "Ocultar detalhes"
      },
      extendedStorage: {
        title: "Armazenamento Estendido",
        description: "Armazenamento de 2 anos",
        subtitle: "vs 30 dias no plano gratuito"
      },
      premiumFeatures: {
        title: "Recursos Premium",
        emailSend: {
          title: "Envio por email",
          subtitle: "Compartilhe faturas diretamente"
        },
        prioritySupport: {
          title: "Suporte prioritário",
          subtitle: "Resposta em 24h garantida"
        }
      },
      comingSoon: {
        title: "Em Breve",
        qrTemplates: {
          title: "Modelos com QR",
          subtitle: "Códigos QR automáticos"
        },
        stripePayment: {
          title: "Botão de pagamento Stripe",
          subtitle: "Cobranças integradas"
        }
      },
      betaAccess: {
        title: "Acesso Beta Antecipado",
        api: {
          title: "API MCP",
          subtitle: "Automação avançada"
        },
        betaTesting: {
          title: "Testes beta",
          subtitle: "Recursos primeiro"
        },
        exclusiveTemplates: {
          title: "Modelos exclusivos",
          subtitle: "Designs únicos"
        }
      }
    }
  },
  ja: {
    title: "サブスクリプションプラン",
    back: "戻る",
    popularBadge: "最も人気のプラン",
    activeBadge: "アクティブ",
    plan: {
      title: "Invoice Generator Pro",
      subtitle: "プロフェッショナルと小規模企業向けの完全プラン",
      price: "$19.99",
      period: "/月",
      mainFeatures: {
        invoicesTitle: "月100枚の請求書",
        invoicesSubtitle: "無料プランの5枚と比較 - 20倍の容量",
        promptsTitle: "月100回のAIプロンプト",
        promptsSubtitle: "無料プランの10回と比較 - 完全自動化",
        earlyAccessTitle: "早期アクセス",
        earlyAccessSubtitle: "誰よりも先に新機能を"
      },
      button: {
        subscribe: "🚀 Proにアップグレード - $19.99/月",
        manageSubscription: "サブスクリプション管理",
        signInToSubscribe: "ログインして登録"
      },
      securityText: "✅ いつでもキャンセル可能 • 💳 Stripeによる安全な支払い",
      toggleDetails: {
        show: "すべてのメリットを見る",
        hide: "詳細を隠す"
      },
      extendedStorage: {
        title: "拡張ストレージ",
        description: "2年間のストレージ",
        subtitle: "無料プランの30日と比較"
      },
      premiumFeatures: {
        title: "プレミアム機能",
        emailSend: {
          title: "メール送信",
          subtitle: "請求書を直接共有"
        },
        prioritySupport: {
          title: "優先サポート",
          subtitle: "24時間以内の回答を保証"
        }
      },
      comingSoon: {
        title: "近日公開",
        qrTemplates: {
          title: "QRテンプレート",
          subtitle: "自動QRコード"
        },
        stripePayment: {
          title: "Stripe支払いボタン",
          subtitle: "統合された請求"
        }
      },
      betaAccess: {
        title: "早期アクセスベータ",
        api: {
          title: "MCP API",
          subtitle: "高度な自動化"
        },
        betaTesting: {
          title: "ベータテスト",
          subtitle: "機能を最初に"
        },
        exclusiveTemplates: {
          title: "限定テンプレート",
          subtitle: "ユニークなデザイン"
        }
      }
    }
  },
  fr: {
    title: "Plan d'Abonnement",
    back: "Retour",
    popularBadge: "Plan le Plus Populaire",
    activeBadge: "Actif",
    plan: {
      title: "Invoice Generator Pro",
      subtitle: "Plan complet pour professionnels et petites entreprises",
      price: "$19.99",
      period: "/mois",
      mainFeatures: {
        invoicesTitle: "100 factures par mois",
        invoicesSubtitle: "vs 5 dans le plan gratuit - 20x plus de capacité",
        promptsTitle: "100 prompts IA par mois",
        promptsSubtitle: "vs 10 dans le plan gratuit - Automatisation totale",
        earlyAccessTitle: "Accès Anticipé",
        earlyAccessSubtitle: "Nouvelles fonctionnalités en premier"
      },
      button: {
        subscribe: "🚀 Passer à Pro - $19.99/mois",
        manageSubscription: "Gérer l'Abonnement",
        signInToSubscribe: "Se Connecter pour S'abonner"
      },
      securityText: "✅ Annulez quand vous voulez • 💳 Paiement sécurisé avec Stripe",
      toggleDetails: {
        show: "Voir tous les avantages",
        hide: "Masquer les détails"
      },
      extendedStorage: {
        title: "Stockage Étendu",
        description: "Stockage 2 ans",
        subtitle: "vs 30 jours dans le plan gratuit"
      },
      premiumFeatures: {
        title: "Fonctionnalités Premium",
        emailSend: {
          title: "Envoi par email",
          subtitle: "Partagez les factures directement"
        },
        prioritySupport: {
          title: "Support prioritaire",
          subtitle: "Réponse en 24h garantie"
        }
      },
      comingSoon: {
        title: "Bientôt Disponible",
        qrTemplates: {
          title: "Modèles avec QR",
          subtitle: "Codes QR automatiques"
        },
        stripePayment: {
          title: "Bouton de paiement Stripe",
          subtitle: "Collections intégrées"
        }
      },
      betaAccess: {
        title: "Accès Bêta Anticipé",
        api: {
          title: "API MCP",
          subtitle: "Automatisation avancée"
        },
        betaTesting: {
          title: "Tests bêta",
          subtitle: "Fonctionnalités en premier"
        },
        exclusiveTemplates: {
          title: "Modèles exclusifs",
          subtitle: "Designs uniques"
        }
      }
    }
  },
  de: {
    title: "Abonnement-Plan",
    back: "Zurück",
    popularBadge: "Beliebtester Plan",
    activeBadge: "Aktiv",
    plan: {
      title: "Invoice Generator Pro",
      subtitle: "Kompletter Plan für Profis und kleine Unternehmen",
      price: "$19.99",
      period: "/Monat",
      mainFeatures: {
        invoicesTitle: "100 Rechnungen pro Monat",
        invoicesSubtitle: "vs 5 im kostenlosen Plan - 20x mehr Kapazität",
        promptsTitle: "100 KI-Prompts pro Monat",
        promptsSubtitle: "vs 10 im kostenlosen Plan - Vollautomatisierung",
        earlyAccessTitle: "Früher Zugang",
        earlyAccessSubtitle: "Neue Funktionen vor allen anderen"
      },
      button: {
        subscribe: "🚀 Auf Pro upgraden - $19.99/Monat",
        manageSubscription: "Abonnement Verwalten",
        signInToSubscribe: "Anmelden zum Abonnieren"
      },
      securityText: "✅ Jederzeit kündbar • 💳 Sichere Zahlung mit Stripe",
      toggleDetails: {
        show: "Alle Vorteile ansehen",
        hide: "Details ausblenden"
      },
      extendedStorage: {
        title: "Erweiterte Speicherung",
        description: "2-Jahres-Speicherung",
        subtitle: "vs 30 Tage im kostenlosen Plan"
      },
      premiumFeatures: {
        title: "Premium-Funktionen",
        emailSend: {
          title: "E-Mail-Versand",
          subtitle: "Rechnungen direkt teilen"
        },
        prioritySupport: {
          title: "Prioritätssupport",
          subtitle: "24h Antwort garantiert"
        }
      },
      comingSoon: {
        title: "Demnächst Verfügbar",
        qrTemplates: {
          title: "QR-Vorlagen",
          subtitle: "Automatische QR-Codes"
        },
        stripePayment: {
          title: "Stripe-Zahlungsbutton",
          subtitle: "Integrierte Zahlungen"
        }
      },
      betaAccess: {
        title: "Früher Beta-Zugang",
        api: {
          title: "MCP API",
          subtitle: "Erweiterte Automatisierung"
        },
        betaTesting: {
          title: "Beta-Tests",
          subtitle: "Funktionen zuerst"
        },
        exclusiveTemplates: {
          title: "Exklusive Vorlagen",
          subtitle: "Einzigartige Designs"
        }
      }
    }
  }
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

export const getPublicInvoiceTranslation = (language: Language) => {
  return publicInvoiceTranslations[language] || publicInvoiceTranslations.en;
};

// **NUEVA FUNCIÓN HELPER PARA PROMPT USAGE**
export const getPromptUsageTranslation = (language: Language) => {
  return promptUsageTranslations[language] || promptUsageTranslations.en;
};

// Función helper para obtener traducciones de pricing
export const getPricingTranslation = (language: Language) => {
  return pricingTranslations[language] || pricingTranslations.en;
};