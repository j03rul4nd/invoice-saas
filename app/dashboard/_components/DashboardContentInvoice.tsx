"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  Download, 
  FileText, 
  Calendar,
  DollarSign,
  User,
  Building,
  Hash,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Eye,
  EyeOff,
  Send,
  Loader2,
  Sparkles,
  Save, 
  Archive
} from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices'; // Ajusta la ruta según tu estructura

// Textos para internacionalización
const TEXTS = {
  // Títulos principales
  mainTitle: "Generador de Facturas",
  loading: "Cargando...",
  
  // Sección de IA
  aiSection: {
    title: "Generar Factura con IA",
    placeholder: "Describe los detalles de tu factura (ej: Factura para Juan Pérez por servicios de diseño web, 3 horas a 50€/hora)",
    generating: "Generando...",
    generate: "Generar",
    errorPrefix: "Error: "
  },
  
  // Vista previa
  preview: {
    show: "Mostrar Vista Previa",
    hide: "Ocultar Vista Previa",
    title: "Vista Previa"
  },
  
  // Información de factura
  invoiceInfo: {
    title: "Información de la Factura",
    number: "Número de Factura",
    date: "Fecha",
    dueDate: "Fecha de Vencimiento"
  },
  
  // Información de empresa
  company: {
    title: "Tu Empresa",
    name: "Nombre de la empresa",
    email: "email@empresa.com",
    phone: "Teléfono",
    taxId: "NIF/CIF",
    address: "Dirección completa"
  },
  
  // Información de cliente
  client: {
    title: "Cliente",
    name: "Nombre del cliente",
    email: "email@cliente.com",
    phone: "Teléfono",
    address: "Dirección del cliente"
  },
  
  // Items de factura
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
  
  // Notas
  notes: {
    title: "Notas Adicionales",
    placeholder: "Términos de pago, información adicional, etc.",
    previewTitle: "Notas:"
  },
  
  // Acciones
  actions: {
    downloadPdf: "Descargar Factura PDF",
    newInvoice: "Nueva Factura",
    pdfComingSoon: "Función de exportación a PDF - Próximamente disponible"
  },
  
  // Factura (vista previa)
  invoice: {
    title: "FACTURA",
    from: "De:",
    to: "Para:",
    description: "Descripción",
    quantity: "Cant.",
    price: "Precio",
    total: "Total",
    subtotal: "Subtotal:",
    tax: "IVA",
    finalTotal: "Total:",
    defaultCompany: "Tu Empresa",
    defaultClient: "Cliente"
  },
  
  // Mensajes de error y API
  api: {
    networkError: "Error de conexión",
    serverError: "Error del servidor",
    unknownError: "Error desconocido",
    simulatingResponse: "Simulando respuesta de API para prompt:",
    generatingError: "Error generating invoice with AI:"
  },
  
  // Datos de ejemplo para simulación
  simulation: {
    clientName: "Cliente Ejemplo",
    clientEmail: "cliente@ejemplo.com",
    serviceDescription: "Servicio de consultoría",
    invoiceNotes: "Factura generada con IA"
  }
};

// Tipos para la estructura de datos de la factura
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: CompanyInfo;
  client: ClientInfo;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
}

// Tipo para la respuesta de la API
interface APIInvoiceResponse {
  company?: Partial<CompanyInfo>;
  client?: Partial<ClientInfo>;
  items?: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
  taxRate?: number;
  invoiceNumber?: string;
}

