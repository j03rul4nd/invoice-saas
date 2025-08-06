import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // o tu sistema de notificaciones preferido

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

export function useInvoices() {
  const [invoices, setInvoices] = useState<SavedInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Cargar facturas
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/invoices');
      const data = await response.json();
      
      if (response.ok) {
        setInvoices(data.invoices);
      } else {
        toast.error(data.error || 'Error al cargar facturas');
      }
    } catch (error) {
      toast.error('Error al cargar facturas');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar factura
  const saveInvoice = async (invoiceData: InvoiceData): Promise<boolean> => {
    setSaving(true);
    try {
      const response = await fetch('/api/invoices', {
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
        return false;
      }
    } catch (error) {
      toast.error('Error al guardar factura');
      console.error('Error:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Eliminar factura
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
        return false;
      }
    } catch (error) {
      toast.error('Error al eliminar factura');
      console.error('Error:', error);
      return false;
    }
  };

  // Cargar facturas al montar el componente
  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    saving,
    saveInvoice,
    deleteInvoice,
    refreshInvoices: fetchInvoices,
  };
}