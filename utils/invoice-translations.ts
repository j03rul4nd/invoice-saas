// utils/invoice-translations.ts

// Tipos
export type InvoiceLanguageCode = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'ja' | 'zh' | 'ar';

export interface InvoiceLanguage {
  code: InvoiceLanguageCode;
  name: string;
  flag: string;
}

// Idiomas disponibles para facturas
export const INVOICE_LANGUAGES: InvoiceLanguage[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ca', name: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

// Interfaz para las traducciones
export interface InvoiceTexts {
  // Títulos principales de la factura
  invoice: {
    title: string;
    number: string;
    date: string;
    dueDate: string;
    from: string;
    to: string;
  };
  
  // Tabla de items
  table: {
    description: string;
    quantity: string;
    price: string;
    total: string;
  };
  
  // Totales
  totals: {
    subtotal: string;
    tax: string;
    total: string;
  };
  
  // Notas y otros
  other: {
    notes: string;
    defaultCompany: string;
    defaultClient: string;
    defaultItem: string;
  };
  
  // Campos de empresa
  company: {
    name: string;
    email: string;
    phone: string;
    taxId: string;
    address: string;
  };
  
  // Campos de cliente
  client: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  
  // Términos comunes
  common: {
    page: string;
    of: string;
  };
}

// Traducciones específicas para cada idioma
export const INVOICE_TRANSLATIONS: Record<InvoiceLanguageCode, InvoiceTexts> = {
  es: {
    invoice: {
      title: 'FACTURA',
      number: 'Número',
      date: 'Fecha',
      dueDate: 'Fecha de Vencimiento',
      from: 'De:',
      to: 'Para:',
    },
    table: {
      description: 'Descripción',
      quantity: 'Cant.',
      price: 'Precio',
      total: 'Total',
    },
    totals: {
      subtotal: 'Subtotal:',
      tax: 'IVA',
      total: 'Total:',
    },
    other: {
      notes: 'Notas:',
      defaultCompany: 'Tu Empresa',
      defaultClient: 'Cliente',
      defaultItem: 'Producto/Servicio',
    },
    company: {
      name: 'Empresa',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      taxId: 'NIF/CIF',
      address: 'Dirección',
    },
    client: {
      name: 'Cliente',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
    },
    common: {
      page: 'Página',
      of: 'de',
    },
  },
  
  en: {
    invoice: {
      title: 'INVOICE',
      number: 'Number',
      date: 'Date',
      dueDate: 'Due Date',
      from: 'From:',
      to: 'To:',
    },
    table: {
      description: 'Description',
      quantity: 'Qty',
      price: 'Price',
      total: 'Total',
    },
    totals: {
      subtotal: 'Subtotal:',
      tax: 'Tax',
      total: 'Total:',
    },
    other: {
      notes: 'Notes:',
      defaultCompany: 'Your Company',
      defaultClient: 'Client',
      defaultItem: 'Product/Service',
    },
    company: {
      name: 'Company',
      email: 'Email',
      phone: 'Phone',
      taxId: 'Tax ID',
      address: 'Address',
    },
    client: {
      name: 'Client',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
    },
    common: {
      page: 'Page',
      of: 'of',
    },
  },
  
  fr: {
    invoice: {
      title: 'FACTURE',
      number: 'Numéro',
      date: 'Date',
      dueDate: 'Date d\'échéance',
      from: 'De:',
      to: 'À:',
    },
    table: {
      description: 'Description',
      quantity: 'Qté',
      price: 'Prix',
      total: 'Total',
    },
    totals: {
      subtotal: 'Sous-total:',
      tax: 'TVA',
      total: 'Total:',
    },
    other: {
      notes: 'Notes:',
      defaultCompany: 'Votre Entreprise',
      defaultClient: 'Client',
      defaultItem: 'Produit/Service',
    },
    company: {
      name: 'Entreprise',
      email: 'Email',
      phone: 'Téléphone',
      taxId: 'N° TVA',
      address: 'Adresse',
    },
    client: {
      name: 'Client',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse',
    },
    common: {
      page: 'Page',
      of: 'de',
    },
  },
  
  de: {
    invoice: {
      title: 'RECHNUNG',
      number: 'Nummer',
      date: 'Datum',
      dueDate: 'Fälligkeitsdatum',
      from: 'Von:',
      to: 'An:',
    },
    table: {
      description: 'Beschreibung',
      quantity: 'Anz.',
      price: 'Preis',
      total: 'Gesamt',
    },
    totals: {
      subtotal: 'Zwischensumme:',
      tax: 'MwSt',
      total: 'Gesamt:',
    },
    other: {
      notes: 'Notizen:',
      defaultCompany: 'Ihr Unternehmen',
      defaultClient: 'Kunde',
      defaultItem: 'Produkt/Service',
    },
    company: {
      name: 'Unternehmen',
      email: 'E-Mail',
      phone: 'Telefon',
      taxId: 'Steuernummer',
      address: 'Adresse',
    },
    client: {
      name: 'Kunde',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
    },
    common: {
      page: 'Seite',
      of: 'von',
    },
  },
  
  it: {
    invoice: {
      title: 'FATTURA',
      number: 'Numero',
      date: 'Data',
      dueDate: 'Scadenza',
      from: 'Da:',
      to: 'A:',
    },
    table: {
      description: 'Descrizione',
      quantity: 'Qta',
      price: 'Prezzo',
      total: 'Totale',
    },
    totals: {
      subtotal: 'Subtotale:',
      tax: 'IVA',
      total: 'Totale:',
    },
    other: {
      notes: 'Note:',
      defaultCompany: 'La Tua Azienda',
      defaultClient: 'Cliente',
      defaultItem: 'Prodotto/Servizio',
    },
    company: {
      name: 'Azienda',
      email: 'Email',
      phone: 'Telefono',
      taxId: 'P.IVA',
      address: 'Indirizzo',
    },
    client: {
      name: 'Cliente',
      email: 'Email',
      phone: 'Telefono',
      address: 'Indirizzo',
    },
    common: {
      page: 'Pagina',
      of: 'di',
    },
  },
  
  pt: {
    invoice: {
      title: 'FATURA',
      number: 'Número',
      date: 'Data',
      dueDate: 'Data de Vencimento',
      from: 'De:',
      to: 'Para:',
    },
    table: {
      description: 'Descrição',
      quantity: 'Qtd',
      price: 'Preço',
      total: 'Total',
    },
    totals: {
      subtotal: 'Subtotal:',
      tax: 'IVA',
      total: 'Total:',
    },
    other: {
      notes: 'Notas:',
      defaultCompany: 'Sua Empresa',
      defaultClient: 'Cliente',
      defaultItem: 'Produto/Serviço',
    },
    company: {
      name: 'Empresa',
      email: 'Email',
      phone: 'Telefone',
      taxId: 'NIF',
      address: 'Morada',
    },
    client: {
      name: 'Cliente',
      email: 'Email',
      phone: 'Telefone',
      address: 'Morada',
    },
    common: {
      page: 'Página',
      of: 'de',
    },
  },

  ca: {
    invoice: {
      title: 'FACTURA',
      number: 'Número',
      date: 'Data',
      dueDate: 'Data de venciment',
      from: 'De:',
      to: 'Per a:',
    },
    table: {
      description: 'Descripció',
      quantity: 'Qt.',
      price: 'Preu',
      total: 'Total',
    },
    totals: {
      subtotal: 'Subtotal:',
      tax: 'IVA',
      total: 'Total:',
    },
    other: {
      notes: 'Notes:',
      defaultCompany: 'La Teva Empresa',
      defaultClient: 'Client',
      defaultItem: 'Producte/Servei',
    },
    company: {
      name: 'Empresa',
      email: 'Correu electrònic',
      phone: 'Telèfon',
      taxId: 'NIF/CIF',
      address: 'Adreça',
    },
    client: {
      name: 'Client',
      email: 'Correu electrònic',
      phone: 'Telèfon',
      address: 'Adreça',
    },
    common: {
      page: 'Pàgina',
      of: 'de',
    },
  },

  ja: {
    invoice: {
      title: '請求書',
      number: '番号',
      date: '日付',
      dueDate: '支払期限',
      from: '差出人:',
      to: '宛先:',
    },
    table: {
      description: '詳細',
      quantity: '数量',
      price: '単価',
      total: '合計',
    },
    totals: {
      subtotal: '小計:',
      tax: '税',
      total: '合計:',
    },
    other: {
      notes: '備考:',
      defaultCompany: 'あなたの会社',
      defaultClient: 'クライアント',
      defaultItem: '商品/サービス',
    },
    company: {
      name: '会社名',
      email: 'メール',
      phone: '電話番号',
      taxId: '税務番号',
      address: '住所',
    },
    client: {
      name: 'クライアント',
      email: 'メール',
      phone: '電話番号',
      address: '住所',
    },
    common: {
      page: 'ページ',
      of: '/',
    },
  },

  zh: {
    invoice: {
      title: '发票',
      number: '编号',
      date: '日期',
      dueDate: '到期日期',
      from: '发件人:',
      to: '收件人:',
    },
    table: {
      description: '描述',
      quantity: '数量',
      price: '价格',
      total: '总计',
    },
    totals: {
      subtotal: '小计:',
      tax: '税费',
      total: '总计:',
    },
    other: {
      notes: '备注:',
      defaultCompany: '您的公司',
      defaultClient: '客户',
      defaultItem: '产品/服务',
    },
    company: {
      name: '公司',
      email: '邮箱',
      phone: '电话',
      taxId: '税号',
      address: '地址',
    },
    client: {
      name: '客户',
      email: '邮箱',
      phone: '电话',
      address: '地址',
    },
    common: {
      page: '页',
      of: '/',
    },
  },

  ar: {
    invoice: {
      title: 'فاتورة',
      number: 'الرقم',
      date: 'التاريخ',
      dueDate: 'تاريخ الاستحقاق',
      from: 'من:',
      to: 'إلى:',
    },
    table: {
      description: 'الوصف',
      quantity: 'الكمية',
      price: 'السعر',
      total: 'المجموع',
    },
    totals: {
      subtotal: 'المجموع الفرعي:',
      tax: 'الضريبة',
      total: 'المجموع الكلي:',
    },
    other: {
      notes: 'ملاحظات:',
      defaultCompany: 'شركتك',
      defaultClient: 'العميل',
      defaultItem: 'المنتج/الخدمة',
    },
    company: {
      name: 'الشركة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      taxId: 'الرقم الضريبي',
      address: 'العنوان',
    },
    client: {
      name: 'العميل',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
    },
    common: {
      page: 'صفحة',
      of: 'من',
    },
  }

  
};

// Hook para usar las traducciones de factura
export const useInvoiceTranslations = (language: InvoiceLanguageCode) => {
  return INVOICE_TRANSLATIONS[language] || INVOICE_TRANSLATIONS.es;
};

// Función auxiliar para obtener traducciones
export const getInvoiceTexts = (language: InvoiceLanguageCode): InvoiceTexts => {
  return INVOICE_TRANSLATIONS[language] || INVOICE_TRANSLATIONS.es;
};

// Función para obtener el nombre del idioma
export const getLanguageName = (code: InvoiceLanguageCode): string => {
  const language = INVOICE_LANGUAGES.find(lang => lang.code === code);
  return language?.name || 'Español';
};

// Función para obtener la bandera del idioma
export const getLanguageFlag = (code: InvoiceLanguageCode): string => {
  const language = INVOICE_LANGUAGES.find(lang => lang.code === code);
  return language?.flag || '🇪🇸';
};