// Hook personalizado mejorado para manejar el estado de la factura
const useInvoiceData = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    date: '',
    dueDate: '',
    company: {
      name: '',
      email: '',
      phone: '',
      address: '',
      taxId: ''
    },
    client: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        price: 0,
        total: 0
      }
    ],
    notes: '',
    subtotal: 0,
    tax: 0,
    taxRate: 21,
    total: 0
  });

  // Función para generar ID único para items
  const generateItemId = useCallback(() => {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Función para calcular totales
  const calculateTotals = useCallback((items: InvoiceItem[], taxRate: number) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  }, []);

  // Función principal para actualizar cualquier parte de la factura
  const updateInvoiceData = useCallback((updates: Partial<InvoiceData>) => {
    setInvoiceData(prev => {
      const newData = { ...prev, ...updates };
      
      // Si se actualizaron items o taxRate, recalcular totales
      if (updates.items || updates.taxRate) {
        const items = updates.items || prev.items;
        const taxRate = updates.taxRate !== undefined ? updates.taxRate : prev.taxRate;
        const totals = calculateTotals(items, taxRate);
        return { ...newData, ...totals };
      }
      
      return newData;
    });
  }, [calculateTotals]);

  // Función para actualizar información de la empresa
  const updateCompanyInfo = useCallback((updates: Partial<CompanyInfo>) => {
    setInvoiceData(prev => ({
      ...prev,
      company: { ...prev.company, ...updates }
    }));
  }, []);

  // Función para actualizar información del cliente
  const updateClientInfo = useCallback((updates: Partial<ClientInfo>) => {
    setInvoiceData(prev => ({
      ...prev,
      client: { ...prev.client, ...updates }
    }));
  }, []);

  // Función para añadir un item
  const addItem = useCallback((itemData?: Partial<InvoiceItem>) => {
    const newItem: InvoiceItem = {
      id: generateItemId(),
      description: itemData?.description || '',
      quantity: itemData?.quantity || 1,
      price: itemData?.price || 0,
      total: (itemData?.quantity || 1) * (itemData?.price || 0)
    };
    
    setInvoiceData(prev => {
      const newItems = [...prev.items, newItem];
      const totals = calculateTotals(newItems, prev.taxRate);
      return { ...prev, items: newItems, ...totals };
    });
  }, [generateItemId, calculateTotals]);

  // Función para actualizar un item específico
  const updateItem = useCallback((id: string, updates: Partial<InvoiceItem>) => {
    setInvoiceData(prev => {
      const newItems = prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updates };
          updatedItem.total = updatedItem.quantity * updatedItem.price;
          return updatedItem;
        }
        return item;
      });
      
      const totals = calculateTotals(newItems, prev.taxRate);
      return { ...prev, items: newItems, ...totals };
    });
  }, [calculateTotals]);

  // Función para eliminar un item
  const removeItem = useCallback((id: string) => {
    setInvoiceData(prev => {
      if (prev.items.length <= 1) return prev;
      
      const newItems = prev.items.filter(item => item.id !== id);
      const totals = calculateTotals(newItems, prev.taxRate);
      return { ...prev, items: newItems, ...totals };
    });
  }, [calculateTotals]);

  // Función para limpiar todos los items
  const clearItems = useCallback(() => {
    const emptyItem: InvoiceItem = {
      id: generateItemId(),
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    
    setInvoiceData(prev => ({
      ...prev,
      items: [emptyItem],
      subtotal: 0,
      tax: 0,
      total: 0
    }));
  }, [generateItemId]);

  // Función para aplicar datos de la API
  const applyAPIResponse = useCallback((apiData: APIInvoiceResponse) => {
    setInvoiceData(prev => {
      let newData = { ...prev };
      
      // Actualizar información de la empresa si viene en la respuesta
      if (apiData.company) {
        newData.company = { ...prev.company, ...apiData.company };
      }
      
      // Actualizar información del cliente si viene en la respuesta
      if (apiData.client) {
        newData.client = { ...prev.client, ...apiData.client };
      }
      
      // Actualizar items si vienen en la respuesta
      if (apiData.items && apiData.items.length > 0) {
        newData.items = apiData.items.map(item => ({
          id: generateItemId(),
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price
        }));
      }
      
      // Actualizar otros campos
      if (apiData.notes) newData.notes = apiData.notes;
      if (apiData.taxRate !== undefined) newData.taxRate = apiData.taxRate;
      if (apiData.invoiceNumber) newData.invoiceNumber = apiData.invoiceNumber;
      
      // Recalcular totales
      const totals = calculateTotals(newData.items, newData.taxRate);
      return { ...newData, ...totals };
    });
  }, [generateItemId, calculateTotals]);

  // Función para resetear la factura completa
  const resetInvoice = useCallback(() => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    setInvoiceData({
      invoiceNumber: `INV-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      dueDate: futureDate.toISOString().split('T')[0],
      company: {
        name: '',
        email: '',
        phone: '',
        address: '',
        taxId: ''
      },
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      items: [{
        id: generateItemId(),
        description: '',
        quantity: 1,
        price: 0,
        total: 0
      }],
      notes: '',
      subtotal: 0,
      tax: 0,
      taxRate: 21,
      total: 0
    });
  }, [generateItemId]);

  return {
    invoiceData,
    updateInvoiceData,
    updateCompanyInfo,
    updateClientInfo,
    addItem,
    updateItem,
    removeItem,
    clearItems,
    applyAPIResponse,
    resetInvoice
  };
};

// Hook para manejar la API de generación de facturas
const useInvoiceAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInvoice = useCallback(async (prompt: string): Promise<APIInvoiceResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí irá tu endpoint de API
      const response = await fetch('/api/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`${TEXTS.api.serverError} ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : TEXTS.api.unknownError;
      setError(errorMessage);
      console.error(TEXTS.api.generatingError, err);
      
      // Simulación de respuesta para desarrollo
      console.log(TEXTS.api.simulatingResponse, prompt);
      return {
        client: {
          name: TEXTS.simulation.clientName,
          email: TEXTS.simulation.clientEmail
        },
        items: [
          {
            description: TEXTS.simulation.serviceDescription,
            quantity: 1,
            price: 100.00
          }
        ],
        notes: TEXTS.simulation.invoiceNotes
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generateInvoice, isLoading, error };
};

export default function InvoiceGenerator() {
  const {
    invoiceData,
    updateInvoiceData,
    updateCompanyInfo,
    updateClientInfo,
    addItem,
    updateItem,
    removeItem,
    clearItems,
    applyAPIResponse,
    resetInvoice
  } = useInvoiceData();
  const { 
  invoices, 
  loading: loadingInvoices, 
  saving, 
  saveInvoice, 
  deleteInvoice, 
  refreshInvoices 
} = useInvoices();

  const { generateInvoice, isLoading, error } = useInvoiceAPI();

  const [showPreview, setShowPreview] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showSavedInvoices, setShowSavedInvoices] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Efecto para inicializar datos que dependen del cliente
  useEffect(() => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    updateInvoiceData({
      invoiceNumber: `INV-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      dueDate: futureDate.toISOString().split('T')[0]
    });
    
    setMounted(true);
  }, [updateInvoiceData]);

  // Función para manejar la generación con IA
  const handleAIGeneration = useCallback(async () => {
    if (!aiPrompt.trim()) return;

    try {
      const result = await generateInvoice(aiPrompt);
      if (result) {
        applyAPIResponse(result);
        setAiPrompt(''); // Limpiar el prompt después de usarlo
      }
    } catch (err) {
      console.error(TEXTS.api.generatingError, err);
    }
  }, [aiPrompt, generateInvoice, applyAPIResponse]);
  
  const handleSaveInvoice = useCallback(async () => {
        const success = await saveInvoice(invoiceData);
        if (success) {
            // Opcional: mostrar mensaje de éxito o realizar alguna acción
        }
  }, [saveInvoice, invoiceData]);
  
  const handleLoadInvoice = useCallback((savedInvoice: any) => {
    // Usar tu función applyAPIResponse existente para cargar los datos
    applyAPIResponse({
        company: savedInvoice.company,
        client: savedInvoice.client,
        items: savedInvoice.items,
        notes: savedInvoice.notes,
        taxRate: savedInvoice.taxRate,
        invoiceNumber: savedInvoice.invoiceNumber
    });
    
    // También actualizar fechas y otros campos
    updateInvoiceData({
        date: savedInvoice.date,
        dueDate: savedInvoice.dueDate
    });
    
    setShowSavedInvoices(false);
  }, [applyAPIResponse, updateInvoiceData]);
  
  const handleDeleteInvoice = useCallback(async (invoiceId: string, invoiceNumber: string) => {
  if (confirm(`¿Estás seguro de que quieres eliminar la factura ${invoiceNumber}?`)) {
    await deleteInvoice(invoiceId);
  }
  }, [deleteInvoice]);


  // Función para exportar la factura como PDF
  const exportToPDF = useCallback(async () => {
    alert(TEXTS.actions.pdfComingSoon);
  }, []);

  // No renderizar hasta que el componente esté montado en el cliente
  if (!mounted) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
              {TEXTS.mainTitle}
            </h1>
            <p className="text-gray-300">{TEXTS.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Generación con IA */}
        <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
          <h3 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            {TEXTS.aiSection.title}
          </h3>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder={TEXTS.aiSection.placeholder}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleAIGeneration()}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                       text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleAIGeneration}
              disabled={isLoading || !aiPrompt.trim()}
              className="px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/20 
                       rounded-lg text-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {TEXTS.aiSection.generating}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {TEXTS.aiSection.generate}
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-400/20 rounded-lg text-red-300 text-sm">
              {TEXTS.aiSection.errorPrefix}{error}
            </div>
          )}
        </div>

        {/* Gestión de Facturas Guardadas */}
        <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-200 flex items-center">
            <Archive className="h-5 w-5 mr-2" />
            Facturas Guardadas
            </h3>
            <span className="text-sm text-gray-400">
            {invoices.length}/5 facturas
            </span>
        </div>
        
        <div className="flex flex-wrap gap-3">
            {/* Botón Guardar */}
            <button
            onClick={handleSaveInvoice}
            disabled={saving || invoices.length >= 5}
            className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 
                    border border-green-400/20 rounded-lg text-green-200 transition-all 
                    disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar Factura'}
            </button>
            
            {/* Botón Ver Facturas */}
            <button
            onClick={() => setShowSavedInvoices(!showSavedInvoices)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 
                    border border-blue-400/20 rounded-lg text-blue-200 transition-all"
            >
            <Archive className="h-4 w-4" />
            {showSavedInvoices ? 'Ocultar' : 'Ver'} Facturas ({invoices.length})
            </button>
        </div>
        
        {/* Mensaje de límite */}
        {invoices.length >= 5 && (
            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
            <p className="text-sm text-yellow-300">
                Has alcanzado el límite de 5 facturas. Elimina alguna para guardar nuevas.
            </p>
            </div>
        )}
        </div>
        
        {/* Lista de Facturas Guardadas */}
        {showSavedInvoices && (
        <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
            <h4 className="text-lg font-semibold text-purple-200 mb-4">Facturas Guardadas</h4>
            
            {loadingInvoices ? (
            <div className="text-center py-4 text-gray-400">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                Cargando facturas...
            </div>
            ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No tienes facturas guardadas</p>
            </div>
            ) : (
            <div className="space-y-3">
                {invoices.map((invoice) => (
                <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-600/20"
                >
                    <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                        <p className="font-medium text-white">
                            {invoice.invoiceNumber}
                        </p>
                        <p className="text-sm text-gray-400">
                            {invoice.client.name} • €{invoice.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(invoice.createdAt).toLocaleDateString()}
                        </p>
                        </div>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleLoadInvoice(invoice)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
                        title="Cargar factura"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteInvoice(invoice.id, invoice.invoiceNumber)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                        title="Eliminar factura"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        )}

        {/* Toggle Preview Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 
                     border border-purple-400/20 rounded-xl text-purple-200 transition-all"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreview ? TEXTS.preview.hide : TEXTS.preview.show}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Formulario */}
          <div className="space-y-6">
            
            {/* Información de la Factura */}
            <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
              <h3 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                {TEXTS.invoiceInfo.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {TEXTS.invoiceInfo.number}
                  </label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => updateInvoiceData({ invoiceNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {TEXTS.invoiceInfo.date}
                  </label>
                  <input
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => updateInvoiceData({ date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {TEXTS.invoiceInfo.dueDate}
                  </label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => updateInvoiceData({ dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Información de la Empresa */}
            <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
              <h3 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                {TEXTS.company.title}
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={TEXTS.company.name}
                  value={invoiceData.company.name}
                  onChange={(e) => updateCompanyInfo({ name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder={TEXTS.company.email}
                    value={invoiceData.company.email}
                    onChange={(e) => updateCompanyInfo({ email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder={TEXTS.company.phone}
                    value={invoiceData.company.phone}
                    onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                
                <input
                  type="text"
                  placeholder={TEXTS.company.taxId}
                  value={invoiceData.company.taxId}
                  onChange={(e) => updateCompanyInfo({ taxId: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                />
                
                <textarea
                  placeholder={TEXTS.company.address}
                  value={invoiceData.company.address}
                  onChange={(e) => updateCompanyInfo({ address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Información del Cliente */}
            <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
              <h3 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                {TEXTS.client.title}
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={TEXTS.client.name}
                  value={invoiceData.client.name}
                  onChange={(e) => updateClientInfo({ name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder={TEXTS.client.email}
                    value={invoiceData.client.email}
                    onChange={(e) => updateClientInfo({ email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder={TEXTS.client.phone}
                    value={invoiceData.client.phone}
                    onChange={(e) => updateClientInfo({ phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                
                <textarea
                  placeholder={TEXTS.client.address}
                  value={invoiceData.client.address}
                  onChange={(e) => updateClientInfo({ address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Items de la Factura */}
            <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-purple-200 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {TEXTS.items.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => addItem()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 
                             border border-purple-400/20 rounded-lg text-purple-200 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    {TEXTS.items.add}
                  </button>
                  <button
                    onClick={clearItems}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 
                             border border-red-400/20 rounded-lg text-red-200 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                    {TEXTS.items.clear}
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-5">
                        <input
                          type="text"
                          placeholder={TEXTS.items.description}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, { description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded 
                                   text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <input
                          type="number"
                          placeholder={TEXTS.items.quantity}
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded 
                                   text-white text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <input
                          type="number"
                          placeholder={TEXTS.items.price}
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded 
                                   text-white text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="px-3 py-2 bg-gray-600/30 rounded text-white text-sm text-center">
                          €{item.total.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="md:col-span-1">
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={invoiceData.items.length === 1}
                          className="w-full p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 
                                   rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="h-4 w-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tax Rate */}
              <div className="mt-4 flex items-center justify-end">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-300">{TEXTS.items.taxRate}:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={invoiceData.taxRate}
                    onChange={(e) => {
                      const newTaxRate = parseFloat(e.target.value) || 0;
                      updateInvoiceData({ taxRate: newTaxRate });
                    }}
                    className="w-20 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded 
                             text-white text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Notas */}
            <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
              <h3 className="text-xl font-semibold text-purple-200 mb-4">
                {TEXTS.notes.title}
              </h3>
              <textarea
                placeholder={TEXTS.notes.placeholder}
                value={invoiceData.notes}
                onChange={(e) => updateInvoiceData({ notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg 
                         text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={exportToPDF}
                className="group relative inline-flex items-center justify-center w-full gap-2 rounded-xl bg-black px-4 py-4
                          text-white transition-all hover:bg-white/5"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF1E56] via-[#FF00FF] to-[#00FFFF]
                                opacity-70 blur-sm transition-all group-hover:opacity-100" />
                <span className="absolute inset-0.5 rounded-xl bg-black/50" />
                <span className="relative flex items-center gap-2 font-medium">
                  <Download className="h-5 w-5" />
                  {TEXTS.actions.downloadPdf}
                </span>
              </button>
              
              <button
                onClick={resetInvoice}
                className="w-full px-4 py-3 bg-gray-600/20 hover:bg-gray-600/30 border border-gray-400/20 
                         rounded-xl text-gray-200 transition-all"
              >
                {TEXTS.actions.newInvoice}
              </button>
            </div>
          </div>

          {/* Vista Previa */}
          {showPreview && (
            <div className="lg:sticky lg:top-4 lg:h-fit">
              <div className="p-6 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30">
                <h3 className="text-xl font-semibold text-purple-200 mb-6 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  {TEXTS.preview.title}
                </h3>
                
                {/* Invoice Preview */}
                <div ref={invoiceRef} className="bg-white text-black p-8 rounded-lg shadow-lg">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">{TEXTS.invoice.title}</h1>
                      <p className="text-gray-600">#{invoiceData.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{TEXTS.invoiceInfo.date}: {invoiceData.date}</p>
                      <p className="text-sm text-gray-600">{TEXTS.invoiceInfo.dueDate}: {invoiceData.dueDate}</p>
                    </div>
                  </div>

                  {/* Company & Client Info */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{TEXTS.invoice.from}</h3>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{invoiceData.company.name || TEXTS.invoice.defaultCompany}</p>
                        <p>{invoiceData.company.email}</p>
                        <p>{invoiceData.company.phone}</p>
                        <p>{invoiceData.company.taxId}</p>
                        <p className="whitespace-pre-line">{invoiceData.company.address}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{TEXTS.invoice.to}</h3>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{invoiceData.client.name || TEXTS.invoice.defaultClient}</p>
                        <p>{invoiceData.client.email}</p>
                        <p>{invoiceData.client.phone}</p>
                        <p className="whitespace-pre-line">{invoiceData.client.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="mb-8">
                    <table className="w-full">
                      <thead className="border-b-2 border-gray-200">
                        <tr>
                          <th className="text-left py-2 text-sm font-semibold text-gray-800">{TEXTS.invoice.description}</th>
                          <th className="text-center py-2 text-sm font-semibold text-gray-800">{TEXTS.invoice.quantity}</th>
                          <th className="text-right py-2 text-sm font-semibold text-gray-800">{TEXTS.invoice.price}</th>
                          <th className="text-right py-2 text-sm font-semibold text-gray-800">{TEXTS.invoice.total}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-3 text-sm text-gray-700">{item.description || TEXTS.items.defaultDescription}</td>
                            <td className="py-3 text-sm text-gray-700 text-center">{item.quantity}</td>
                            <td className="py-3 text-sm text-gray-700 text-right">€{item.price.toFixed(2)}</td>
                            <td className="py-3 text-sm text-gray-700 text-right">€{item.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end mb-8">
                    <div className="w-64">
                      <div className="flex justify-between py-2 text-sm">
                        <span className="text-gray-600">{TEXTS.invoice.subtotal}</span>
                        <span className="text-gray-800">€{invoiceData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 text-sm">
                        <span className="text-gray-600">{TEXTS.invoice.tax} ({invoiceData.taxRate}%):</span>
                        <span className="text-gray-800">€{invoiceData.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 text-lg font-semibold border-t border-gray-200">
                        <span className="text-gray-800">{TEXTS.invoice.finalTotal}</span>
                        <span className="text-gray-800">€{invoiceData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {invoiceData.notes && (
                    <div className="mt-8">
                      <h3 className="font-semibold text-gray-800 mb-2">{TEXTS.notes.previewTitle}</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}