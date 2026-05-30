import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Mail, Info } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Prodotto non trovato</h2>
          <Link to="/catalogo" className="text-blue-900 font-bold hover:underline">
            Torna al catalogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-white dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-12"
        >
          <ArrowLeft size={18} />
          <span className="font-semibold uppercase text-xs tracking-widest">Indietro</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl transition-all">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden opacity-50"><img src={product.image} className="w-full h-full object-cover grayscale" /></div>
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden opacity-50"><img src={product.image} className="w-full h-full object-cover grayscale" /></div>
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden opacity-50"><img src={product.image} className="w-full h-full object-cover grayscale" /></div>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-orange-600 decoration-2 underline-offset-8">
              {product.category}
            </span>
            <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-none mb-6">
              {product.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            <div className="space-y-8 mb-12">
              <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-6">
                  <Info size={14} /> Dettagli Tecnici
                </h3>
                  <div className="grid gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all px-2 md:rounded-lg group relative">
                        <span className="text-slate-500 dark:text-slate-500 text-xs uppercase font-bold tracking-widest">{key}</span>
                        <div className="relative group/tooltip">
                          <span className="text-slate-900 dark:text-white font-extrabold text-sm tracking-tight cursor-help">{value}</span>
                          
                          {/* Tooltip */}
                          <motion.div 
                            className="absolute bottom-full mb-2 right-0 pointer-events-none z-50 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 translate-y-2 group-hover/tooltip:translate-y-0"
                          >
                            <div className="bg-slate-900 dark:bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap">
                              {key}: {value}
                            </div>
                            <div className="w-2 h-2 bg-slate-900 dark:bg-orange-600 rotate-45 mx-auto -mt-1 absolute right-6" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>

              <div className="bg-blue-950 p-8 rounded-3xl text-white shadow-2xl shadow-blue-950/20">
                <h4 className="font-extrabold text-orange-500 mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <CheckCircle size={16} /> Status: Disponibile
                </h4>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  Disponibile per spedizione immediata in 24/48h. Contatta il nostro ufficio tecnico per schemi di montaggio.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Link 
                to="/contatti"
                className="flex-1 py-5 bg-blue-950 text-white font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-blue-900 hover:scale-[1.02] transition-all rounded-full flex items-center justify-center gap-3 shadow-2xl shadow-blue-950/30"
              >
                <Mail size={18} /> Richiedi Preventivo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
