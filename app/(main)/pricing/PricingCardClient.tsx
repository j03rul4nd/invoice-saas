"use client"

import React, { useState } from "react"
import { Rocket, ChevronDown, ChevronUp, Zap, Mail, QrCode, CreditCard } from "lucide-react"
import ShinyText from "@/components/ShinyText"

interface PricingCardClientProps {
    authCheck: any,
    isSubscribed: boolean,
    createSubscription: () => void,
    createCustomerPortal: () => void
}

export default function PricingCardClient({ 
    authCheck, 
    isSubscribed, 
    createSubscription, 
    createCustomerPortal 
}: PricingCardClientProps) {
    const [showAllFeatures, setShowAllFeatures] = useState(false)

    return (
        <div className="rounded-xl border border-purple-300/10 bg-black/30 shadow-[0_8px_30px_-12px] shadow-purple-500/20 backdrop-blur-sm overflow-hidden">
            {/* Header con badge de popularidad */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-3 border-b border-purple-300/20">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-200">✨ Plan Más Popular</span>
                    <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                        Activo
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Título y Precio - Muy prominente */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-white">Invoice Generator Pro</h2>
                    <div className="mb-4">
                        <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            €19.99
                        </span>
                        <span className="text-xl text-white/60 ml-2">/mes</span>
                    </div>
                    <p className="text-white/80 text-lg">Plan completo para profesionales y pequeños negocios</p>
                </div>

                {/* Beneficios principales - Solo los más impactantes */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">100 facturas por mes</h3>
                            <p className="text-white/60">vs 5 en plan gratuito - 20x más capacidad</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">100 prompts de IA por mes</h3>
                            <p className="text-white/60">vs 10 en plan gratuito - Automatización total</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                            <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Acceso Anticipado</h3>
                            <p className="text-white/60">Nuevas funciones antes que nadie</p>
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
                                    <span className="relative font-semibold text-xl">Gestionar Suscripción</span>
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
                                        <ShinyText text="🚀 Actualizar a Pro - €19.99/mes" disabled={false} speed={2} className='text-white' />
                                    </span>
                                </button>
                            </form>
                        )
                    ) : (
                        <a href="/sign-in?redirect_url=/pricing" 
                           className="inline-flex items-center justify-center w-full px-8 py-5 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 rounded-2xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] shadow-2xl">
                            Iniciar Sesión para Suscribirse
                        </a>
                    )}
                </div>

                <p className="text-center text-white/60 text-sm mb-8">
                    ✅ Cancela cuando quieras • 💳 Pago seguro con Stripe
                </p>

                {/* Progressive Disclosure - Mostrar más detalles */}
                <div className="border-t border-purple-300/20 pt-6">
                    <button
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="flex items-center justify-between w-full text-white hover:text-purple-200 transition-colors mb-4"
                    >
                        <span className="text-lg font-medium">
                            {showAllFeatures ? 'Ocultar detalles' : 'Ver todos los beneficios'}
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
                                    Almacenamiento Extendido
                                </h4>
                                <div className="ml-8 text-white/80">
                                    <p className="font-medium">Almacenamiento 2 años</p>
                                    <p className="text-sm text-white/60">vs 30 días en plan gratuito</p>
                                </div>
                            </div>

                            {/* Características Premium */}
                            <div className="space-y-3">
                                <h4 className="text-lg font-semibold text-white">Características Premium</h4>
                                <div className="grid md:grid-cols-2 gap-4 ml-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center mt-1">
                                            <Mail className="w-3 h-3 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Envío por email</p>
                                            <p className="text-white/60 text-sm">Comparte facturas directamente</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mt-1">
                                            <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Soporte prioritario</p>
                                            <p className="text-white/60 text-sm">Respuesta en 24h garantizada</p>
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
                                    Próximamente Disponible
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4 ml-8">
                                    <div className="flex items-start space-x-3">
                                        <QrCode className="w-4 h-4 text-yellow-400 mt-1" />
                                        <div>
                                            <p className="text-white font-medium">Plantillas con QR</p>
                                            <p className="text-white/60 text-sm">Códigos QR automáticos</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CreditCard className="w-4 h-4 text-yellow-400 mt-1" />
                                        <div>
                                            <p className="text-white font-medium">Botón de pago Stripe</p>
                                            <p className="text-white/60 text-sm">Cobros integrados</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Beta Access */}
                            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                                    <Rocket className="w-5 h-5 text-orange-400" />
                                    Acceso Anticipado Beta
                                </h4>
                                <div className="grid md:grid-cols-3 gap-3 text-sm">
                                    <div className="text-center p-2 bg-black/20 rounded">
                                        <p className="text-white font-medium">API MCP</p>
                                        <p className="text-white/60">Automatización avanzada</p>
                                    </div>
                                    <div className="text-center p-2 bg-black/20 rounded">
                                        <p className="text-white font-medium">Beta testing</p>
                                        <p className="text-white/60">Funciones primero</p>
                                    </div>
                                    <div className="text-center p-2 bg-black/20 rounded">
                                        <p className="text-white font-medium">Plantillas exclusivas</p>
                                        <p className="text-white/60">Diseños únicos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}