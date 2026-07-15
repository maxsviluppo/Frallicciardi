"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';

function CatalogContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState('Tutto');
  const [search, setSearch] = useState('');
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setFilter(filterParam);
    } else {
      setFilter('Tutto');
    }
  }, [searchParams]);

  const rawCategories = ['Tutto', ...new Set(PRODUCTS.map(p => p.category))];

  const getProductTranslationKey = (id: string) => {
    if (id.includes('anchor')) return 'anchor';
    if (id.includes('propeller')) return 'propeller';
    if (id.includes('fender')) return 'fender';
    if (id.includes('gps')) return 'gps';
    return '';
  };

  const getCategoryTranslationKey = (cat: string) => {
    if (cat === 'Accessori') return 'categories.accessori';
    if (cat === 'Parabrezza') return 'categories.parabrezza';
    if (cat === 'Porte scorrevoli') return 'categories.porte_scorrevoli';
    if (cat === 'Sportelli') return 'categories.sportelli';
    if (cat === 'Polimero') return 'categories.polimero';
    return cat;
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const translationKey = getProductTranslationKey(p.id);
    const translatedName = translationKey ? t(`products.${translationKey}.name`) : p.name;

    const matchesFilter = filter === 'Tutto' || p.category === filter;
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      translatedName.toLowerCase().includes(search.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });

  // Lightbox navigation functions
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null && filteredProducts.length > 0) {
      setLightboxIndex((prevIndex) => (prevIndex! + 1) % filteredProducts.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null && filteredProducts.length > 0) {
      setLightboxIndex((prevIndex) => (prevIndex! - 1 + filteredProducts.length) % filteredProducts.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredProducts.length]);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Catalog Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 sm:py-16 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter uppercase font-sans">{t('catalog_page.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            {t('catalog_page.subtitle')}
          </p>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-full mx-auto px-4 sm:px-10 py-4 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {rawCategories.map(cat => {
              const isAll = cat === 'Tutto';
              const translationKey = isAll ? 'catalog_page.all_filter' : getCategoryTranslationKey(cat);
              const displayName = t(translationKey);
              
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setLightboxIndex(null); // Reset lightbox to avoid index misalignment
                  }}
                  className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 ${
                    filter === cat 
                      ? 'bg-blue-950 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder={t('catalog_page.search_placeholder')}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:ring-1 focus:ring-blue-950 dark:focus:ring-orange-600 transition-all text-sm outline-none dark:text-white"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setLightboxIndex(null); // Reset lightbox to avoid index misalignment
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => {
              const translationKey = getProductTranslationKey(product.id);
              const name = translationKey ? t(`products.${translationKey}.name`) : product.name;
              const categoryKey = translationKey ? t(`products.${translationKey}.category`) : product.category;
              
              // Resolve optional description
              const descriptionText = translationKey ? t(`products.${translationKey}.description`) : product.description;
              const hasDescription = descriptionText && descriptionText.trim() !== "" && !descriptionText.startsWith("products.");

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.21, 0.45, 0.32, 0.9],
                    delay: (idx % 3) * 0.1 
                  }}
                  className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-2xl rounded-3xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative block bg-slate-100 dark:bg-slate-950">
                    <img 
                      src={product.image} 
                      alt={name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <Maximize2 className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-orange-600 mb-2 uppercase tracking-[0.2em]">
                      {categoryKey}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors tracking-tight">
                      {name}
                    </h3>
                    {hasDescription && (
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-3 line-clamp-2 leading-relaxed font-light">
                        {descriptionText}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors">
            <Filter className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('catalog_page.no_results_title')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{t('catalog_page.no_results_desc')}</p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredProducts[lightboxIndex] && (() => {
          const product = filteredProducts[lightboxIndex];
          const translationKey = getProductTranslationKey(product.id);
          const name = translationKey ? t(`products.${translationKey}.name`) : product.name;
          const categoryKey = translationKey ? t(`products.${translationKey}.category`) : product.category;
          
          const descriptionText = translationKey ? t(`products.${translationKey}.description`) : product.description;
          const hasDescription = descriptionText && descriptionText.trim() !== "" && !descriptionText.startsWith("products.");

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:scale-105 z-50"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:scale-105 z-10"
                title="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:scale-105 z-10"
                title="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image panel */}
                <div className="flex-1 max-h-[60vh] md:max-h-[80vh] bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={name} 
                    className="w-full h-full object-contain max-h-[50vh] md:max-h-[75vh]"
                  />
                </div>

                {/* Details panel */}
                <div className="w-full md:w-80 p-8 sm:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-orange-600 mb-2 uppercase tracking-[0.2em]">
                    {categoryKey}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                    {name}
                  </h2>
                  
                  {hasDescription && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed mb-6">
                      {descriptionText}
                    </p>
                  )}
                  
                  {/* Action or indicator */}
                  <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-mono">
                    <span>IMAGE {lightboxIndex + 1} / {filteredProducts.length}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={<div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors flex items-center justify-center">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
