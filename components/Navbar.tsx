// ./components/Navbar.tsx
"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { FileText, Menu, X, Home, DollarSign, LayoutDashboard, Globe, ChevronDown, BookOpen } from "lucide-react";
import { useNavTranslation } from "../hooks/useLanguage";
import { languageNames, Language } from "../lib/i18n";
import { usePathname } from 'next/navigation';
//import GlassSurface from '../components/GlassSurface'

// Tipos para los componentes de navegación
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { t, language, changeLanguage, isClient } = useNavTranslation();
  const pathname = usePathname();

  // Función para obtener el locale actual desde la URL
  const getCurrentLocale = () => {
    // Si estamos en la raíz (/) o no hay locale en la URL, usar el idioma actual del hook
    if (pathname === '/' || !pathname.startsWith('/')) {
      return language;
    }
    
    // Extraer el locale de la URL (ej: /en/something -> 'en')
    const segments = pathname.split('/');
    const possibleLocale = segments[1];
    
    // Verificar si es un locale válido
    if (Object.keys(languageNames).includes(possibleLocale)) {
      return possibleLocale as Language;
    }
    
    return language;
  };

  // Función para generar URLs con el locale correcto
  const getLocalizedUrl = (path: string) => {
    const currentLocale = getCurrentLocale();
    
    // Si estamos en la home page (sin locale en URL), añadir el locale
    if (pathname === '/') {
      return `/${currentLocale}${path}`;
    }
    
    // Si ya hay un locale en la URL, reemplazarlo o mantenerlo
    return `/${currentLocale}${path}`;
  };

  useEffect(() => {
    // Aplicar modo oscuro por defecto al montar
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setShowLanguageMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const NavLink = ({ href, children, icon: Icon }: NavLinkProps) => (
    <Link
      href={href}
      className="group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out text-white/80 hover:text-white hover:scale-[1.02] active:scale-[0.98] rounded-xl after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-white/60 after:to-white/20 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
    >
      {Icon && <Icon size={16} className="opacity-70 group-hover:opacity-100 transition-opacity duration-200" />}
      {children}
    </Link>
  );

  const MobileNavLink = ({ href, children, icon: Icon }: MobileNavLinkProps) => (
    <Link
      href={href}
      className="flex items-center gap-3 px-6 py-4 text-base font-medium text-white/80 hover:text-white transition-all duration-300 border-b border-white/10 last:border-b-0 hover:bg-white/5 hover:backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  // Componente del selector de idioma para desktop
  const LanguageSelector = () => (
    <div className="relative language-selector">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowLanguageMenu(!showLanguageMenu);
        }}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group backdrop-blur-sm hover:shadow-lg hover:shadow-white/5"
        aria-label={t.language}
      >
        <Globe size={16} className="opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
        <span className="hidden sm:inline">
          {languageNames[language]}
        </span>
        <ChevronDown 
          size={14} 
          className={`opacity-70 group-hover:opacity-100 transition-all duration-300 ${
            showLanguageMenu ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {showLanguageMenu && (
        <div className="absolute top-full right-0 mt-3 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 min-w-[160px] animate-in slide-in-from-top-2 duration-300">
          <div className="p-2">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage(code as Language);
                  setShowLanguageMenu(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm rounded-xl transition-all duration-300 ${
                  language === code 
                    ? 'bg-white/20 text-white font-medium shadow-lg shadow-white/10' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Componente del selector de idioma para móvil
  const MobileLanguageSelector = () => (
    <div className="px-6 py-4 border-t border-white/10">
      <div className="mb-3">
        <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
          {t.language}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(languageNames).map(([code, name]) => (
          <button
            key={code}
            onClick={() => {
              changeLanguage(code as Language);
              setIsOpen(false);
            }}
            className={`px-3 py-2.5 text-xs font-medium rounded-xl transition-all duration-300 backdrop-blur-sm ${
              language === code 
                ? 'bg-white/20 text-white shadow-lg shadow-white/10' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );

  // Loading state con efecto glass
  if (!isClient) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-xl border-b border-white/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-white/90 to-white/60 rounded-xl flex items-center justify-center shadow-lg shadow-white/20">
                  <FileText className="w-4 h-4 text-black" />
                </div>
                <span className="text-lg font-semibold text-white tracking-tight">
                  Rapid Invoice
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16"></div>
      </>
    );
  }

  return (
    <>
      <nav className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out
        w-full max-w-[1400px] mx-4
      `}>
        {/* Glass background */}
        <div className={`
          absolute inset-0 transition-all duration-500 ease-out rounded-2xl
          ${isScrolled 
            ? 'bg-gradient-to-r from-black/50 via-black/40 to-black/50 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-black/30' 
            : 'bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-xl border border-white/15'
          }
        `}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo con efecto glass */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 bg-gradient-to-br from-white/90 to-white/60 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/30 backdrop-blur-sm">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight group-hover:text-white/90 transition-colors duration-300">
                  Rapid Invoice
                </span>
              </Link>
            </div>

            {/* Desktop Navigation con glass */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <NavLink href="/" icon={Home}>{t.home}</NavLink>
                <NavLink href="/pricing" icon={DollarSign}>{t.pricing}</NavLink>
                <NavLink href="/dashboard" icon={LayoutDashboard}>{t.dashboard}</NavLink>
                <NavLink href={getLocalizedUrl("/blog")} icon={BookOpen}>
                  {t.blog || "Blog"}
                </NavLink>
              </div>
            </div>

            {/* Desktop Actions con glass */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Selector de idioma */}
              <LanguageSelector />
              
              {/* Separador glass */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              
              {/* Clerk Auth Components con glass */}
              <div className="flex items-center space-x-2">
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
                  >
                    {t.signIn}
                  </Link>
                </SignedOut>
                
                <SignedIn>
                  <SignOutButton>
                    <button className="px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10">
                      {t.signOut}
                    </button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </div>

            {/* Mobile menu button con glass */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:shadow-lg hover:shadow-white/10"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation con glass */}
        <div className={`
          md:hidden transition-all duration-500 ease-out overflow-hidden
          ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="mt-2 border-t border-white/20 bg-gradient-to-b from-black/40 to-black/50 backdrop-blur-2xl rounded-b-2xl">
            <div className="py-2">
              <MobileNavLink href="/" icon={Home}>{t.home}</MobileNavLink>
              <MobileNavLink href="/pricing" icon={DollarSign}>{t.pricing}</MobileNavLink>
              <MobileNavLink href="/dashboard" icon={LayoutDashboard}>{t.dashboard}</MobileNavLink>
              <MobileNavLink href={getLocalizedUrl("/blog")} icon={BookOpen}>
                {t.blog || "Blog"}
              </MobileNavLink>
              
              <div className="border-t border-white/10 mt-2 pt-4">
                <SignedOut>
                  <div className="px-6 py-2">
                    <Link
                      href="/sign-in"
                      className="block w-full px-6 py-3 text-center text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {t.signIn}
                    </Link>
                  </div>
                </SignedOut>
                
                <SignedIn>
                  <div className="px-6 py-2">
                    <SignOutButton>
                      <button 
                        className="block w-full px-6 py-3 text-center text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-white/10"
                        onClick={() => setIsOpen(false)}
                      >
                        {t.signOut}
                      </button>
                    </SignOutButton>
                  </div>
                </SignedIn>
              </div>
              
              {/* Selector de idioma móvil */}
              <MobileLanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      
    </>
  );
};

export default Navbar;