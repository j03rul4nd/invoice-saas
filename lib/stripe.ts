import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

export const getStripeSession = async ({
    priceId,
    domainUrl,
    customerId,
    successUrl,
} : {
    priceId: string;
    domainUrl: string;
    customerId: string;
    successUrl?: string;
}) => {
    console.log("🔧 getStripeSession called with parameters:")
    console.log("  - customerId:", customerId)
    console.log("  - domainUrl:", domainUrl)
    console.log("  - priceId:", priceId)
    console.log("  - successUrl (provided):", successUrl)

    // Asegurar que domainUrl no tenga trailing slash
    const cleanDomainUrl = domainUrl.replace(/\/$/, '')
    console.log("🧹 Clean domain URL:", cleanDomainUrl)

    // Construir URLs (asegurar que siempre tengan la barra inicial)
    const finalSuccessUrl = successUrl || `${cleanDomainUrl}/payment/success`
    const cancelUrl = `${cleanDomainUrl}/payment/cancelled`

    console.log("🎯 Final URLs:")
    console.log("  - Success URL:", finalSuccessUrl)
    console.log("  - Cancel URL:", cancelUrl)

    // Validar URLs antes de enviarlas a Stripe
    try {
        new URL(finalSuccessUrl)
        new URL(cancelUrl)
        console.log("✅ URLs are valid")
    } catch (error) {
        console.log("❌ Invalid URL detected:", error)
        throw new Error(`Invalid URL format: ${error}`)
    }

    // Validar que tenemos todos los parámetros necesarios
    if (!customerId) {
        console.log("❌ Missing customerId")
        throw new Error("customerId is required")
    }
    
    if (!priceId) {
        console.log("❌ Missing priceId")
        throw new Error("priceId is required")
    }

    try {
        console.log("💳 Creating Stripe checkout session...")
        
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            customer_update: { name:"auto", address: "auto"},
            success_url: finalSuccessUrl,
            cancel_url: cancelUrl
        })

        console.log("✅ Stripe session created successfully:")
        console.log("  - Session ID:", session.id)
        console.log("  - Session URL:", session.url)

        if (!session.url) {
            console.log("❌ No URL returned from Stripe session")
            throw new Error("No URL returned from Stripe session")
        }

        return session.url as string
        
    } catch (error) {
        console.log("❌ Error creating Stripe session:")
        if (typeof error === "object" && error !== null) {
            console.error("Stripe Error Details:", {
                type: (error as any).type,
                code: (error as any).code,
                message: (error as any).message,
                param: (error as any).param,
                detail: (error as any).detail
            })
        } else {
            console.error("Stripe Error Details:", error)
        }
        throw error
    }
}