import React from "react"
import { prisma } from "@/lib/prisma"
import { getStripeSession, stripe } from "@/lib/stripe"
import { unstable_noStore } from "next/cache"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { checkAuthenticationAndSubscription } from "@/lib/checkAuthSubscription"
import PricingCardClient from "./PricingCardClient" // Componente cliente separado

async function getData(userId: string | null) {
    unstable_noStore()

    if (!userId) return null

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            status: true,
            user: { select: { stripeCustomerId: true }}
        }
    })

    return subscription
}

export default async function Pricing() {
    // Check authentication status without redirecting
    const authCheck = await checkAuthenticationAndSubscription();
    
    // Get user data if authenticated
    const user = authCheck.isAuthenticated ? await currentUser() : null;
    
    // Get subscription data if authenticated
    const subscription = authCheck.isAuthenticated ? await getData(authCheck.userId) : null;
    
    const isSubscribed = subscription?.status === "active";
    

    async function createSubscription() {
        "use server"

        if (!authCheck.userId) {
            return redirect('/sign-in?redirect_url=/pricing')
        }

        let databaseUser = await prisma.user.findUnique({
            where: {
                id: authCheck.userId
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!databaseUser) {
            throw new Error('DatabaseUser Not Found')
        }

        const email = user?.primaryEmailAddress?.emailAddress
        
        if (!databaseUser.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: email
            })

            databaseUser = await prisma.user.update({
                where: {
                    id: authCheck.userId
                },
                data: {
                    stripeCustomerId: customer.id
                },
                select: { stripeCustomerId: true }
            })
        }

        if (!databaseUser.stripeCustomerId) {
            throw new Error('Failed to set stripeCustomerId for the user')
        }

        const domainUrl = process.env.NEXT_PUBLIC_URL || 
            (process.env.NODE_ENV === 'production' 
                ? process.env.PRODUCTION_URL 
                : 'http://localhost:3000')

        if (!domainUrl) {
            throw new Error('Missing domain URL configuration')
        }

        const subscriptionUrl = await getStripeSession({
            customerId: databaseUser.stripeCustomerId,
            domainUrl: domainUrl,
            priceId: process.env.STRIPE_PRICE_ID as string,
            successUrl: `${domainUrl}dashboard?payment=success`
        })

        return redirect(subscriptionUrl)
    }

    async function createCustomerPortal(){
        "use server"

        if (!authCheck.userId) {
            return redirect('sign-in?redirect_url=/pricing')
        }

        const customerPortalUrl = await stripe.billingPortal.sessions.create({
            customer: subscription?.user.stripeCustomerId as string,
            return_url: process.env.NODE_ENV === 'production' ? (process.env.PRODUCTION_URL as string) : 'http://localhost:3000'
        })

        return redirect(customerPortalUrl.url)
    }

    const backLink = authCheck.isAuthenticated ? '/dashboard' : '/';

    return (
        <div className="py-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link 
                    href={backLink} 
                    className="text-white/70 hover:text-white inline-flex items-center mb-8 transition-all duration-300 
                                    hover:shadow-[0_2px_8px_0] hover:shadow-purple-400/40 hover:rounded-md px-4 py-2"
                >
                    &larr; Back
                </Link>
                
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 bg-clip-text text-transparent 
                                bg-gradient-to-r from-white to-purple-200 text-center">
                    Subscription Plan
                </h1>
                
                <PricingCardClient
                    authCheck={authCheck}
                    isSubscribed={isSubscribed}
                    createSubscription={createSubscription}
                    createCustomerPortal={createCustomerPortal}
                />
            </div>
        </div>
    )
}