'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import it from '../data/locales/it.json';
import en from '../data/locales/en.json';
import fr from '../data/locales/fr.json';
import de from '../data/locales/de.json';
import es from '../data/locales/es.json';

export type Language = 'it' | 'en' | 'fr' | 'de' | 'es';

// Base translations from static files
const staticTranslations: Record<Language, any> = { it, en, fr, de, es };

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('it');
  // Translations merged with any localStorage overrides from admin
  const [translations, setTranslations] = useState<Record<Language, any>>(staticTranslations);

  useEffect(() => {
    // Load language preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['it', 'en', 'fr', 'de', 'es'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['it', 'en', 'fr', 'de', 'es'].includes(browserLang)) {
        setLanguageState(browserLang);
        localStorage.setItem('language', browserLang);
      } else {
        setLanguageState('it');
        localStorage.setItem('language', 'it');
      }
    }

    // 1) Carica subito dal localStorage (veloce, evita flash)
    const applyLocalStorage = () => {
      const merged = { ...staticTranslations };
      try {
        const lsIt = localStorage.getItem('cms_locale_it');
        if (lsIt) merged.it = JSON.parse(lsIt);
      } catch {}
      setTranslations(merged);
    };
    applyLocalStorage();

    // 2) Poi va a prendere i dati aggiornati dal DB Neon (funziona su tutti i dispositivi)
    const fetchFromDb = async () => {
      try {
        const res = await fetch('/api/admin/save-locales?lang=it', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && json.data && json.storage === 'database') {
          // Aggiorna localStorage come cache locale e applica le traduzioni
          localStorage.setItem('cms_locale_it', JSON.stringify(json.data));
          setTranslations(prev => ({ ...prev, it: json.data }));
        }
      } catch {
        // Se la fetch fallisce, restano i dati dal localStorage (già caricati sopra)
      }
    };
    fetchFromDb();

    // 3) Ascolta modifiche locali (quando l'admin salva sullo stesso browser)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cms_locale_it') applyLocalStorage();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let value: any = translations[language] || translations['it'];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Italian
        let fallbackValue: any = translations['it'];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return defaultValue || key;
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : (defaultValue || key);
      }
    }
    
    return typeof value === 'string' ? value : (defaultValue || key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

