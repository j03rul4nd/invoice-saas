import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
  currency: string; // ✅ Añadido el campo currency
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

export function useInvoices() {
  const [invoices, setInvoices] = useState<SavedInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Cargar facturas
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/invoices'); // ✅ Corregida la ruta
      const data = await response.json();
      
      if (response.ok) {
        setInvoices(data.invoices);
      } else {
        toast.error(data.error || 'Error al cargar facturas');
        console.error('Error loading invoices:', data.error);
      }
    } catch (error) {
      toast.error('Error de conexión al cargar facturas');
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar nueva factura
  const saveInvoice = async (invoiceData: InvoiceData): Promise<boolean> => {
    setSaving(true);
    try {
      // Validar datos antes de enviar
      if (!invoiceData.invoiceNumber || !invoiceData.currency) {
        toast.error('Faltan datos obligatorios (número de factura o moneda)');
        return false;
      }

      const response = await fetch('/api/invoices', { // ✅ Corregida la ruta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Factura guardada exitosamente');
        await fetchInvoices(); // Recargar la lista
        return true;
      } else {
        toast.error(data.error || 'Error al guardar factura');
        console.error('Error saving invoice:', data.error);
        return false;
      }
    } catch (error) {
      toast.error('Error de conexión al guardar factura');
      console.error('Network error:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // ✅ Nueva función para actualizar factura existente
  const updateInvoice = async (invoiceId: string, updateData: InvoiceUpdateData): Promise<boolean> => {
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
        toast.success('Factura actualizada exitosamente');
        await fetchInvoices(); // Recargar la lista
        return true;
      } else {
        toast.error(data.error || 'Error al actualizar factura');
        console.error('Error updating invoice:', data.error);
        return false;
      }
    } catch (error) {
      toast.error('Error de conexión al actualizar factura');
      console.error('Network error:', error);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Nueva función para obtener una factura específica
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

  // Eliminar factura
  const deleteInvoice = async (invoiceId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, { // ✅ Corregida la ruta
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

  // ✅ Función para validar datos de factura
  const validateInvoiceData = (invoiceData: InvoiceData): string[] => {
    const errors: string[] = [];

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
    if (!invoiceData.items || invoiceData.items.length === 0) {
      errors.push('Al menos un item es requerido');
    }
    if (invoiceData.items?.some(item => !item.description?.trim())) {
      errors.push('Todos los items deben tener descripción');
    }

    return errors;
  };

  // ✅ Función mejorada para guardar con validación
  const saveInvoiceWithValidation = async (invoiceData: InvoiceData): Promise<boolean> => {
    const validationErrors = validateInvoiceData(invoiceData);
    
    if (validationErrors.length > 0) {
      toast.error(`Errores de validación: ${validationErrors.join(', ')}`);
      return false;
    }

    return await saveInvoice(invoiceData);
  };

  // ✅ Función para duplicar una factura
  const duplicateInvoice = async (sourceInvoiceId: string): Promise<boolean> => {
    try {
      const sourceInvoice = await getInvoice(sourceInvoiceId);
      if (!sourceInvoice) return false;

      // Crear nueva factura basada en la existente
      const newInvoiceData: InvoiceData = {
        ...sourceInvoice,
        invoiceNumber: `${sourceInvoice.invoiceNumber}-COPY-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };

      return await saveInvoice(newInvoiceData);
    } catch (error) {
      toast.error('Error al duplicar factura');
      console.error('Error duplicating invoice:', error);
      return false;
    }
  };

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
    
    // Funciones CRUD
    saveInvoice: saveInvoiceWithValidation, // ✅ Usar versión con validación
    updateInvoice,
    deleteInvoice,
    getInvoice,
    
    // Funciones de utilidad
    refreshInvoices: fetchInvoices,
    duplicateInvoice,
    validateInvoiceData,
    
    // Funciones originales para compatibilidad
    saveInvoiceRaw: saveInvoice, // Sin validación, por si la necesitas
  };
}