import React from 'react';
import { FileText, DollarSign, LayoutDashboard } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex mt-14 items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Invoice
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {" "}Generator
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Crea facturas{" "}
          <span className="text-blue-400 font-semibold">profesionales y minimalistas</span>{" "}
          en segundos con nuestra plataforma intuitiva
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Crear Factura
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button className="border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-gray-800/30 flex items-center gap-3">
            <DollarSign className="w-5 h-5" />
            Ver Precios
          </button>
        </div>

        {/* Features highlight */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Diseño Minimalista</h3>
            <p className="text-gray-400 text-sm">Facturas limpias y profesionales que impresionan a tus clientes</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <LayoutDashboard className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-gray-400 text-sm">Interfaz intuitiva que te permite crear facturas en minutos</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Gestión Completa</h3>
            <p className="text-gray-400 text-sm">Controla pagos, clientes y reportes desde un solo lugar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;