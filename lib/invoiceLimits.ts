// lib/invoiceLimits.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface InvoiceLimitStatus {
  limit: number;
  used: number;
  remaining: number;
  resetDate: Date;
  canCreateInvoice: boolean;
}

/**
 * Check if monthly invoice limits need to be reset
 */
async function checkAndResetInvoiceLimit(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      lastInvoiceReset: true, 
      monthlyInvoiceLimit: true,
      subscription: {
        select: {
          status: true
        }
      }
    }
  });

  if (!user) return;

  const now = new Date();
  const lastReset = user.lastInvoiceReset;
  
  // Check if we're in a new month
  const shouldReset = (
    lastReset.getFullYear() !== now.getFullYear() ||
    lastReset.getMonth() !== now.getMonth()
  );

  if (shouldReset) {
    console.log(`🔄 [INVOICE_LIMITS] Resetting monthly invoice limit for user ${userId}`);
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        currentInvoiceUsage: 0,
        lastInvoiceReset: now
      }
    });
  }
}

/**
 * Get current invoice limit status for a user
 */
export async function getInvoiceLimitStatus(userId: string): Promise<InvoiceLimitStatus> {
  await checkAndResetInvoiceLimit(userId);
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      monthlyInvoiceLimit: true,
      currentInvoiceUsage: true,
      lastInvoiceReset: true,
      subscription: {
        select: {
          status: true
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const nextMonth = new Date(user.lastInvoiceReset);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return {
    limit: user.monthlyInvoiceLimit,
    used: user.currentInvoiceUsage,
    remaining: Math.max(0, user.monthlyInvoiceLimit - user.currentInvoiceUsage),
    resetDate: nextMonth,
    canCreateInvoice: user.currentInvoiceUsage < user.monthlyInvoiceLimit
  };
}

/**
 * Consume one invoice from the user's monthly limit
 */
export async function consumeInvoiceLimit(userId: string): Promise<boolean> {
  await checkAndResetInvoiceLimit(userId);
  
  const limitStatus = await getInvoiceLimitStatus(userId);
  
  if (!limitStatus.canCreateInvoice) {
    console.warn(`❌ [INVOICE_LIMITS] User ${userId} has exceeded monthly invoice limit`);
    return false;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentInvoiceUsage: {
        increment: 1
      }
    }
  });

  console.log(`✅ [INVOICE_LIMITS] Invoice limit consumed for user ${userId}. New usage: ${limitStatus.used + 1}/${limitStatus.limit}`);
  return true;
}

/**
 * Add invoices to user's monthly limit (for subscription upgrades)
 */
export async function addInvoicesToLimit(userId: string, additionalInvoices: number): Promise<void> {
  await checkAndResetInvoiceLimit(userId);
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { monthlyInvoiceLimit: true, subscription: { select: { status: true } } }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const newLimit = user.monthlyInvoiceLimit + additionalInvoices;
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      monthlyInvoiceLimit: newLimit
    }
  });

  console.log(`✅ [INVOICE_LIMITS] Added ${additionalInvoices} invoices to user ${userId}. New limit: ${newLimit}`);
}

/**
 * Set premium limits for subscription users (100 invoices, 100 prompts)
 */
export async function setPremiumLimits(userId: string): Promise<void> {
  await checkAndResetInvoiceLimit(userId);
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      monthlyInvoiceLimit: 100,  // Premium: 100 invoices
      monthlyPromptLimit: 100    // Premium: 100 prompts
    }
  });

  console.log(`✅ [INVOICE_LIMITS] Set premium limits for user ${userId}: 100 invoices, 100 prompts`);
}

/**
 * Reset to free tier limits (5 invoices, 10 prompts)
 */
export async function setFreeTierLimits(userId: string): Promise<void> {
  await checkAndResetInvoiceLimit(userId);
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      monthlyInvoiceLimit: 5,    // Free: 5 invoices
      monthlyPromptLimit: 10     // Free: 10 prompts
    }
  });

  console.log(`✅ [INVOICE_LIMITS] Set free tier limits for user ${userId}: 5 invoices, 10 prompts`);
}