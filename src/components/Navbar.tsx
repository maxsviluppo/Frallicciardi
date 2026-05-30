"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage, type Language } from '../context/LanguageContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.catalog'), path: '/catalogo' },
    { name: t('nav.about'), path: '/chi-siamo' },
    { name: t('nav.contacts'), path: '/contatti' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-10 py-6",
        isScrolled || pathname !== '/' 
          ? "bg-white dark:bg-slate-900 shadow-sm py-4" 
          : "bg-gradient-to-b from-black/60 to-transparent"
      )}
    >
      <div className="max-w-full mx-auto px-4 sm:px-10 py-4 sm:py-6 flex justify-between items-center transition-all">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center group">
            <img 
              src="/frallicciardi-logo.pdf.png" 
              alt="FRALLICCIARDI" 
              className={cn(
                "h-8 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105",
                isScrolled || pathname !== '/' 
                  ? "dark:brightness-0 dark:invert" 
                  : "brightness-0 invert"
              )}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest hover:text-orange-600 transition-all border-b-2 border-transparent",
                  pathname === link.path 
                    ? "border-orange-600 text-orange-600" 
                    : (isScrolled || pathname !== '/' ? "text-slate-600 dark:text-slate-300" : "text-white")
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Selector */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
                isScrolled || pathname !== '/'
                  ? "text-slate-600 dark:text-white"
                  : "text-white"
              )}
            >
              <Globe size={14} />
              <span>{language}</span>
              <ChevronDown size={12} className={cn("transition-transform duration-200", langOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl p-2 flex flex-col gap-1 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
                        language === lang.code
                          ? "text-orange-600 font-bold bg-orange-50/50 dark:bg-orange-950/20"
                          : "text-slate-700 dark:text-slate-200"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {language === lang.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
              isScrolled || pathname !== '/' 
                ? "text-slate-600 dark:text-white" 
                : "text-white"
            )}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Phone Icon Link */}
          <a 
            href="tel:+393397555860"
            className={cn(
              "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all hover:scale-110",
              isScrolled || pathname !== '/'
                ? "border-blue-950 text-blue-950 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900 hover:bg-blue-950 hover:text-white"
                : "border-white/30 text-white hover:bg-white hover:text-slate-900"
            )}
            aria-label="Call us"
          >
            <Phone size={14} className="sm:w-[18px] sm:h-[18px]" />
          </a>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden p-2 transition-colors",
              isScrolled || pathname !== '/' ? "text-slate-900 dark:text-white" : "text-white"
            )}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[80%] left-4 right-4 bg-white dark:bg-slate-900 shadow-2xl p-8 md:hidden flex flex-col gap-4 border border-slate-100 dark:border-slate-800 rounded-3xl z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-slate-800 dark:text-white py-3 border-b border-slate-50 dark:border-slate-800 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">Lingua / Language</span>
              <div className="grid grid-cols-5 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all",
                      language === lang.code
                        ? "border-orange-600 bg-orange-50 dark:bg-orange-950/20 text-orange-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    <span className="text-lg mb-1">{lang.flag}</span>
                    <span className="uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-orange-600">
                <Phone size={18} />
                <span className="text-sm font-medium">+39 339 75 55 860</span>
              </div>
              <div className="flex items-center gap-3 text-orange-600">
                <Mail size={18} />
                <span className="text-sm font-medium">info@frallicciardi.it</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
