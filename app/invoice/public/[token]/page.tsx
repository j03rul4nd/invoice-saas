import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PublicInvoiceView from '@/components/PublicInvoiceView';

interface PublicInvoicePageProps {
  params: Promise<{
    token: string;
  }>;
}

async function getPublicInvoice(token: string) {
  const invoice = await prisma.invoice.findUnique({
    where: {
      publicToken: token,
      isPublic: true,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // Verificar si el enlace ha expirado
  if (invoice?.publicExpiresAt && invoice.publicExpiresAt < new Date()) {
    return null;
  }

  return invoice;
}

export default async function PublicInvoicePage({ params }: PublicInvoicePageProps) {
  const { token } = await params;
  const invoice = await getPublicInvoice(token);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <PublicInvoiceView invoice={invoice} />
    </div>
  );
}

export async function generateMetadata({ params }: PublicInvoicePageProps) {
  const { token } = await params;
  const invoice = await getPublicInvoice(token);

  if (!invoice) {
    return {
      title: 'Invoice not found | Factura no encontrada | Fatura não encontrada',
      description: 'The requested invoice could not be found | La factura solicitada no se pudo encontrar | A fatura solicitada não pôde ser encontrada',
    };
  }

  return {
    title: `Invoice ${invoice.invoiceNumber} | Factura ${invoice.invoiceNumber} | Fatura ${invoice.invoiceNumber}`,
    description: `View invoice ${invoice.invoiceNumber} online | Ver factura ${invoice.invoiceNumber} en línea | Ver fatura ${invoice.invoiceNumber} online`,
  };
}