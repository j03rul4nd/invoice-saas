import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { InvoiceLanguageCode } from './useInvoiceLanguage';

// Tipos
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
  currency: string;
  language: InvoiceLanguageCode; // ✅ Idioma específico para la factura
  client: ClientInfo;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
}

interface SavedInvoice extends InvoiceData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Tipo para actualizaciones parciales
type InvoiceUpdateData = Partial<InvoiceData>;

// Tipo para filtros de búsqueda
interface InvoiceFilters {
  language?: InvoiceLanguageCode;
  currency?: string;
  dateFrom?: string;
  dateTo?: string;
  clientName?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
}

// ✅ Configuración de idiomas para facturas
const INVOICE_LANGUAGE_NAMES: Record<InvoiceLanguageCode, string> = {
  'es': 'Español',
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'it': 'Italiano',
  'pt': 'Português',
  'ca': 'Català',
  'ja': '日本語',
  'zh': '中文',
  'ar': 'العربية'
};

export function useInvoices() {
  const [invoices, setInvoices] = useState<SavedInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [filters, setFilters] = useState<InvoiceFilters>({});

  // ✅ Cargar facturas con filtros opcionales
  const fetchInvoices = async (searchFilters?: InvoiceFilters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      // Aplicar filtros de búsqueda
      const activeFilters = searchFilters || filters;
      if (activeFilters.language) queryParams.append('language', activeFilters.language);
      if (activeFilters.currency) queryParams.append('currency', activeFilters.currency);
      if (activeFilters.dateFrom) queryParams.append('dateFrom', activeFilters.dateFrom);
      if (activeFilters.dateTo) queryParams.append('dateTo', activeFilters.dateTo);
      if (activeFilters.clientName) queryParams.append('clientName', activeFilters.clientName);
      if (activeFilters.status) queryParams.append('status', activeFilters.status);

      const url = `/api/invoices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setInvoices(data.invoices || []);
        return data.invoices || [];
      } else {
        toast.error(data.error || 'Error al cargar facturas');
        console.error('Error loading invoices:', data.error);
        return [];
      }
    } catch (error) {
      toast.error('Error de conexión al cargar facturas');
      console.error('Network error:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ✅ Guardar nueva factura con validación de idioma
  const saveInvoice = async (invoiceData: InvoiceData): Promise<SavedInvoice | null> => {
    setSaving(true);
    try {
      // Validar datos antes de enviar
      const validationErrors = validateInvoiceData(invoiceData);
      if (validationErrors.length > 0) {
        toast.error(`Errores de validación: ${validationErrors.join(', ')}`);
        return null;
      }

      // ✅ Asegurar que el idioma esté configurado
      if (!invoiceData.language) {
        invoiceData.language = 'es'; // Idioma por defecto
      }

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (response.ok) {
        const languageName = INVOICE_LANGUAGE_NAMES[invoiceData.language];
        toast.success(`Factura guardada en ${languageName} exitosamente`);
        await fetchInvoices(); // Recargar la lista
        return data.invoice;
      } else {
        toast.error(data.error || 'Error al guardar factura');
        console.error('Error saving invoice:', data.error);
        return null;
      }
    } catch (error) {
      toast.error('Error de conexión al guardar factura');
      console.error('Network error:', error);
      return null;
    } finally {
      setSaving(false);
    }
  };

  // ✅ Actualizar factura existente con soporte para cambio de idioma
  const updateInvoice = async (invoiceId: string, updateData: InvoiceUpdateData): Promise<SavedInvoice | null> => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        let message = 'Factura actualizada exitosamente';
        if (updateData.language) {
          const languageName = INVOICE_LANGUAGE_NAMES[updateData.language];
          message = `Factura actualizada a ${languageName} exitosamente`;
        }
        toast.success(message);
        await fetchInvoices(); // Recargar la lista
        return data.invoice;
      } else {
        toast.error(data.error || 'Error al actualizar factura');
        console.error('Error updating invoice:', data.error);
        return null;
      }
    } catch (error) {
      toast.error('Error de conexión al actualizar factura');
      console.error('Network error:', error);
      return null;
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Obtener una factura específica
  const getInvoice = async (invoiceId: string): Promise<SavedInvoice | null> => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`);
      const data = await response.json();

      if (response.ok) {
        return data.invoice;
      } else {
        toast.error(data.error || 'Error al cargar factura');
        console.error('Error getting invoice:', data.error);
        return null;
      }
    } catch (error) {
      toast.error('Error de conexión al cargar factura');
      console.error('Network error:', error);
      return null;
    }
  };

  // ✅ Eliminar factura
  const deleteInvoice = async (invoiceId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Factura eliminada exitosamente');
        await fetchInvoices(); // Recargar la lista
        return true;
      } else {
        toast.error(data.error || 'Error al eliminar factura');
        console.error('Error deleting invoice:', data.error);
        return false;
      }
    } catch (error) {
      toast.error('Error de conexión al eliminar factura');
      console.error('Network error:', error);
      return false;
    }
  };

  // ✅ Función mejorada para validar datos de factura incluyendo idioma
  const validateInvoiceData = (invoiceData: InvoiceData): string[] => {
    const errors: string[] = [];

    // Validaciones básicas
    if (!invoiceData.invoiceNumber?.trim()) {
      errors.push('Número de factura es requerido');
    }
    if (!invoiceData.currency?.trim()) {
      errors.push('Moneda es requerida');
    }
    if (!invoiceData.date) {
      errors.push('Fecha es requerida');
    }
    if (!invoiceData.dueDate) {
      errors.push('Fecha de vencimiento es requerida');
    }

    // ✅ Validación del idioma de factura
    if (!invoiceData.language) {
      errors.push('Idioma de factura es requerido');
    } else if (!Object.keys(INVOICE_LANGUAGE_NAMES).includes(invoiceData.language)) {
      errors.push('Idioma de factura no válido');
    }

    // Validar items
    if (!invoiceData.items || invoiceData.items.length === 0) {
      errors.push('Al menos un item es requerido');
    }
    if (invoiceData.items?.some(item => !item.description?.trim())) {
      errors.push('Todos los items deben tener descripción');
    }
    if (invoiceData.items?.some(item => item.quantity <= 0)) {
      errors.push('La cantidad de todos los items debe ser mayor a 0');
    }
    if (invoiceData.items?.some(item => item.price < 0)) {
      errors.push('El precio de todos los items debe ser mayor o igual a 0');
    }

    // Validar información de cliente
    if (!invoiceData.client.name?.trim()) {
      errors.push('Nombre del cliente es requerido');
    }
    if (!invoiceData.client.email?.trim()) {
      errors.push('Email del cliente es requerido');
    }

    // Validar información de empresa
    if (!invoiceData.company.name?.trim()) {
      errors.push('Nombre de la empresa es requerido');
    }

    return errors;
  };

  // ✅ Función para duplicar una factura manteniendo o cambiando el idioma
  const duplicateInvoice = async (sourceInvoiceId: string, newLanguage?: InvoiceLanguageCode): Promise<SavedInvoice | null> => {
    try {
      const sourceInvoice = await getInvoice(sourceInvoiceId);
      if (!sourceInvoice) return null;

      // Crear nueva factura basada en la existente
      const timestamp = Date.now();
      const newInvoiceData: InvoiceData = {
        ...sourceInvoice,
        invoiceNumber: `${sourceInvoice.invoiceNumber}-COPY-${timestamp}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        language: newLanguage || sourceInvoice.language, // ✅ Permitir cambiar idioma al duplicar
      };

      const result = await saveInvoice(newInvoiceData);
      if (result && newLanguage && newLanguage !== sourceInvoice.language) {
        const newLanguageName = INVOICE_LANGUAGE_NAMES[newLanguage];
        const originalLanguageName = INVOICE_LANGUAGE_NAMES[sourceInvoice.language];
        toast.success(`Factura duplicada y convertida de ${originalLanguageName} a ${newLanguageName}`);
      }
      
      return result;
    } catch (error) {
      toast.error('Error al duplicar factura');
      console.error('Error duplicating invoice:', error);
      return null;
    }
  };

  // ✅ Función para cambiar idioma de factura existente
  const changeInvoiceLanguage = async (invoiceId: string, newLanguage: InvoiceLanguageCode): Promise<boolean> => {
    try {
      const result = await updateInvoice(invoiceId, { language: newLanguage });
      return result !== null;
    } catch (error) {
      toast.error('Error al cambiar idioma de factura');
      console.error('Error changing invoice language:', error);
      return false;
    }
  };

  // ✅ Función para filtrar facturas por idioma
  const filterInvoicesByLanguage = (language: InvoiceLanguageCode | 'all') => {
    if (language === 'all') {
      setFilters(prev => ({ ...prev, language: undefined }));
    } else {
      setFilters(prev => ({ ...prev, language }));
    }
    fetchInvoices({ ...filters, language: language === 'all' ? undefined : language });
  };

  // ✅ Función para obtener estadísticas por idioma
  const getInvoiceStatsByLanguage = () => {
    const stats: Record<InvoiceLanguageCode, number> = {
      'es': 0, 'en': 0, 'fr': 0, 'de': 0, 'it': 0, 
      'pt': 0, 'ca': 0, 'ja': 0, 'zh': 0, 'ar': 0
    };

    invoices.forEach(invoice => {
      if (invoice.language && stats[invoice.language] !== undefined) {
        stats[invoice.language]++;
      }
    });

    return stats;
  };

  // ✅ Función para crear plantilla de factura con idioma específico
  const createInvoiceTemplate = (language: InvoiceLanguageCode, currency: string = 'EUR'): Partial<InvoiceData> => {
    const now = new Date();
    const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      invoiceNumber: `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`,
      date: now.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      currency,
      language,
      items: [],
      notes: '',
      subtotal: 0,
      tax: 0,
      taxRate: 21,
      total: 0,
      company: {
        name: '',
        email: '',
        phone: '',
        address: '',
        taxId: '',
      },
      client: {
        name: '',
        email: '',
        phone: '',
        address: '',
      }
    };
  };

  // Aplicar filtros cuando cambien
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchInvoices(filters);
    }
  }, [filters]);

  // Cargar facturas al montar el componente
  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    // Estado
    invoices,
    loading,
    saving,
    updating,
    filters,
    
    // Funciones CRUD básicas
    saveInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    
    // Funciones de utilidad
    refreshInvoices: fetchInvoices,
    duplicateInvoice,
    validateInvoiceData,
    
    // ✅ Funciones específicas para idiomas
    changeInvoiceLanguage,
    filterInvoicesByLanguage,
    getInvoiceStatsByLanguage,
    createInvoiceTemplate,
    
    // Funciones de filtrado
    setFilters,
    
    // Constantes útiles
    INVOICE_LANGUAGE_NAMES,
  };
}