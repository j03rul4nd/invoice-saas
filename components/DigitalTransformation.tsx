"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FileText, Check, Share2 } from 'lucide-react';

type DocumentType = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  stressed: boolean;
  lines: number;
  sucked?: boolean;
};

const DigitalTransformation = () => {
  const containerRef = useRef(null);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [showPortal, setShowPortal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState('€1,299');
  
  const currencies = ['€1,299', '$1,421', '£1,089', '¥156,890'];
  const currencyIndex = useRef(0);

  // Crear documentos caóticos
  const createDocuments = () => {
    const newDocs = [];
    const documentCount = 24;
    
    for (let i = 0; i < documentCount; i++) {
      newDocs.push({
        id: i,
        x: Math.random() * 80 + 10, // porcentaje
        y: Math.random() * 80 + 10,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        delay: Math.random() * 0.8,
        stressed: Math.random() < 0.3,
        lines: Math.floor(Math.random() * 5) + 3
      });
    }
    
    setDocuments(newDocs);
  };

  // Animación principal
  const startAnimation = () => {
    setProgress(0);
    setShowPortal(false);
    setShowInvoice(false);
    
    // Crear documentos
    createDocuments();
    
    // Progress bar
    setTimeout(() => setProgress(100), 100);
    
    // Portal aparece
    setTimeout(() => setShowPortal(true), 1500);
    
    // Succión de documentos
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => ({ ...doc, sucked: true })));
    }, 2200);
    
    // Invoice aparece
    setTimeout(() => setShowInvoice(true), 2700);
    
    // Reset para loop
    setTimeout(() => startAnimation(), 6500);
  };

  // Ciclo de monedas
  const cycleCurrency = () => {
    currencyIndex.current = (currencyIndex.current + 1) % currencies.length;
    setCurrentCurrency(currencies[currencyIndex.current]);
  };

  useEffect(() => {
    startAnimation();
    const currencyInterval = setInterval(cycleCurrency, 2500);
    
    return () => clearInterval(currencyInterval);
  }, []);

  return (
    <div className="relative w-full h-screen  overflow-hidden font-inter">
      {/* Enhanced Gradient Orbs */}
      <div 
        className="absolute w-96 h-96 -top-48 -right-48 opacity-15 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
          animation: 'orbPulse 8s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-72 h-72 -bottom-36 -left-36 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(247,147,30,0.1) 0%, transparent 70%)',
          animation: 'orbPulse 8s ease-in-out infinite reverse'
        }}
      />
      
      {/* Progress Bar */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-64 h-0.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden z-20">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-[5500ms] ease-out shadow-lg"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 15px rgba(255, 107, 53, 0.5)'
          }}
        />
      </div>

      {/* Container Principal */}
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
        
        {/* Documentos Caóticos */}
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`absolute w-20 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-2 transition-all duration-1000 ${
              doc.stressed ? 'border-red-400/30 shadow-lg shadow-red-400/10' : ''
            } ${
              doc.sucked ? 'opacity-0 scale-0' : 'opacity-100'
            }`}
            style={{
              left: `${doc.x}%`,
              top: `${doc.y}%`,
              transform: `rotate(${doc.rotation}deg) scale(${doc.scale})`,
              animationDelay: `${doc.delay}s`,
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              animation: doc.sucked 
                ? 'documentSuck 1s cubic-bezier(0.23, 1, 0.320, 1) forwards'
                : 'documentFloat 4s ease-in-out infinite'
            }}
          >
            <div className="w-full h-1.5 bg-white/20 rounded mb-1" />
            <div className="w-3/5 h-1 bg-white/15 rounded mb-1" />
            {Array.from({ length: doc.lines }).map((_, i) => (
              <div
                key={i}
                className={`h-0.5 bg-white/10 rounded mb-0.5 ${
                  i % 2 === 0 ? 'w-4/5' : 'w-3/5'
                }`}
              />
            ))}
          </div>
        ))}

        {/* Portal Digital */}
        <div
          className={`absolute w-36 h-36 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 transition-all duration-1200 ${
            showPortal ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            boxShadow: '0 0 60px rgba(255, 107, 53, 0.6), 0 0 100px rgba(255, 107, 53, 0.3)',
            animation: showPortal ? 'portalPulse 2s ease-in-out infinite' : ''
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 30%, rgba(255, 107, 53, 0.4) 70%)',
              animation: 'portalPulse 2s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-orange-500/30"
            style={{ animation: 'portalRing 3s linear infinite' }}
          />
        </div>

        {/* Factura Digital */}
        <div
          className={`absolute w-96 h-[480px] bg-white/5 backdrop-blur-[25px] border border-white/10 rounded-xl p-7 transition-all duration-1800 ${
            showInvoice ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8'
          }`}
          style={{
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Header */}
          <div className={`flex justify-between items-center mb-9 transition-all duration-1000 ${
            showInvoice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
              F
            </div>
            <h2 className="text-white text-2xl font-bold">Factura</h2>
          </div>

          {/* Líneas de contenido */}
          <div className="space-y-3 mb-9">
            {[
              { width: '100%', delay: 600 },
              { width: '85%', delay: 800 },
              { width: '92%', delay: 1000 },
              { width: '78%', delay: 1200 },
              { width: '88%', delay: 1400 },
              { width: '95%', delay: 1600 }
            ].map((line, i) => (
              <div
                key={i}
                className={`h-4 bg-white/12 rounded transition-all duration-700 ${
                  showInvoice ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ 
                  width: line.width,
                  transitionDelay: `${line.delay}ms`
                }}
              />
            ))}
          </div>

          {/* Total */}
          <div className={`pt-5 border-t border-white/10 flex justify-between items-center mb-7 transition-all duration-1000 ${
            showInvoice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '1800ms' }}>
            <span className="text-white font-semibold text-xl">Total:</span>
            <span 
              className="text-orange-500 font-bold text-3xl"
              style={{ textShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}
            >
              {currentCurrency}
            </span>
          </div>

          {/* Botón Compartir */}
          <button
            className={`w-full h-13 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white font-semibold text-lg transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/40 ${
              showInvoice ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}
            style={{ 
              transitionDelay: '2200ms',
              boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)'
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Check size={20} />
              Compartir Factura
            </div>
          </button>

          {/* Indicador de Éxito */}
          <div
            className={`absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold transition-all duration-800 ${
              showInvoice ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '2400ms' }}
          >
            <Check size={16} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes documentFloat {
          0%, 100% { transform: translateY(0) rotate(var(--rotation)) scale(1); }
          25% { transform: translateY(-15px) rotate(calc(var(--rotation) + 5deg)) scale(1.05); }
          75% { transform: translateY(15px) rotate(calc(var(--rotation) - 5deg)) scale(0.95); }
        }

        @keyframes documentSuck {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.7);
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            transform: scale(0.1) translate(0, -50vh);
            filter: blur(5px);
          }
        }

        @keyframes portalPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }

        @keyframes portalRing {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          100% { transform: translate(-50%, -50%) scale(1.2) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DigitalTransformation;