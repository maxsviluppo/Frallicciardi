"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Waves, ShieldCheck, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useLanguage } from '../context/LanguageContext';

// Detect if user is on a mobile/tablet device (screen width <= 768px)
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// Helper to extract YouTube video ID from any YouTube URL
function extractYoutubeId(url: string): string | null {
  try {
    if (url.includes('/embed/')) {
      const embedPart = url.split('/embed/')[1];
      return embedPart?.split('?')[0] || null;
    }
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v') || null;
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || null;
    }
  } catch {}
  return null;
}

// Build a proper embed URL from any YouTube URL
function buildYoutubeEmbedUrl(url: string): string {
  // If already has autoplay param, return as-is
  if (url.includes('autoplay=')) return url;
  const videoId = extractYoutubeId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;
  }
  return url;
}

export default function Home() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const featuredProducts = [
    "parabrezza-1-676x507",
    "porte-scorrevoli-metacrilato-colato-bianco",
    "sportelli-cartella-sportelli-foto-1-470x470",
  ]
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const getProductTranslationKey = (id: string) => {
    if (id.includes('anchor')) return 'anchor';
    if (id.includes('propeller')) return 'propeller';
    if (id.includes('fender')) return 'fender';
    if (id.includes('gps')) return 'gps';
    return '';
  };

  // Build slides array: hero.background_url is the first, then background_url_2, background_url_3, etc.
  const DEFAULT_BG = 'https://www.youtube.com/embed/nvsvSCy7-2c?autoplay=1&mute=1&loop=1&playlist=nvsvSCy7-2c&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1';
  const rawSlides = [
    t('hero.background_url', DEFAULT_BG),
    t('hero.background_url_2', ''),
    t('hero.background_url_3', ''),
  ].filter(Boolean);
  const heroSlides = rawSlides.length > 0 ? rawSlides : [DEFAULT_BG];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 backward

  // Auto-rotate slides
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const bgUrl = heroSlides[currentSlide];
  const isYoutube = bgUrl.includes('youtube.com') || bgUrl.includes('youtu.be') || bgUrl.includes('/embed/');
  const isVideo = !isYoutube && (bgUrl.endsWith('.mp4') || bgUrl.endsWith('.webm') || bgUrl.endsWith('.ogg'));
  const heroEmbedUrl = isYoutube ? buildYoutubeEmbedUrl(bgUrl) : bgUrl;

  // On mobile, YouTube iframes don't autoplay — use fallback image instead
  const MOBILE_FALLBACK_IMAGE = t('hero.mobile_fallback_image', '/motor_yacht.jpg');
  const showMobileFallback = isMobile && isYoutube;

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden rounded-br-[4rem] lg:rounded-br-[12rem] shadow-2xl z-20">
        {/* Slide Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/40 z-10 pointer-events-none" />
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 pointer-events-none"
            >
              {showMobileFallback ? (
                // Mobile: YouTube non fa autoplay — mostra immagine statica
                <img
                  key="mobile-fallback"
                  src={MOBILE_FALLBACK_IMAGE}
                  alt="Hero Backdrop"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : isYoutube ? (
                // Desktop: iframe YouTube con autoplay
                <iframe
                  key={heroEmbedUrl}
                  src={heroEmbedUrl}
                  className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  title="Sea Backdrop Video"
                />
              ) : isVideo ? (
                // Video file diretto (mp4/webm) — funziona su tutti i dispositivi
                <video
                  key={bgUrl}
                  src={bgUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                />
              ) : (
                <img
                  key={bgUrl}
                  src={bgUrl}
                  alt="Hero Backdrop"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide navigation arrows — only shown if more than 1 slide */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-all"
              aria-label="Slide precedente"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-all"
              aria-label="Slide successiva"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="relative z-10 text-center px-4 sm:px-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-widest mb-6 leading-tight">
              <span className="font-bold uppercase text-orange-600">{t('hero.title_line1')}</span> <br/>
              <span className="font-light uppercase">{(t('hero.title_line2'))}</span>
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/70 font-normal uppercase tracking-[0.2em] sm:tracking-[0.5em] mb-12">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link 
                href="/catalogo"
                className="w-full sm:w-auto px-6 sm:px-14 py-4 sm:py-6 bg-blue-950 text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-blue-900 hover:scale-105 transition-all rounded-full flex items-center justify-center gap-2 shadow-xl shadow-blue-950/30 whitespace-nowrap"
              >
                {t('hero.explore_catalog')} <ArrowRight size={14} />
              </Link>
              <a 
                href="#mission"
                className="w-full sm:w-auto px-6 sm:px-14 py-4 sm:py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white/20 hover:scale-105 transition-all rounded-full flex items-center justify-center whitespace-nowrap"
              >
                {t('hero.inspiration')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20 hidden md:block"
        >
          <div className="w-1 h-12 rounded-full bg-white/20 relative">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-white rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-4 sm:px-10 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs block">{t('mission.badge')}</span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase italic">
                  {t('mission.title_line1')} <br /> {t('mission.title_line2')}
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                <p>
                  {t('mission.p1')}
                </p>
                <p>
                  {t('mission.p2')}
                </p>
                <p>
                  {t('mission.p3')}
                </p>
              </div>

              <Link 
                href="/chi-siamo"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-950 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-900 hover:scale-105 transition-all shadow-xl shadow-blue-950/20 group"
              >
                {t('mission.cta')} 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-orange-600/10 rounded-[3rem] -rotate-2 z-0" />
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src={t('mission.image', 'https://i.pinimg.com/736x/b5/ef/2a/b5ef2afd452f043a4d86323641377597.jpg')} 
                  alt="Nautical Excellence" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 hidden sm:block">
                <div className="text-4xl font-black text-orange-600 mb-1">28+</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                  {t('mission.experience_years').split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word} {i === 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlight/Qualities Section (Combined from Theme) */}
      <section className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-full mx-auto grid md:grid-cols-3">
          <QualityCard 
            icon={<Settings className="w-10 h-10 text-orange-600" />}
            title={t('qualities.precision_title')}
            description={t('qualities.precision_desc')}
            imageUrl={t('qualities.precision_image', '/sail_boat.jpg')}
            isR={true}
          />
          <QualityCard 
            icon={<ShieldCheck className="w-10 h-10 text-orange-600" />}
            title={t('qualities.certified_title')}
            description={t('qualities.certified_desc')}
            imageUrl={t('qualities.certified_image', '/motor_yacht.jpg')}
            isR={true}
            isGray={true}
          />
          <QualityCard 
            icon={<Waves className="w-10 h-10 text-orange-600" />}
            title={t('qualities.experience_title')}
            description={t('qualities.experience_desc')}
            imageUrl={t('qualities.experience_image', '/racing_boat.jpg')}
            isR={false}
          />
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-24 px-4 sm:px-10 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] block">{t('categories.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
              {t('categories.title_line1')} <span className="text-blue-950 dark:text-orange-600">{t('categories.title_line2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-6">
            {[...CATEGORIES].sort((a, b) => a.order - b.order).map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/catalogo?filter=${encodeURIComponent(cat.filter)}`}
                className={cn("col-span-full sm:col-span-1 w-full block", idx < 3 ? "sm:col-span-2" : "sm:col-span-3")}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group cursor-pointer w-full"
                >
                  <div className="relative overflow-hidden rounded-[2rem] shadow-xl mb-4 group-hover:shadow-2xl transition-all aspect-[4/3]">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white uppercase tracking-normal sm:tracking-tight mb-2 leading-tight break-words max-w-full">
                        {t('categories.' + cat.id, cat.name)}
                      </h3>
                      <div className="w-8 h-1 bg-orange-600 rounded-full group-hover:w-16 transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Contact & Hours Section */}
      <section className="py-20 px-4 sm:px-10 bg-slate-950 overflow-hidden border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info & Hours */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">{t('contact_section.badge')}</span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                  {t('contact_section.title_line1')} <br /> {t('contact_section.title_line2')}
                </h2>
              </div>

              <div className="space-y-8 text-slate-400 font-light">
                <div className="space-y-2">
                  <p className="text-white font-bold uppercase tracking-widest text-xs">{t('contact_section.opening_hours')}</p>
                  <p className="text-2xl font-mono text-orange-600 uppercase tracking-tight">{t('azienda.hours', 'LUN/SAB — 08:30 / 18:00')}</p>
                </div>

                <p className="text-sm leading-relaxed max-w-md">
                  {t('contact_section.desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t('contact_section.location')}</span>
                  <p className="text-white font-bold text-sm">{t('azienda.address', 'Via Ferrante Imparato, 265 - 80146 Napoli (NA) ITALY')}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t('contact_section.phone')}</span>
                  <p className="text-white font-bold">
                    <a href={`tel:${t('azienda.phone', '+390817528376').replace(/\s+/g, '')}`} className="hover:text-orange-500 transition-colors">
                      {t('azienda.phone', '+39 081 752 8376')}
                    </a>
                  </p>
                  <p className="text-slate-400 font-medium text-sm">
                    <a href={`tel:${t('azienda.phone_mobile', '+393397555860').replace(/\s+/g, '')}`} className="hover:text-orange-500 transition-colors">
                      {t('azienda.phone_mobile', '+39 339 75 55 860')}
                    </a>
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t('contact_section.email')}</span>
                  <p className="text-white font-bold">
                    <a href={`mailto:${t('azienda.email', 'info@frallicciardi.it')}`} className="hover:text-orange-500 transition-colors">
                      {t('azienda.email', 'info@frallicciardi.it')}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Minimalist Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">{t('contact_section.form_name')}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors"
                      placeholder={t('contact_section.form_name_placeholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">{t('contact_section.form_email')}</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors"
                      placeholder={t('contact_section.form_email_placeholder')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">{t('contact_section.form_phone')}</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder={t('contact_section.form_phone_placeholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">{t('contact_section.form_message')}</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors resize-none"
                    placeholder={t('contact_section.form_message_placeholder')}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-[10px] rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-600/20"
                >
                  {t('contact_section.form_submit')}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Mini Catalog */}
      <section className="py-24 px-6 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block underline decoration-2 underline-offset-8">{t('featured_products.badge')}</span>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t('featured_products.title')}</h2>
            </div>
            <Link href="/catalogo" className="hidden md:flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-medium">
              {t('featured_products.view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, idx) => {
              const translationKey = getProductTranslationKey(product.id);
              const name = translationKey ? t(`products.${translationKey}.name`) : product.name;
              const categoryKey = translationKey ? t(`products.${translationKey}.category`) : product.category;
              const description = translationKey ? t(`products.${translationKey}.description`) : product.description;

              return (
                <Link
                  key={product.id}
                  href={`/catalogo?filter=${encodeURIComponent(product.category)}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all rounded-[2rem] overflow-hidden h-full"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative block bg-slate-100 dark:bg-slate-950">
                      <img 
                        src={product.image} 
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[10px] font-bold text-orange-600 mb-2 uppercase tracking-[0.2em]">
                        {categoryKey}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors tracking-tight mb-2 leading-tight">
                        {name}
                      </h3>
                      {description && (
                        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed font-light">
                          {description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function QualityCard({ icon, title, description, imageUrl, isR, isGray }: { icon: React.ReactNode, title: string, description: string, imageUrl?: string, isR?: boolean, isGray?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col h-full overflow-hidden transition-all duration-300 group border-b md:border-b-0",
      isR && "md:border-r border-slate-200 dark:border-slate-800",
      isGray ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900"
    )}>
      {imageUrl && (
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        </div>
      )}
      <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between">
        <div>
          <div className={cn(
            "mb-6 h-16 w-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
            imageUrl && "-mt-16 relative z-10"
          )}>{icon}</div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter uppercase group-hover:text-orange-600 transition-colors">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-light">{description}</p>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
