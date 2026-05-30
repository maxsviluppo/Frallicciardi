import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [filter, setFilter] = useState('Tutto');
  const [search, setSearch] = useState('');

  const categories = ['Tutto', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesFilter = filter === 'Tutto' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Catalog Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 sm:py-16 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter uppercase font-sans">Catalogo Prodotti</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            Sfoglia la nostra selezione di componenti tecnici e accessori d'eccellenza 
            per lo yachting moderno. Qualità certificata.
          </p>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-full mx-auto px-4 sm:px-10 py-4 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 ${
                  filter === cat 
                    ? 'bg-blue-950 text-white shadow-lg shadow-blue-950/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cerca parte o accessorio..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:ring-1 focus:ring-blue-950 dark:focus:ring-orange-600 transition-all text-sm outline-none dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.21, 0.45, 0.32, 0.9],
                  delay: (idx % 4) * 0.1 
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-2xl rounded-3xl overflow-hidden"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-orange-600 mb-2 uppercase tracking-[0.2em]">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                  <Link 
                    to={`/catalogo/${product.id}`}
                    className="mt-auto py-5 text-center bg-blue-950 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-900 hover:scale-[1.02] transition-all shadow-lg shadow-blue-950/10"
                  >
                    Scheda Tecnica
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors">
            <Filter className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nessun prodotto trovato</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Prova a cambiare i filtri o il termine di ricerca.</p>
          </div>
        )}
      </main>
    </div>
  );
}
