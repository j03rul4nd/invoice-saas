"use client"

import React, { useState } from "react"
import { Rocket, ChevronDown, ChevronUp, Zap, Mail, QrCode, CreditCard } from "lucide-react"
import ShinyText from "@/components/ShinyText"
import Link from "next/link"
import { usePricingTranslation } from "@/hooks/usePricingTranslation"
import { Language, languageNames } from "@/lib/i18n"

interface PricingCardClientProps {
    authCheck: any,
    isSubscribed: boolean,
    createSubscription: () => void,
    createCustomerPortal: () => void,
    backLink: string
}

export default function PricingCardClient({ 
    authCheck, 
    isSubscribed, 
    createSubscription, 
    createCustomerPortal,
    backLink
}: PricingCardClientProps) {
    const [showAllFeatures, setShowAllFeatures] = useState(false)
    const { t, language, changeLanguage, isClient } = usePricingTranslation()

    

    if (!isClient) {
        // Loading state to prevent hydration mismatch
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    return (
        <>
            {/* Back link and Language Selector */}
            <div className="flex justify-between items-center mb-8">
                <Link 
                    href={backLink} 
                    className="text-white/70 hover:text-white inline-flex items-center transition-all duration-300 
                                hover:shadow-[0_2px_8px_0] hover:shadow-purple-400/40 hover:rounded-md px-4 py-2"
                >
                    &larr; {t.back}
                </Link>
                
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 bg-clip-text text-transparent 
                            bg-gradient-to-r from-white to-purple-200 text-center">
                {t.title}
            </h1>
            
            {/* Pricing Card */}
            <div className="rounded-xl border border-purple-300/10 bg-black/30 shadow-[0_8px_30px_-12px] shadow-purple-500/20 backdrop-blur-sm overflow-hidden">
                {/* Header con badge de popularidad */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-3 border-b border-purple-300/20">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-200">✨ {t.popularBadge}</span>
                        <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                            {t.activeBadge}
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* Título y Precio - Muy prominente */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2 text-white">{t.plan.title}</h2>
                        <div className="mb-4">
                            <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                                {t.plan.price}
                            </span>
                            <span className="text-xl text-white/60 ml-2">{t.plan.period}</span>
                        </div>
                        <p className="text-white/80 text-lg">{t.plan.subtitle}</p>
                    </div>

                    {/* Beneficios principales - Solo los más impactantes */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">{t.plan.mainFeatures.invoicesTitle}</h3>
                                <p className="text-white/60">{t.plan.mainFeatures.invoicesSubtitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">{t.plan.mainFeatures.promptsTitle}</h3>
                                <p className="text-white/60">{t.plan.mainFeatures.promptsSubtitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">{t.plan.mainFeatures.earlyAccessTitle}</h3>
                                <p className="text-white/60">{t.plan.mainFeatures.earlyAccessSubtitle}</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Principal - MUY PROMINENTE */}
                    <div className="mb-6">
                        {authCheck.isAuthenticated ? (
                            isSubscribed ? (
                                <form action={createCustomerPortal}>
                                    <button 
                                        type="submit"
                                        className="group relative inline-flex w-full justify-center items-center gap-2 rounded-2xl bg-black px-8 py-5 text-white transition-all hover:bg-white/5 transform hover:scale-[1.02]"
                                    >
                                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF1E56] via-[#FF00FF] to-[#00FFFF] opacity-70 blur-sm transition-all group-hover:opacity-100" />
                                        <span className="absolute inset-0.5 rounded-2xl bg-black/50" />
                                        <span className="relative font-semibold text-xl">{t.plan.button.manageSubscription}</span>
                                    </button>
                                </form>
                            ) : (
                                <form action={createSubscription}>
                                    <button 
                                        type="submit"
                                        className="group relative inline-flex w-full justify-center items-center gap-2 rounded-2xl bg-black px-8 py-5 text-white transition-all hover:bg-white/5 transform hover:scale-[1.02] shadow-2xl"
                                    >
                                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF1E56] via-[#FF00FF] to-[#00FFFF] opacity-70 blur-sm transition-all group-hover:opacity-100" />
                                        <span className="absolute inset-0.5 rounded-2xl bg-black/50" />
                                        <span className="relative font-semibold text-xl">
                                            <ShinyText text={t.plan.button.subscribe} disabled={false} speed={2} className='text-white' />
                                        </span>
                                    </button>
                                </form>
                            )
                        ) : (
                            <a href="/sign-in?redirect_url=/pricing" 
                               className="inline-flex items-center justify-center w-full px-8 py-5 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 rounded-2xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] shadow-2xl">
                                {t.plan.button.signInToSubscribe}
                            </a>
                        )}
                    </div>

                    <p className="text-center text-white/60 text-sm mb-8">
                        {t.plan.securityText}
                    </p>

                    {/* Progressive Disclosure - Mostrar más detalles */}
                    <div className="border-t border-purple-300/20 pt-6">
                        <button
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                            className="flex items-center justify-between w-full text-white hover:text-purple-200 transition-colors mb-4"
                        >
                            <span className="text-lg font-medium">
                                {showAllFeatures ? t.plan.toggleDetails.hide : t.plan.toggleDetails.show}
                            </span>
                            {showAllFeatures ? <ChevronUp /> : <ChevronDown />}
                        </button>

                        {showAllFeatures && (
                            <div className="space-y-6 animate-in slide-in-from-top duration-300">
                                {/* Almacenamiento */}
                                <div className="space-y-3">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                        {t.plan.extendedStorage.title}
                                    </h4>
                                    <div className="ml-8 text-white/80">
                                        <p className="font-medium">{t.plan.extendedStorage.description}</p>
                                        <p className="text-sm text-white/60">{t.plan.extendedStorage.subtitle}</p>
                                    </div>
                                </div>

                                {/* Características Premium */}
                                <div className="space-y-3">
                                    <h4 className="text-lg font-semibold text-white">{t.plan.premiumFeatures.title}</h4>
                                    <div className="grid md:grid-cols-2 gap-4 ml-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center mt-1">
                                                <Mail className="w-3 h-3 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{t.plan.premiumFeatures.emailSend.title}</p>
                                                <p className="text-white/60 text-sm">{t.plan.premiumFeatures.emailSend.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mt-1">
                                                <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{t.plan.premiumFeatures.prioritySupport.title}</p>
                                                <p className="text-white/60 text-sm">{t.plan.premiumFeatures.prioritySupport.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Próximamente */}
                                <div className="space-y-3">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-yellow-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        </div>
                                        {t.plan.comingSoon.title}
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4 ml-8">
                                        <div className="flex items-start space-x-3">
                                            <QrCode className="w-4 h-4 text-yellow-400 mt-1" />
                                            <div>
                                                <p className="text-white font-medium">{t.plan.comingSoon.qrTemplates.title}</p>
                                                <p className="text-white/60 text-sm">{t.plan.comingSoon.qrTemplates.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CreditCard className="w-4 h-4 text-yellow-400 mt-1" />
                                            <div>
                                                <p className="text-white font-medium">{t.plan.comingSoon.stripePayment.title}</p>
                                                <p className="text-white/60 text-sm">{t.plan.comingSoon.stripePayment.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Beta Access */}
                                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                                        <Rocket className="w-5 h-5 text-orange-400" />
                                        {t.plan.betaAccess.title}
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                                        <div className="text-center p-2 bg-black/20 rounded">
                                            <p className="text-white font-medium">{t.plan.betaAccess.api.title}</p>
                                            <p className="text-white/60">{t.plan.betaAccess.api.subtitle}</p>
                                        </div>
                                        <div className="text-center p-2 bg-black/20 rounded">
                                            <p className="text-white font-medium">{t.plan.betaAccess.betaTesting.title}</p>
                                            <p className="text-white/60">{t.plan.betaAccess.betaTesting.subtitle}</p>
                                        </div>
                                        <div className="text-center p-2 bg-black/20 rounded">
                                            <p className="text-white font-medium">{t.plan.betaAccess.exclusiveTemplates.title}</p>
                                            <p className="text-white/60">{t.plan.betaAccess.exclusiveTemplates.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}