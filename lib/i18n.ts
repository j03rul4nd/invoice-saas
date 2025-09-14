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

export const invoiceGeneratorTranslations: Record<Language, {
  // Títulos principales
  mainTitle: string;
  loading: string;
  
  // Sección de IA
  aiSection: {
    title: string;
    placeholder: string;
    generating: string;
    generate: string;
    errorPrefix: string;
  };
  
  // Vista previa
  preview: {
    show: string;
    hide: string;
    title: string;
  };
  
  // Información de factura
  invoiceInfo: {
    title: string;
    number: string;
    date: string;
    dueDate: string;
  };
  
  // Información de empresa
  company: {
    title: string;
    name: string;
    email: string;
    phone: string;
    taxId: string;
    address: string;
  };
  
  // Información de cliente
  client: {
    title: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  // Moneda
  currency: {
    title: string;
    selector: string;
    current: string;
    change: string;
    updateError: string;
    updateSuccess: string;
  };
  
  // Items de factura
  items: {
    title: string;
    add: string;
    clear: string;
    description: string;
    quantity: string;
    price: string;
    total: string;
    taxRate: string;
    defaultDescription: string;
  };
  
  // Notas
  notes: {
    title: string;
    placeholder: string;
    previewTitle: string;
  };
  
  // Acciones
  actions: {
    downloadPdf: string;
    newInvoice: string;
    pdfComingSoon: string;
  };
  
  // Mensajes de error y API
  api: {
    networkError: string;
    serverError: string;
    unknownError: string;
    simulatingResponse: string;
    generatingError: string;
  };
  
  // Datos de ejemplo para simulación
  simulation: {
    clientName: string;
    clientEmail: string;
    serviceDescription: string;
    invoiceNotes: string;
  };

  // Gestión de facturas guardadas
  savedInvoices: {
    title: string;
    editing: string;
    save: string;
    update: string;
    saving: string;
    updating: string;
    cancel: string;
    view: string;
    hide: string;
    load: string;
    edit: string;
    duplicate: string;
    delete: string;
    confirmDelete: string;
    confirmDuplicate: string;
    cancelAndNew: string;
    limitReached: string;
    limitMessage: string;
    subscribeMessage: string;
    noInvoices: string;
    loadingInvoices: string;
    publicLink: string;
    generateLink: string;
    copyLink: string;
    removeLink: string;
    confirmRemoveLink: string;
    openLink: string;
  };

  // Validación
  validation: {
    invoiceNumberRequired: string;
    clientNameRequired: string;
    itemDescriptionRequired: string;
  };

  invoicesCount: string;
  editingStatus: string;
  activeStatus: string;
  public: string;
  updated: string;
  confirmDeleteInvoice: string;
  confirmDuplicateInvoice: string;
  confirmRemovePublicLink: string;
  generatingPdf: string;
  invoicesLimit: string;
  subscriptionLimit: string;
  subscriptionMessage: string;
  freeLimit: string;
  validationErrors: string;
  noInvoicesMessage: string;
  loadingInvoicesMessage: string;
  showDetails: string;
  hideDetails: string;
  manageInvoices: string;
  invoicesList: string;
  createdAt: string;
  publicLinkUrl: string;
  tooltips: {
    load: string;
    edit: string;
    duplicate: string;
    delete: string;
    generatePublicLink: string;
    copyPublicLink: string;
    openPublicLink: string;
    removePublicLink: string;
  };

}> = {
  en: {
    mainTitle: "Rapid Invoice",
    loading: "Loading...",
    
    aiSection: {
      title: "Generate Invoice with AI",
      placeholder: "Describe your invoice details (e.g., Invoice for John Doe for web design services, 3 hours at $50/hour)",
      generating: "Generating...",
      generate: "Generate",
      errorPrefix: "Error: "
    },
    
    preview: {
      show: "Show Preview",
      hide: "Hide Preview",
      title: "Preview"
    },
    
    invoiceInfo: {
      title: "Invoice Information",
      number: "Invoice Number",
      date: "Date",
      dueDate: "Due Date"
    },
    
    company: {
      title: "Your Company",
      name: "Company name",
      email: "email@company.com",
      phone: "Phone",
      taxId: "Tax ID",
      address: "Complete address"
    },
    
    client: {
      title: "Client",
      name: "Client name",
      email: "email@client.com",
      phone: "Phone",
      address: "Client address"
    },

    currency: {
      title: "Currency",
      selector: "Select Currency",
      current: "Current Currency",
      change: "Change Currency",
      updateError: "Error updating currency",
      updateSuccess: "Currency updated successfully"
    },
    
    items: {
      title: "Services/Products",
      add: "Add",
      clear: "Clear",
      description: "Service/product description",
      quantity: "Qty.",
      price: "Price",
      total: "Total",
      taxRate: "VAT (%)",
      defaultDescription: "Product/Service"
    },
    
    notes: {
      title: "Additional Notes",
      placeholder: "Payment terms, additional information, etc.",
      previewTitle: "Notes:"
    },
    
    actions: {
      downloadPdf: "Download Invoice PDF",
      newInvoice: "New Invoice",
      pdfComingSoon: "PDF export function - Coming soon"
    },
    
    api: {
      networkError: "Network error",
      serverError: "Server error",
      unknownError: "Unknown error",
      simulatingResponse: "Simulating API response for prompt:",
      generatingError: "Error generating invoice with AI:"
    },
    
    simulation: {
      clientName: "Example Client",
      clientEmail: "client@example.com",
      serviceDescription: "Consulting service",
      invoiceNotes: "Invoice generated with AI"
    },

    savedInvoices: {
      title: "Saved Invoices",
      editing: "Editing",
      save: "Save Invoice",
      update: "Update Invoice",
      saving: "Saving...",
      updating: "Updating...",
      cancel: "Cancel Edit",
      view: "View",
      hide: "Hide",
      load: "Load invoice to view",
      edit: "Edit invoice",
      duplicate: "Duplicate invoice",
      delete: "Delete invoice",
      confirmDelete: "Are you sure you want to delete invoice",
      confirmDuplicate: "Duplicate invoice",
      cancelAndNew: "Cancel and New Invoice",
      limitReached: "Limit reached",
      limitMessage: "You have reached the limit of",
      subscribeMessage: "Subscribe to get up to 100 monthly invoices.",
      noInvoices: "You have no saved invoices",
      loadingInvoices: "Loading invoices...",
      publicLink: "Public",
      generateLink: "Generate public link",
      copyLink: "Copy public link",
      removeLink: "Remove public link",
      confirmRemoveLink: "Remove public link from invoice",
      openLink: "Open public link"
    },

    validation: {
      invoiceNumberRequired: "Invoice number is required",
      clientNameRequired: "Client name is required",
      itemDescriptionRequired: "All items must have description"
    },
    invoicesCount: "invoices",
    editingStatus: "Editing",
    activeStatus: "Active", 
    public: "Public",
    updated: "Updated:",
    
    confirmDeleteInvoice: "Are you sure you want to delete invoice",
    confirmDuplicateInvoice: "Duplicate invoice",
    confirmRemovePublicLink: "Remove public link from invoice",
    
    generatingPdf: "Generating PDF...",
    
    invoicesLimit: "invoices",
    subscriptionLimit: "You have reached the limit of",
    subscriptionMessage: "Subscribe to get up to 100 monthly invoices.",
    freeLimit: "Delete some or edit an existing one.",
    
    validationErrors: "Validation errors:",
    
    noInvoicesMessage: "You have no saved invoices",
    loadingInvoicesMessage: "Loading invoices...",
    
    showDetails: "See all benefits", 
    hideDetails: "Hide details",
    manageInvoices: "Saved Invoices Management",
    invoicesList: "Saved Invoices List",
    
    createdAt: "Created:",
    publicLinkUrl: "🔗",
    
    tooltips: {
      load: "Load invoice to view",
      edit: "Edit invoice",
      duplicate: "Duplicate invoice", 
      delete: "Delete invoice",
      generatePublicLink: "Generate public link",
      copyPublicLink: "Copy public link",
      openPublicLink: "Open public link",
      removePublicLink: "Remove public link"
    }
  },
  es: {
    mainTitle: "Generador de Facturas",
    loading: "Cargando...",
    
    aiSection: {
      title: "Generar Factura con IA",
      placeholder: "Describe los detalles de tu factura (ej: Factura para Juan Pérez por servicios de diseño web, 3 horas a 50€/hora)",
      generating: "Generando...",
      generate: "Generar",
      errorPrefix: "Error: "
    },
    
    preview: {
      show: "Mostrar Vista Previa",
      hide: "Ocultar Vista Previa",
      title: "Vista Previa"
    },
    
    invoiceInfo: {
      title: "Información de la Factura",
      number: "Número de Factura",
      date: "Fecha",
      dueDate: "Fecha de Vencimiento"
    },
    
    company: {
      title: "Tu Empresa",
      name: "Nombre de la empresa",
      email: "email@empresa.com",
      phone: "Teléfono",
      taxId: "NIF/CIF",
      address: "Dirección completa"
    },
    
    client: {
      title: "Cliente",
      name: "Nombre del cliente",
      email: "email@cliente.com",
      phone: "Teléfono",
      address: "Dirección del cliente"
    },

    currency: {
      title: "Moneda",
      selector: "Seleccionar Moneda",
      current: "Moneda Actual",
      change: "Cambiar Moneda",
      updateError: "Error al actualizar la moneda",
      updateSuccess: "Moneda actualizada correctamente"
    },
    
    items: {
      title: "Servicios/Productos",
      add: "Añadir",
      clear: "Limpiar",
      description: "Descripción del servicio/producto",
      quantity: "Cant.",
      price: "Precio",
      total: "Total",
      taxRate: "IVA (%)",
      defaultDescription: "Producto/Servicio"
    },
    
    notes: {
      title: "Notas Adicionales",
      placeholder: "Términos de pago, información adicional, etc.",
      previewTitle: "Notas:"
    },
    
    actions: {
      downloadPdf: "Descargar Factura PDF",
      newInvoice: "Nueva Factura",
      pdfComingSoon: "Función de exportación a PDF - Próximamente disponible"
    },
    
    api: {
      networkError: "Error de conexión",
      serverError: "Error del servidor",
      unknownError: "Error desconocido",
      simulatingResponse: "Simulando respuesta de API para prompt:",
      generatingError: "Error generating invoice with AI:"
    },
    
    simulation: {
      clientName: "Cliente Ejemplo",
      clientEmail: "cliente@ejemplo.com",
      serviceDescription: "Servicio de consultoría",
      invoiceNotes: "Factura generada con IA"
    },

    savedInvoices: {
      title: "Facturas Guardadas",
      editing: "Editando",
      save: "Guardar Factura",
      update: "Actualizar Factura",
      saving: "Guardando...",
      updating: "Actualizando...",
      cancel: "Cancelar Edición",
      view: "Ver",
      hide: "Ocultar",
      load: "Cargar factura para ver",
      edit: "Editar factura",
      duplicate: "Duplicar factura",
      delete: "Eliminar factura",
      confirmDelete: "¿Estás seguro de que quieres eliminar la factura",
      confirmDuplicate: "¿Duplicar la factura",
      cancelAndNew: "Cancelar y Nueva Factura",
      limitReached: "Límite alcanzado",
      limitMessage: "Has alcanzado el límite de",
      subscribeMessage: "Suscríbete para obtener hasta 100 facturas mensuales.",
      noInvoices: "No tienes facturas guardadas",
      loadingInvoices: "Cargando facturas...",
      publicLink: "Público",
      generateLink: "Generar enlace público",
      copyLink: "Copiar enlace público",
      removeLink: "Eliminar enlace público",
      confirmRemoveLink: "¿Eliminar el enlace público de la factura",
      openLink: "Abrir enlace público"
    },

    validation: {
      invoiceNumberRequired: "Número de factura es requerido",
      clientNameRequired: "Nombre del cliente es requerido",
      itemDescriptionRequired: "Todos los items deben tener descripción"
    },

    invoicesCount: "facturas",
    editingStatus: "Editando",
    activeStatus: "Activo",
    public: "Público",
    updated: "Actualizada:",
    
    // Mensajes de confirmación
    confirmDeleteInvoice: "¿Estás seguro de que quieres eliminar la factura",
    confirmDuplicateInvoice: "¿Duplicar la factura",
    confirmRemovePublicLink: "¿Eliminar el enlace público de la factura",
    
    // Estados de carga
    generatingPdf: "Generando PDF...",
    
    // Límites y suscripciones
    invoicesLimit: "facturas",
    subscriptionLimit: "Has alcanzado el límite de",
    subscriptionMessage: "Suscríbete para obtener hasta 100 facturas mensuales.",
    freeLimit: "Elimina alguna o edita una existente.",
    
    // Errores de validación
    validationErrors: "Errores de validación:",
    
    // Estados de las facturas guardadas
    noInvoicesMessage: "No tienes facturas guardadas",
    loadingInvoicesMessage: "Cargando facturas...",
    
    // Botones y acciones
    showDetails: "Ver todos los beneficios",
    hideDetails: "Ocultar detalles",
    manageInvoices: "Gestión de Facturas Guardadas",
    invoicesList: "Lista de Facturas Guardadas",
    
    // Fechas
    createdAt: "Creada:",
    
    // Enlaces públicos
    publicLinkUrl: "🔗",
    
    // Tooltips
    tooltips: {
      load: "Cargar factura para ver",
      edit: "Editar factura", 
      duplicate: "Duplicar factura",
      delete: "Eliminar factura",
      generatePublicLink: "Generar enlace público",
      copyPublicLink: "Copiar enlace público",
      openPublicLink: "Abrir enlace público",
      removePublicLink: "Eliminar enlace público"
    }
  },
  pt: {
    mainTitle: "Gerador de Faturas",
    loading: "Carregando...",

    aiSection: {
      title: "Gerar Fatura com IA",
      placeholder: "Descreva os detalhes da sua fatura (ex: Fatura para João Silva por serviços de design web, 3 horas a 50€/hora)",
      generating: "Gerando...",
      generate: "Gerar",
      errorPrefix: "Erro: "
    },

    preview: {
      show: "Mostrar Pré-visualização",
      hide: "Ocultar Pré-visualização",
      title: "Pré-visualização"
    },

    invoiceInfo: {
      title: "Informações da Fatura",
      number: "Número da Fatura",
      date: "Data",
      dueDate: "Data de Vencimento"
    },

    company: {
      title: "Sua Empresa",
      name: "Nome da empresa",
      email: "email@empresa.com",
      phone: "Telefone",
      taxId: "NIF",
      address: "Endereço completo"
    },

    client: {
      title: "Cliente",
      name: "Nome do cliente",
      email: "email@cliente.com",
      phone: "Telefone",
      address: "Endereço do cliente"
    },

    currency: {
      title: "Moeda",
      selector: "Selecionar Moeda",
      current: "Moeda Atual",
      change: "Alterar Moeda",
      updateError: "Erro ao atualizar a moeda",
      updateSuccess: "Moeda atualizada com sucesso"
    },

    items: {
      title: "Serviços/Produtos",
      add: "Adicionar",
      clear: "Limpar",
      description: "Descrição do serviço/produto",
      quantity: "Qtd.",
      price: "Preço",
      total: "Total",
      taxRate: "IVA (%)",
      defaultDescription: "Produto/Serviço"
    },

    notes: {
      title: "Notas Adicionais",
      placeholder: "Condições de pagamento, informações adicionais, etc.",
      previewTitle: "Notas:"
    },

    actions: {
      downloadPdf: "Baixar Fatura PDF",
      newInvoice: "Nova Fatura",
      pdfComingSoon: "Função de exportação PDF - Em breve"
    },

    api: {
      networkError: "Erro de rede",
      serverError: "Erro do servidor",
      unknownError: "Erro desconhecido",
      simulatingResponse: "Simulando resposta da API para prompt:",
      generatingError: "Erro ao gerar fatura com IA:"
    },

    simulation: {
      clientName: "Cliente Exemplo",
      clientEmail: "cliente@exemplo.com",
      serviceDescription: "Serviço de consultoria",
      invoiceNotes: "Fatura gerada com IA"
    },

    savedInvoices: {
      title: "Faturas Salvas",
      editing: "Editando",
      save: "Salvar Fatura",
      update: "Atualizar Fatura",
      saving: "Salvando...",
      updating: "Atualizando...",
      cancel: "Cancelar Edição",
      view: "Ver",
      hide: "Ocultar",
      load: "Carregar fatura para ver",
      edit: "Editar fatura",
      duplicate: "Duplicar fatura",
      delete: "Excluir fatura",
      confirmDelete: "Tem certeza que deseja excluir a fatura",
      confirmDuplicate: "Duplicar fatura",
      cancelAndNew: "Cancelar e Nova Fatura",
      limitReached: "Limite atingido",
      limitMessage: "Você atingiu o limite de",
      subscribeMessage: "Assine para gerar até 100 faturas mensais.",
      noInvoices: "Você não tem faturas salvas",
      loadingInvoices: "Carregando faturas...",
      publicLink: "Público",
      generateLink: "Gerar link público",
      copyLink: "Copiar link público",
      removeLink: "Remover link público",
      confirmRemoveLink: "Remover link público da fatura",
      openLink: "Abrir link público"
    },

    validation: {
      invoiceNumberRequired: "Número da fatura é obrigatório",
      clientNameRequired: "Nome do cliente é obrigatório",
      itemDescriptionRequired: "Todos os itens devem ter descrição"
    },
    invoicesCount: "faturas",
    editingStatus: "Editando",
    activeStatus: "Ativo",
    public: "Público",
    updated: "Atualizada:",
    confirmDeleteInvoice: "Tem certeza que deseja excluir a fatura",
    confirmDuplicateInvoice: "Duplicar fatura",
    confirmRemovePublicLink: "Remover link público da fatura",
    generatingPdf: "Gerando PDF...",
    invoicesLimit: "faturas",
    subscriptionLimit: "Você atingiu o limite de",
    subscriptionMessage: "Assine para gerar até 100 faturas mensais.",
    freeLimit: "Exclua algumas ou edite uma existente.",
    validationErrors: "Erros de validação:",
    noInvoicesMessage: "Você não tem faturas salvas",
    loadingInvoicesMessage: "Carregando faturas...",
    showDetails: "Ver todos os benefícios",
    hideDetails: "Ocultar detalhes",
    manageInvoices: "Gestão de Faturas Salvas",
    invoicesList: "Lista de Faturas Salvas",
    createdAt: "Criada:",
    publicLinkUrl: "🔗",

    tooltips: {
      load: "Carregar fatura para ver",
      edit: "Editar fatura",
      duplicate: "Duplicar fatura",
      delete: "Excluir fatura",
      generatePublicLink: "Gerar link público",
      copyPublicLink: "Copiar link público",
      openPublicLink: "Abrir link público",
      removePublicLink: "Remover link público"
    }
  },
  ja: {
    mainTitle: "請求書ジェネレーター",
    loading: "読み込み中...",

    aiSection: {
      title: "AIで請求書を作成",
      placeholder: "請求書の詳細を入力してください（例: 山田太郎へのWebデザインサービスの請求書、3時間、1時間あたり¥5000）",
      generating: "生成中...",
      generate: "生成",
      errorPrefix: "エラー: "
    },

    preview: {
      show: "プレビューを表示",
      hide: "プレビューを非表示",
      title: "プレビュー"
    },

    invoiceInfo: {
      title: "請求書情報",
      number: "請求書番号",
      date: "日付",
      dueDate: "支払期限"
    },

    company: {
      title: "あなたの会社",
      name: "会社名",
      email: "email@company.com",
      phone: "電話番号",
      taxId: "法人番号",
      address: "住所"
    },

    client: {
      title: "顧客",
      name: "顧客名",
      email: "email@client.com",
      phone: "電話番号",
      address: "顧客の住所"
    },

    currency: {
      title: "通貨",
      selector: "通貨を選択",
      current: "現在の通貨",
      change: "通貨を変更",
      updateError: "通貨の更新に失敗しました",
      updateSuccess: "通貨が正常に更新されました"
    },

    items: {
      title: "サービス/商品",
      add: "追加",
      clear: "クリア",
      description: "サービス/商品の説明",
      quantity: "数量",
      price: "価格",
      total: "合計",
      taxRate: "消費税 (%)",
      defaultDescription: "商品/サービス"
    },

    notes: {
      title: "追加のメモ",
      placeholder: "支払条件、追加情報など",
      previewTitle: "メモ:"
    },

    actions: {
      downloadPdf: "請求書PDFをダウンロード",
      newInvoice: "新しい請求書",
      pdfComingSoon: "PDFエクスポート機能 - 近日公開"
    },

    api: {
      networkError: "ネットワークエラー",
      serverError: "サーバーエラー",
      unknownError: "不明なエラー",
      simulatingResponse: "APIレスポンスをシミュレーション中:",
      generatingError: "AIによる請求書生成エラー:"
    },

    simulation: {
      clientName: "サンプル顧客",
      clientEmail: "client@example.com",
      serviceDescription: "コンサルティングサービス",
      invoiceNotes: "AIで生成された請求書"
    },

    savedInvoices: {
      title: "保存された請求書",
      editing: "編集中",
      save: "請求書を保存",
      update: "請求書を更新",
      saving: "保存中...",
      updating: "更新中...",
      cancel: "編集をキャンセル",
      view: "表示",
      hide: "非表示",
      load: "請求書を読み込む",
      edit: "請求書を編集",
      duplicate: "請求書を複製",
      delete: "請求書を削除",
      confirmDelete: "請求書を削除してもよろしいですか",
      confirmDuplicate: "請求書を複製しますか",
      cancelAndNew: "キャンセルして新しい請求書",
      limitReached: "上限に達しました",
      limitMessage: "上限に達しました:",
      subscribeMessage: "月100件まで請求書を作成するには購読してください。",
      noInvoices: "保存された請求書はありません",
      loadingInvoices: "請求書を読み込み中...",
      publicLink: "公開リンク",
      generateLink: "公開リンクを生成",
      copyLink: "公開リンクをコピー",
      removeLink: "公開リンクを削除",
      confirmRemoveLink: "請求書から公開リンクを削除しますか",
      openLink: "公開リンクを開く"
    },

    validation: {
      invoiceNumberRequired: "請求書番号は必須です",
      clientNameRequired: "顧客名は必須です",
      itemDescriptionRequired: "すべての項目に説明が必要です"
    },
    invoicesCount: "件の請求書",
    editingStatus: "編集中",
    activeStatus: "アクティブ",
    public: "公開",
    updated: "更新日:",
    confirmDeleteInvoice: "請求書を削除してもよろしいですか",
    confirmDuplicateInvoice: "請求書を複製しますか",
    confirmRemovePublicLink: "請求書から公開リンクを削除しますか",
    generatingPdf: "PDFを生成中...",
    invoicesLimit: "件の請求書",
    subscriptionLimit: "上限に達しました:",
    subscriptionMessage: "月100件まで請求書を作成するには購読してください。",
    freeLimit: "一部を削除するか、既存のものを編集してください。",
    validationErrors: "検証エラー:",
    noInvoicesMessage: "保存された請求書はありません",
    loadingInvoicesMessage: "請求書を読み込み中...",
    showDetails: "すべての利点を表示",
    hideDetails: "詳細を非表示",
    manageInvoices: "保存された請求書の管理",
    invoicesList: "保存された請求書リスト",
    createdAt: "作成日:",
    publicLinkUrl: "🔗",

    tooltips: {
      load: "請求書を読み込む",
      edit: "請求書を編集",
      duplicate: "請求書を複製",
      delete: "請求書を削除",
      generatePublicLink: "公開リンクを生成",
      copyPublicLink: "公開リンクをコピー",
      openPublicLink: "公開リンクを開く",
      removePublicLink: "公開リンクを削除"
    }
  },
  fr: {
    mainTitle: "Générateur de Factures",
    loading: "Chargement...",

    aiSection: {
      title: "Générer une facture avec l'IA",
      placeholder: "Décrivez les détails de votre facture (ex: Facture pour Jean Dupont pour des services de conception web, 3 heures à 50€/heure)",
      generating: "Génération...",
      generate: "Générer",
      errorPrefix: "Erreur: "
    },

    preview: {
      show: "Afficher l’Aperçu",
      hide: "Masquer l’Aperçu",
      title: "Aperçu"
    },

    invoiceInfo: {
      title: "Informations de la Facture",
      number: "Numéro de Facture",
      date: "Date",
      dueDate: "Date d’Échéance"
    },

    company: {
      title: "Votre Entreprise",
      name: "Nom de l’entreprise",
      email: "email@entreprise.com",
      phone: "Téléphone",
      taxId: "Numéro TVA",
      address: "Adresse complète"
    },

    client: {
      title: "Client",
      name: "Nom du client",
      email: "email@client.com",
      phone: "Téléphone",
      address: "Adresse du client"
    },

    currency: {
      title: "Devise",
      selector: "Sélectionner la Devise",
      current: "Devise Actuelle",
      change: "Changer de Devise",
      updateError: "Erreur lors de la mise à jour de la devise",
      updateSuccess: "Devise mise à jour avec succès"
    },

    items: {
      title: "Services/Produits",
      add: "Ajouter",
      clear: "Effacer",
      description: "Description du service/produit",
      quantity: "Qté.",
      price: "Prix",
      total: "Total",
      taxRate: "TVA (%)",
      defaultDescription: "Produit/Service"
    },

    notes: {
      title: "Notes Supplémentaires",
      placeholder: "Conditions de paiement, informations supplémentaires, etc.",
      previewTitle: "Notes:"
    },

    actions: {
      downloadPdf: "Télécharger la Facture PDF",
      newInvoice: "Nouvelle Facture",
      pdfComingSoon: "Fonction d’export PDF - Bientôt disponible"
    },

    api: {
      networkError: "Erreur réseau",
      serverError: "Erreur serveur",
      unknownError: "Erreur inconnue",
      simulatingResponse: "Simulation de la réponse API pour prompt:",
      generatingError: "Erreur lors de la génération de la facture avec l’IA:"
    },

    simulation: {
      clientName: "Client Exemple",
      clientEmail: "client@exemple.com",
      serviceDescription: "Service de conseil",
      invoiceNotes: "Facture générée avec IA"
    },

    savedInvoices: {
      title: "Factures Enregistrées",
      editing: "En cours d’édition",
      save: "Enregistrer la Facture",
      update: "Mettre à jour la Facture",
      saving: "Enregistrement...",
      updating: "Mise à jour...",
      cancel: "Annuler l’édition",
      view: "Voir",
      hide: "Masquer",
      load: "Charger la facture pour voir",
      edit: "Modifier la facture",
      duplicate: "Dupliquer la facture",
      delete: "Supprimer la facture",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer la facture",
      confirmDuplicate: "Dupliquer la facture",
      cancelAndNew: "Annuler et Nouvelle Facture",
      limitReached: "Limite atteinte",
      limitMessage: "Vous avez atteint la limite de",
      subscribeMessage: "Abonnez-vous pour générer jusqu’à 100 factures mensuelles.",
      noInvoices: "Vous n’avez aucune facture enregistrée",
      loadingInvoices: "Chargement des factures...",
      publicLink: "Lien public",
      generateLink: "Générer un lien public",
      copyLink: "Copier le lien public",
      removeLink: "Supprimer le lien public",
      confirmRemoveLink: "Supprimer le lien public de la facture",
      openLink: "Ouvrir le lien public"
    },

    validation: {
      invoiceNumberRequired: "Le numéro de facture est requis",
      clientNameRequired: "Le nom du client est requis",
      itemDescriptionRequired: "Tous les articles doivent avoir une description"
    },
    invoicesCount: "factures",
    editingStatus: "En cours d'édition",
    activeStatus: "Actif",
    public: "Public",
    updated: "Mise à jour:",
    confirmDeleteInvoice: "Êtes-vous sûr de vouloir supprimer la facture",
    confirmDuplicateInvoice: "Dupliquer la facture",
    confirmRemovePublicLink: "Supprimer le lien public de la facture",
    generatingPdf: "Génération du PDF...",
    invoicesLimit: "factures",
    subscriptionLimit: "Vous avez atteint la limite de",
    subscriptionMessage: "Abonnez-vous pour générer jusqu'à 100 factures mensuelles.",
    freeLimit: "Supprimez-en quelques-unes ou modifiez une existante.",
    validationErrors: "Erreurs de validation:",
    noInvoicesMessage: "Vous n'avez aucune facture enregistrée",
    loadingInvoicesMessage: "Chargement des factures...",
    showDetails: "Voir tous les avantages",
    hideDetails: "Masquer les détails",
    manageInvoices: "Gestion des Factures Enregistrées",
    invoicesList: "Liste des Factures Enregistrées",
    createdAt: "Créée:",
    publicLinkUrl: "🔗",

    tooltips: {
      load: "Charger la facture pour voir",
      edit: "Modifier la facture",
      duplicate: "Dupliquer la facture",
      delete: "Supprimer la facture",
      generatePublicLink: "Générer un lien public",
      copyPublicLink: "Copier le lien public",
      openPublicLink: "Ouvrir le lien public",
      removePublicLink: "Supprimer le lien public"
    }
  },
  de: {
    mainTitle: "Rechnungsgenerator",
    loading: "Wird geladen...",

    aiSection: {
      title: "Rechnung mit KI erstellen",
      placeholder: "Beschreiben Sie die Details Ihrer Rechnung (z. B. Rechnung für Max Mustermann für Webdesign-Dienstleistungen, 3 Stunden à 50€/Stunde)",
      generating: "Wird generiert...",
      generate: "Generieren",
      errorPrefix: "Fehler: "
    },

    preview: {
      show: "Vorschau anzeigen",
      hide: "Vorschau ausblenden",
      title: "Vorschau"
    },

    invoiceInfo: {
      title: "Rechnungsinformationen",
      number: "Rechnungsnummer",
      date: "Datum",
      dueDate: "Fälligkeitsdatum"
    },

    company: {
      title: "Ihr Unternehmen",
      name: "Firmenname",
      email: "email@unternehmen.com",
      phone: "Telefon",
      taxId: "Steuernummer",
      address: "Vollständige Adresse"
    },

    client: {
      title: "Kunde",
      name: "Kundenname",
      email: "email@kunde.com",
      phone: "Telefon",
      address: "Kundenadresse"
    },

    currency: {
      title: "Währung",
      selector: "Währung auswählen",
      current: "Aktuelle Währung",
      change: "Währung ändern",
      updateError: "Fehler beim Aktualisieren der Währung",
      updateSuccess: "Währung erfolgreich aktualisiert"
    },

    items: {
      title: "Dienstleistungen/Produkte",
      add: "Hinzufügen",
      clear: "Löschen",
      description: "Beschreibung der Dienstleistung/des Produkts",
      quantity: "Menge",
      price: "Preis",
      total: "Gesamt",
      taxRate: "MwSt (%)",
      defaultDescription: "Produkt/Dienstleistung"
    },

    notes: {
      title: "Zusätzliche Notizen",
      placeholder: "Zahlungsbedingungen, zusätzliche Informationen usw.",
      previewTitle: "Notizen:"
    },

    actions: {
      downloadPdf: "Rechnung als PDF herunterladen",
      newInvoice: "Neue Rechnung",
      pdfComingSoon: "PDF-Exportfunktion - Demnächst verfügbar"
    },

    api: {
      networkError: "Netzwerkfehler",
      serverError: "Serverfehler",
      unknownError: "Unbekannter Fehler",
      simulatingResponse: "Simulation der API-Antwort für Eingabe:",
      generatingError: "Fehler beim Generieren der Rechnung mit KI:"
    },

    simulation: {
      clientName: "Beispielkunde",
      clientEmail: "kunde@beispiel.com",
      serviceDescription: "Beratungsdienstleistung",
      invoiceNotes: "Mit KI generierte Rechnung"
    },

    savedInvoices: {
      title: "Gespeicherte Rechnungen",
      editing: "Bearbeitung",
      save: "Rechnung speichern",
      update: "Rechnung aktualisieren",
      saving: "Wird gespeichert...",
      updating: "Wird aktualisiert...",
      cancel: "Bearbeitung abbrechen",
      view: "Ansehen",
      hide: "Ausblenden",
      load: "Rechnung laden",
      edit: "Rechnung bearbeiten",
      duplicate: "Rechnung duplizieren",
      delete: "Rechnung löschen",
      confirmDelete: "Möchten Sie die Rechnung wirklich löschen",
      confirmDuplicate: "Rechnung duplizieren",
      cancelAndNew: "Abbrechen und neue Rechnung",
      limitReached: "Limit erreicht",
      limitMessage: "Sie haben das Limit von",
      subscribeMessage: "Abonnieren Sie, um bis zu 100 Rechnungen pro Monat zu erstellen.",
      noInvoices: "Sie haben keine gespeicherten Rechnungen",
      loadingInvoices: "Rechnungen werden geladen...",
      publicLink: "Öffentlich",
      generateLink: "Öffentlichen Link generieren",
      copyLink: "Öffentlichen Link kopieren",
      removeLink: "Öffentlichen Link entfernen",
      confirmRemoveLink: "Öffentlichen Link aus der Rechnung entfernen",
      openLink: "Öffentlichen Link öffnen"
    },

    validation: {
      invoiceNumberRequired: "Rechnungsnummer ist erforderlich",
      clientNameRequired: "Kundenname ist erforderlich",
      itemDescriptionRequired: "Alle Positionen müssen eine Beschreibung haben"
    },
    invoicesCount: "Rechnungen",
    editingStatus: "Bearbeitung",
    activeStatus: "Aktiv",
    public: "Öffentlich",
    updated: "Aktualisiert:",
    confirmDeleteInvoice: "Möchten Sie die Rechnung wirklich löschen",
    confirmDuplicateInvoice: "Rechnung duplizieren",
    confirmRemovePublicLink: "Öffentlichen Link aus der Rechnung entfernen",
    generatingPdf: "PDF wird generiert...",
    invoicesLimit: "Rechnungen",
    subscriptionLimit: "Sie haben das Limit von",
    subscriptionMessage: "Abonnieren Sie, um bis zu 100 Rechnungen pro Monat zu erstellen.",
    freeLimit: "Löschen Sie einige oder bearbeiten Sie eine vorhandene.",
    validationErrors: "Validierungsfehler:",
    noInvoicesMessage: "Sie haben keine gespeicherten Rechnungen",
    loadingInvoicesMessage: "Rechnungen werden geladen...",
    showDetails: "Alle Vorteile anzeigen",
    hideDetails: "Details ausblenden",
    manageInvoices: "Verwaltung gespeicherter Rechnungen",
    invoicesList: "Liste gespeicherter Rechnungen",
    createdAt: "Erstellt:",
    publicLinkUrl: "🔗",

    tooltips: {
      load: "Rechnung laden zum Anzeigen",
      edit: "Rechnung bearbeiten",
      duplicate: "Rechnung duplizieren",
      delete: "Rechnung löschen",
      generatePublicLink: "Öffentlichen Link generieren",
      copyPublicLink: "Öffentlichen Link kopieren",
      openPublicLink: "Öffentlichen Link öffnen",
      removePublicLink: "Öffentlichen Link entfernen"
    }
  }
};

export const invoiceLanguageSelectorTranslations: Record<Language, {
  title: string;
  compactTitle: string;
  currentLanguage: string;
  updating: string;
  error: string;
  selectLanguage: string;
}> = {
  en: {
    title: "Invoice Language",
    compactTitle: "Invoice language",
    currentLanguage: "Invoice in:",
    updating: "Updating...",
    error: "Error",
    selectLanguage: "Select invoice language"
  },
  es: {
    title: "Idioma Factura",
    compactTitle: "Idioma de la factura",
    currentLanguage: "Factura en:",
    updating: "Actualizando...",
    error: "Error",
    selectLanguage: "Seleccionar idioma de factura"
  },
  pt: {
    title: "Idioma Fatura",
    compactTitle: "Idioma da fatura",
    currentLanguage: "Fatura em:",
    updating: "Atualizando...",
    error: "Erro",
    selectLanguage: "Selecionar idioma da fatura"
  },
  ja: {
    title: "請求書言語",
    compactTitle: "請求書の言語",
    currentLanguage: "請求書:",
    updating: "更新中...",
    error: "エラー",
    selectLanguage: "請求書の言語を選択"
  },
  fr: {
    title: "Langue Facture",
    compactTitle: "Langue de la facture",
    currentLanguage: "Facture en:",
    updating: "Mise à jour...",
    error: "Erreur",
    selectLanguage: "Sélectionner la langue de la facture"
  },
  de: {
    title: "Rechnungssprache",
    compactTitle: "Sprache der Rechnung",
    currentLanguage: "Rechnung in:",
    updating: "Wird aktualisiert...",
    error: "Fehler",
    selectLanguage: "Rechnungssprache auswählen"
  }
};


// Helper function
export const getInvoiceGeneratorTranslation = (language: Language) => {
  return invoiceGeneratorTranslations[language] || invoiceGeneratorTranslations.en;
};

export const getInvoiceLanguageSelectorTranslation = (language: Language) => {
  return invoiceLanguageSelectorTranslations[language] || invoiceLanguageSelectorTranslations.en;
};

export const landingTranslations: Record<Language, {
  // Social proof section
  socialProof: {
    trustedBy: string;
  };
  
  // Hero section
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    generateButton: string;
  };
  
  // Features
  features: {
    aiPowered: string;
    multiLanguage: string;
    instantSharing: string;
    pdfReady: string;
  };
  
  // Floating cards
  floatingCards: {
    generatedIn: string;
    currencies: string;
    languages: string;
  };
  
  // Phone screens
  phoneScreens: {
    aiGenerator: string;
    placeholder: string;
    generating: string;
    generate: string;
    invoiceTitle: string;
    from: string;
    to: string;
    yourCompany: string;
    clientName: string;
    webDesignProject: string;
    total: string;
    shareLink: string;
    downloadPdf: string;
    invoiceSent: string;
    generatedInTime: string;
  };
}> = {
  en: {
    socialProof: {
      trustedBy: "Trusted by growing businesses"
    },
    hero: {
      title: "Generate Professional\nInvoices in",
      titleHighlight: "Seconds",
      subtitle: "AI-powered invoice generation for freelancers and SMBs. Create, customize, and share invoices instantly with multi-language and multi-currency support.",
      generateButton: "Generate Invoice Free"
    },
    features: {
      aiPowered: "AI-powered generation",
      multiLanguage: "Multi-language support", 
      instantSharing: "Instant web sharing",
      pdfReady: "PDF export ready"
    },
    floatingCards: {
      generatedIn: "Generated in 2.3s",
      currencies: "25+ Currencies",
      languages: "12 Languages"
    },
    phoneScreens: {
      aiGenerator: "AI Invoice Generator",
      placeholder: "Create invoice for web design project, $2,500, due in 30 days",
      generating: "Generating...",
      generate: "Generate",
      invoiceTitle: "INVOICE #001",
      from: "From:",
      to: "To:",
      yourCompany: "Your Company",
      clientName: "Client Name",
      webDesignProject: "Web Design Project",
      total: "Total",
      shareLink: "Share Link",
      downloadPdf: "Download PDF", 
      invoiceSent: "Invoice sent to client!",
      generatedInTime: "Generated in 2.3s"
    }
  },
  es: {
    socialProof: {
      trustedBy: "Confiado por empresas en crecimiento"
    },
    hero: {
      title: "Genera Facturas\nProfesionales en",
      titleHighlight: "Segundos", 
      subtitle: "Generación de facturas con IA para freelancers y PyMEs. Crea, personaliza y comparte facturas al instante con soporte multi-idioma y multi-moneda.",
      generateButton: "Generar Factura Gratis"
    },
    features: {
      aiPowered: "Generación con IA",
      multiLanguage: "Soporte multi-idioma",
      instantSharing: "Compartir web instantáneo", 
      pdfReady: "Exportación PDF lista"
    },
    floatingCards: {
      generatedIn: "Generada en 2.3s",
      currencies: "25+ Monedas",
      languages: "12 Idiomas"
    },
    phoneScreens: {
      aiGenerator: "Generador de Facturas IA",
      placeholder: "Crear factura para proyecto diseño web, €2,290, vence en 30 días",
      generating: "Generando...",
      generate: "Generar",
      invoiceTitle: "FACTURA #001",
      from: "De:",
      to: "Para:",
      yourCompany: "Tu Empresa",
      clientName: "Nombre Cliente",
      webDesignProject: "Proyecto Diseño Web",
      total: "Total",
      shareLink: "Compartir Enlace",
      downloadPdf: "Descargar PDF",
      invoiceSent: "¡Factura enviada al cliente!",
      generatedInTime: "Generada en 2.3s"
    }
  },
  pt: {
    socialProof: {
      trustedBy: "Confiado por empresas em crescimento"
    },
    hero: {
      title: "Gere Faturas\nProfissionais em",
      titleHighlight: "Segundos",
      subtitle: "Geração de faturas com IA para freelancers e PMEs. Crie, personalize e compartilhe faturas instantaneamente com suporte multi-idioma e multi-moeda.",
      generateButton: "Gerar Fatura Grátis"
    },
    features: {
      aiPowered: "Geração com IA",
      multiLanguage: "Suporte multi-idioma",
      instantSharing: "Compartilhamento web instantâneo",
      pdfReady: "Exportação PDF pronta"
    },
    floatingCards: {
      generatedIn: "Gerada em 2.3s",
      currencies: "25+ Moedas",
      languages: "12 Idiomas"
    },
    phoneScreens: {
      aiGenerator: "Gerador de Faturas IA",
      placeholder: "Criar fatura para projeto design web, $2,500, vence em 30 dias",
      generating: "Gerando...",
      generate: "Gerar",
      invoiceTitle: "FATURA #001",
      from: "De:",
      to: "Para:",
      yourCompany: "Sua Empresa",
      clientName: "Nome Cliente",
      webDesignProject: "Projeto Design Web",
      total: "Total",
      shareLink: "Compartilhar Link",
      downloadPdf: "Baixar PDF",
      invoiceSent: "Fatura enviada ao cliente!",
      generatedInTime: "Gerada em 2.3s"
    }
  },
  ja: {
    socialProof: {
      trustedBy: "成長企業に信頼されています"
    },
    hero: {
      title: "プロフェッショナルな\n請求書を",
      titleHighlight: "秒で",
      subtitle: "フリーランサーと中小企業のためのAI搭載請求書生成。多言語・多通貨対応で請求書を瞬時に作成、カスタマイズ、共有。",
      generateButton: "無料で請求書を生成"
    },
    features: {
      aiPowered: "AI搭載生成",
      multiLanguage: "多言語サポート",
      instantSharing: "即座のWeb共有",
      pdfReady: "PDF出力対応"
    },
    floatingCards: {
      generatedIn: "2.3秒で生成",
      currencies: "25以上の通貨",
      languages: "12言語"
    },
    phoneScreens: {
      aiGenerator: "AI請求書ジェネレーター",
      placeholder: "Webデザインプロジェクトの請求書を作成、¥250,000、30日後期限",
      generating: "生成中...",
      generate: "生成",
      invoiceTitle: "請求書 #001",
      from: "差出人:",
      to: "宛先:",
      yourCompany: "あなたの会社",
      clientName: "クライアント名",
      webDesignProject: "Webデザインプロジェクト",
      total: "合計",
      shareLink: "リンク共有",
      downloadPdf: "PDF ダウンロード",
      invoiceSent: "請求書がクライアントに送信されました！",
      generatedInTime: "2.3秒で生成"
    }
  },
  fr: {
    socialProof: {
      trustedBy: "Approuvé par les entreprises en croissance"
    },
    hero: {
      title: "Générez des Factures\nProfessionnelles en",
      titleHighlight: "Secondes",
      subtitle: "Génération de factures alimentée par l'IA pour freelancers et PME. Créez, personnalisez et partagez des factures instantanément avec support multi-langues et multi-devises.",
      generateButton: "Générer Facture Gratuite"
    },
    features: {
      aiPowered: "Génération IA",
      multiLanguage: "Support multi-langues",
      instantSharing: "Partage web instantané",
      pdfReady: "Export PDF prêt"
    },
    floatingCards: {
      generatedIn: "Généré en 2.3s",
      currencies: "25+ Devises",
      languages: "12 Langues"
    },
    phoneScreens: {
      aiGenerator: "Générateur de Factures IA",
      placeholder: "Créer facture pour projet design web, €2,290, échéance 30 jours",
      generating: "Génération...",
      generate: "Générer",
      invoiceTitle: "FACTURE #001",
      from: "De:",
      to: "À:",
      yourCompany: "Votre Entreprise",
      clientName: "Nom Client",
      webDesignProject: "Projet Design Web",
      total: "Total",
      shareLink: "Partager Lien",
      downloadPdf: "Télécharger PDF",
      invoiceSent: "Facture envoyée au client!",
      generatedInTime: "Généré en 2.3s"
    }
  },
  de: {
    socialProof: {
      trustedBy: "Vertraut von wachsenden Unternehmen"
    },
    hero: {
      title: "Erstellen Sie professionelle\nRechnungen in",
      titleHighlight: "Sekunden",
      subtitle: "KI-gestützte Rechnungserstellung für Freelancer und KMUs. Erstellen, anpassen und teilen Sie Rechnungen sofort mit Multi-Sprach- und Multi-Währungsunterstützung.",
      generateButton: "Rechnung Kostenlos Erstellen"
    },
    features: {
      aiPowered: "KI-gestützte Erstellung",
      multiLanguage: "Multi-Sprach-Support",
      instantSharing: "Sofortiges Web-Sharing",
      pdfReady: "PDF-Export bereit"
    },
    floatingCards: {
      generatedIn: "Erstellt in 2.3s",
      currencies: "25+ Währungen",
      languages: "12 Sprachen"
    },
    phoneScreens: {
      aiGenerator: "KI Rechnungs-Generator",
      placeholder: "Rechnung für Webdesign-Projekt erstellen, €2,290, fällig in 30 Tagen",
      generating: "Wird erstellt...",
      generate: "Erstellen",
      invoiceTitle: "RECHNUNG #001",
      from: "Von:",
      to: "An:",
      yourCompany: "Ihr Unternehmen",
      clientName: "Kundenname",
      webDesignProject: "Webdesign-Projekt",
      total: "Gesamt",
      shareLink: "Link Teilen",
      downloadPdf: "PDF Herunterladen",
      invoiceSent: "Rechnung an Kunden gesendet!",
      generatedInTime: "Erstellt in 2.3s"
    }
  }
};

// Helper function to get landing translations
export const getLandingTranslation = (language: Language) => {
  return landingTranslations[language] || landingTranslations.en;
};