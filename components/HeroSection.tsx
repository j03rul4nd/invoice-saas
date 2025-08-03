// ./components/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, Sparkles, ArrowRight, Rocket, CreditCard, Zap, Brain, Clock, Globe } from "lucide-react";
import { useHeroTranslation } from "../hooks/useLanguage";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, language, isClient } = useHeroTranslation();
  
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Animación inicial simplificada para el ejemplo
    if (isClient) {
      const elements = [titleRef.current, subtitleRef.current, ctaRef.current, featuresRef.current];
      elements.forEach((el, index) => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 200 + 300);
        }
      });
    }
  }, [isClient, language]); // Re-animar cuando cambie el idioma

  const FloatingElement = ({ 
    icon: Icon, 
    className = "", 
    index = 0 
  }: { 
    icon: any; 
    className?: string; 
    index?: number;
  }) => (
    <div
      ref={(el) => { floatingElementsRef.current[index] = el; }}
      className={`absolute opacity-20 dark:opacity-10 ${className} animate-float`}
      style={{
        animationDelay: `${index * 0.5}s`,
        animationDuration: `${3 + index}s`
      }}
    >
      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm">
        <Icon size={24} className="text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  );

  const FeatureCard = ({ 
    icon: Icon, 
    title, 
    description 
  }: { 
    icon: any; 
    title: string; 
    description: string;
  }) => (
    <div className="group flex items-center gap-4 p-6 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white/80 dark:hover:bg-neutral-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );

  // Helper function para renderizar el subtítulo con texto destacado
  const renderSubtitle = () => {
    const parts = t.subtitle.split(t.subtitleHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
          {t.subtitleHighlight}
        </span>
        {parts[1]}
      </>
    );
  };

  // Loading state
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-neutral-950 dark:to-blue-950 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
          <FileText size={28} className="text-white" />
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-neutral-50/80 via-blue-50/40 to-purple-50/40 dark:from-neutral-950/80 dark:via-blue-950/30 dark:to-purple-950/30 overflow-hidden flex items-center justify-center"
      >
        {/* Elementos flotantes */}
        <FloatingElement icon={FileText} className="top-20 left-10" index={0} />
        <FloatingElement icon={Brain} className="top-32 right-16" index={1} />
        <FloatingElement icon={Sparkles} className="bottom-32 left-20" index={2} />
        <FloatingElement icon={Zap} className="bottom-20 right-12" index={3} />
        <FloatingElement icon={Clock} className="top-48 left-1/3" index={4} />

        {/* Patrón de cuadrícula */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Contenido principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            
            {/* Ícono principal */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <FileText size={28} className="text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                </div>
              </div>
              
              {/* Título principal */}
              <h1
                ref={titleRef}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 mb-6 tracking-tight drop-shadow-sm"
              >
                {t.title}
              </h1>
            </div>

            {/* Subtítulo */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-200 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-sm"
            >
              {renderSubtitle()}
            </p>

            {/* Botones CTA */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 inline-flex items-center hover:scale-105">
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket size={20} />
                  {t.getStarted}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="flex items-center gap-3 px-8 py-4 text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 group bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-white/10 hover:scale-105">
                <CreditCard size={20} className="group-hover:scale-110 transition-transform duration-300" />
                {t.viewPricing}
              </button>
            </div>

            {/* Cards de características */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <FeatureCard 
                icon={Brain} 
                title={t.features.ai.title} 
                description={t.features.ai.description} 
              />
              <FeatureCard 
                icon={Zap} 
                title={t.features.fast.title} 
                description={t.features.fast.description} 
              />
              <FeatureCard 
                icon={FileText} 
                title={t.features.secure.title} 
                description={t.features.secure.description} 
              />
              <FeatureCard 
                icon={Globe} 
                title={t.features.multilingual.title} 
                description={t.features.multilingual.description} 
              />
            </div>
          </div>
        </div>

        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 dark:from-neutral-950/80 to-transparent"></div>
      </section>
    </>
  );
};

export default HeroSection;