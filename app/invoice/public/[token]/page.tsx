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
      title: 'Factura no encontrada',
    };
  }

  return {
    title: `Factura ${invoice.invoiceNumber}`,
    description: `Factura ${invoice.invoiceNumber} - Ver factura online`,
  };
}