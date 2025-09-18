"use client"
import type React from "react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Zap, Globe, Smartphone, FileText, Check, RotateCw, type LucideIcon } from "lucide-react"
import { useLandingTranslation } from "@/hooks/useLanguage"

// Tipos para las divisas soportadas
type SupportedCurrency = "USD" | "EUR" | "GBP"

// Tipo para el mapeo de divisas
type CurrencyMap = Record<SupportedCurrency, string>

// Tipo para las características del producto
interface Feature {
  icon: LucideIcon
  text: string
}

// Props para el componente Avatar
interface AvatarProps {
  index: number
}

// Props para el componente FloatingCard
interface FloatingCardProps {
  children: React.ReactNode
  className: string
  delay?: number
}

// Estados posibles de las pantallas
type ScreenState = 0 | 1 | 2

const InvoiceLanding: React.FC = () => {
  const { t: landingT } = useLandingTranslation()
  const [counter, setCounter] = useState<number>(0)
  const [typingText, setTypingText] = useState<string>("")
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(0)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>("USD")
  const [animationStep, setAnimationStep] = useState<number>(0)

  const fullText: string = landingT.phoneScreens.placeholder 

  const currencies: CurrencyMap = {
    USD: "$2,500.00",
    EUR: "€2,290.00",
    GBP: "£2,050.00",
  } as const

  // Lista de características con tipos explícitos
  const features: Feature[] = [
    { icon: Zap, text: landingT.features.aiPowered },
    { icon: Globe, text: landingT.features.multiLanguage },
    { icon: Smartphone, text: landingT.features.instantSharing },
    { icon: FileText, text: landingT.features.pdfReady },
  ] as const

  // Componente Avatar tipado
  const Avatar: React.FC<AvatarProps> = ({ index }) => (
    <div
      className={`w-8 h-8 rounded-full border-2 border-black ${index > 0 ? "-ml-2" : ""}`}
      style={{
        background: "linear-gradient(45deg, #FF6B35, #F7931E, #10B981, #3B82F6)",
      }}
    />
  )

  // Componente FloatingCard tipado
  const FloatingCard: React.FC<FloatingCardProps> = ({ children, className, delay = 0 }) => (
    <div
      className={`absolute px-4 py-3 rounded-xl text-sm font-medium text-white backdrop-blur-sm border z-10 ${className}`}
      style={{
        animation: `float 4s ease-in-out infinite ${delay}s`,
      }}
    >
      {children}
    </div>
  )

  // Handler para cambio de divisa con tipo explícito
  const handleCurrencyChange = useCallback((currency: SupportedCurrency): void => {
    setSelectedCurrency(currency)
  }, [])

  // Animación del contador
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration: number = 2000
      const target: number = 10000
      const increment: number = target / (duration / 16)
      let current = 0

      const counterTimer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(counterTimer)
        }
        setCounter(Math.floor(current))
      }, 16)

      return () => clearInterval(counterTimer)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Animación de escritura
  useEffect(() => {
    if (currentScreen === 0) {
      let i = 0
      setTypingText("")
      setIsGenerating(false)

      const timer = setTimeout(() => {
        const typeTimer = setInterval(() => {
          if (i < fullText.length) {
            setTypingText(fullText.substring(0, i + 1))
            i++
          } else {
            clearInterval(typeTimer)
            setTimeout(() => setIsGenerating(true), 500)
          }
        }, 50)

        return () => clearInterval(typeTimer)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [currentScreen, fullText])

  // Transiciones de pantalla
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentScreen((prev: ScreenState): ScreenState => {
          const nextScreen = (prev + 1) % 3
          return nextScreen as ScreenState
        })
      }, 4000)

      return () => clearInterval(interval)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const steps = [0, 200, 400, 600, 800, 1000]
    steps.forEach((delay, index) => {
      setTimeout(() => setAnimationStep(index + 1), delay)
    })
  }, [])

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div
        className="absolute top-[-200px] right-[-200px] w-96 h-96 rounded-full opacity-15 pointer-events-none animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite, pulse-glow 4s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-150px] left-[-150px] w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(247,147,30,0.1) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse, pulse-glow 6s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "gridDrift 20s linear infinite, gridPulse 8s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes gridDrift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        @keyframes pulse-glow {
          0% { opacity: 0.1; transform: scale(1); }
          100% { opacity: 0.2; transform: scale(1.05); }
        }
        @keyframes slideUpStagger {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
            filter: blur(0px);
          }
        }
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-15px) rotateY(2deg); }
        }
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes buttonHover {
          0% { transform: translateY(0) scale(1); box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3); }
          100% { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4); }
        }
        @keyframes featureSlide {
          from { 
            opacity: 0; 
            transform: translateY(20px) translateX(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) translateX(0); 
          }
        }
        
        .animate-slide-up-1 {
          animation: slideUpStagger 0.8s ease-out 0.1s both;
        }
        .animate-slide-up-2 {
          animation: slideUpStagger 0.8s ease-out 0.3s both;
        }
        .animate-slide-up-3 {
          animation: slideUpStagger 0.8s ease-out 0.5s both;
        }
        .animate-slide-up-4 {
          animation: slideUpStagger 0.8s ease-out 0.7s both;
        }
        .animate-slide-up-5 {
          animation: slideUpStagger 0.8s ease-out 0.9s both;
        }
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out 0.4s both;
        }
        .animate-phone-float {
          animation: phoneFloat 6s ease-in-out infinite, slideUpStagger 1s ease-out 0.6s both;
        }
        .text-shimmer {
          background: linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #ffffff 50%, #F7931E 75%, #FF6B35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 3s linear infinite;
        }
        .button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .button-hover:hover {
          animation: buttonHover 0.3s ease-out forwards;
        }
        .feature-item {
          animation: featureSlide 0.6s ease-out both;
        }
        .feature-item:nth-child(1) { animation-delay: 1.1s; }
        .feature-item:nth-child(2) { animation-delay: 1.3s; }
        .feature-item:nth-child(3) { animation-delay: 1.5s; }
        .feature-item:nth-child(4) { animation-delay: 1.7s; }
      `}</style>

      <section className="px-6  lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center min-h-[600px]">
            <div className="lg:col-span-3">
              {/* Social Proof */}
              <div
                className={`flex items-center gap-3 mb-8 text-sm text-zinc-400 ${
                  animationStep >= 1 ? "animate-slide-up-1" : "opacity-0"
                }`}
              >
                <span>{landingT.socialProof.trustedBy}</span>
                <div className="flex gap-1 ml-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-orange-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <h1
                className={`text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight ${
                  animationStep >= 2 ? "animate-slide-up-2" : "opacity-0"
                }`}
              >
                {landingT.hero.title} <span className="font-extrabold text-shimmer">{landingT.hero.titleHighlight}</span>
              </h1>

              {/* Subtext */}
              <p
                className={`text-xl text-zinc-400 leading-relaxed max-w-lg mb-10 ${
                  animationStep >= 3 ? "animate-slide-up-3" : "opacity-0"
                }`}
              > 
              {landingT.hero.subtitle}                
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 mb-12 ${
                  animationStep >= 4 ? "animate-slide-up-4" : "opacity-0"
                }`}
              >
                
                <Link
                  href="./dashboard/"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl button-hover relative overflow-hidden group"
                >
                  <span className="relative z-10">{landingT.hero.generateButton}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>

              <div className={`flex flex-wrap gap-6 ${animationStep >= 5 ? "animate-slide-up-5" : "opacity-0"}`}>
                {features.map(({ icon: Icon, text }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-zinc-400 text-sm feature-item group cursor-pointer"
                  >
                    <Icon
                      size={16}
                      className="text-orange-500 group-hover:text-orange-400 transition-colors duration-200 group-hover:scale-110 transform"
                    />
                    <span className="group-hover:text-zinc-300 transition-colors duration-200">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center items-center relative animate-phone-float">
              {/* Enhanced Floating Cards */}
              <FloatingCard
                className="top-12 -left-16 bg-green-500/10 border-green-500/20 hover:bg-green-500/20 transition-all duration-300 cursor-pointer"
                delay={0}
              >
                <span className="flex items-center gap-2">
                  ⚡ <span className="font-medium">{landingT.floatingCards.generatedIn}</span>
                </span>
              </FloatingCard>

              <FloatingCard
                className="bottom-20 -right-20 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer"
                delay={1}
              >
                <span className="flex items-center gap-2">
                  💱 <span className="font-medium">{landingT.floatingCards.currencies}</span>
                </span>
              </FloatingCard>

              <FloatingCard
                className="right-[-100px] top-1/2 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 transition-all duration-300 cursor-pointer"
                delay={2}
              >
                <span className="flex items-center gap-2">
                  🌍 <span className="font-medium">{landingT.floatingCards.languages}</span>
                </span>
              </FloatingCard>

              <div className="w-72 h-[580px] bg-zinc-900 rounded-[40px] border-2 border-zinc-700 relative shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:scale-105 transform">
                <div className="w-full h-full bg-black rounded-[36px] p-5 pt-16 relative overflow-hidden">
                  {/* Screen 1: AI Input */}
                  <div
                    className={`absolute inset-5 pt-11 transition-all duration-700 ease-out ${
                      currentScreen === 0
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-full scale-95"
                    }`}
                  >
                    <h3 className="text-white mb-4 font-semibold">{landingT.phoneScreens.aiGenerator}</h3>
                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm text-zinc-400 mb-5 min-h-[120px] hover:border-zinc-600 transition-colors duration-300">
                      {typingText}
                      {currentScreen === 0 && <span className="animate-pulse text-orange-500">|</span>}
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-400 hover:to-orange-300 hover:scale-105 transform"
                    >
                      {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                          <RotateCw size={16} className="animate-spin" />
                          {landingT.phoneScreens.generating}                          
                        </span>
                      ) : (
                        landingT.phoneScreens.generate
                      )}
                    </button>
                  </div>

                  {/* Screen 2: Generated Invoice */}
                  <div
                    className={`absolute inset-5 pt-11 transition-all duration-700 ease-out ${
                      currentScreen === 1
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-full scale-95"
                    }`}
                  >
                    {/* ... existing invoice screen code ... */}
                    <div className="bg-white text-black p-4 rounded-lg text-xs mb-4 flex-1 hover:shadow-lg transition-shadow duration-300">
                      <h4 className="font-bold mb-3">{landingT.phoneScreens.invoiceTitle}</h4>
                      <div className="mb-2 text-[11px]">
                        <div>
                          <strong>{landingT.phoneScreens.from}</strong>{landingT.phoneScreens.yourCompany}
                        </div>
                        <div>
                          <strong>{landingT.phoneScreens.to}</strong>{landingT.phoneScreens.clientName} 
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>{landingT.phoneScreens.webDesignProject}</span>
                          <span>$2,500.00</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2 font-bold">
                        <div className="flex justify-between">
                          <span>{landingT.phoneScreens.total}</span>
                          <span>{currencies[selectedCurrency]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-3">
                      {(Object.keys(currencies) as SupportedCurrency[]).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => handleCurrencyChange(curr)}
                          className={`px-3 py-1.5 text-xs rounded border transition-all duration-300 hover:scale-105 transform ${
                            selectedCurrency === curr
                              ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-transparent"
                              : "border-zinc-700 text-white hover:border-zinc-600"
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 px-3 py-2 text-xs border border-zinc-700 text-white rounded hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300"
                      >
                        {landingT.phoneScreens.shareLink}
                      </button>
                      <button
                        type="button"
                        className="flex-1 px-3 py-2 text-xs border border-zinc-700 text-white rounded hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300"
                      >
                        {landingT.phoneScreens.downloadPdf}
                      </button>
                    </div>
                  </div>

                  {/* Screen 3: Success State */}
                  <div
                    className={`absolute inset-5 pt-11 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out ${
                      currentScreen === 2
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-full scale-95"
                    }`}
                  >
                    <div className="text-5xl text-green-500 mb-4 animate-bounce">
                      <Check size={48} className="animate-pulse" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{landingT.phoneScreens.invoiceSent}</h3>
                    <p className="text-zinc-400 text-sm">{landingT.phoneScreens.generatedInTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InvoiceLanding
