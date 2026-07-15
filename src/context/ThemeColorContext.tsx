"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type ThemeColorContextType = {
  setSlideColor: (color: string) => void;
  currentSlideColor: string;
};

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [slideColor, setSlideColor] = useState<string>('#09111e'); // Rich, deep premium navy/sea black
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme with document classList
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setActiveTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const isDark = document.documentElement.classList.contains('dark');
    setActiveTheme(isDark ? 'dark' : 'light');

    return () => observer.disconnect();
  }, []);

  // Update meta theme-color dynamically
  useEffect(() => {
    let targetColor = slideColor;

    if (pathname !== '/') {
      // Not on home page -> matches navbar
      targetColor = activeTheme === 'dark' ? '#0f172a' : '#ffffff';
    } else if (isScrolled) {
      // Scrolled on home page -> matches navbar
      targetColor = activeTheme === 'dark' ? '#0f172a' : '#ffffff';
    }

    // Find or create meta tag
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    
    // Set color with smooth transition if possible (most browsers will snap, but we make sure the value is clean)
    meta.setAttribute('content', targetColor);
  }, [pathname, isScrolled, activeTheme, slideColor]);

  return (
    <ThemeColorContext.Provider value={{ setSlideColor, currentSlideColor: slideColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider');
  }
  return context;
}
