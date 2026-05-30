import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Waves, ShieldCheck, Settings } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden rounded-br-[4rem] lg:rounded-br-[12rem] shadow-2xl z-20">
        {/* Elegant Sea Backdrop Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/40 z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-yacht-sailing-the-ocean-34284-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-widest mb-6 leading-tight">
              <span className="font-bold uppercase text-orange-600">L'Ingegneria</span> <br/>
              <span className="font-light uppercase">Del Mare</span>
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/70 font-normal uppercase tracking-[0.2em] sm:tracking-[0.5em] mb-12">
              Precisione Tecnica. Performance Senza Confini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link 
                to="/catalogo"
                className="w-full sm:w-auto px-6 sm:px-14 py-4 sm:py-6 bg-blue-950 text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-blue-900 hover:scale-105 transition-all rounded-full flex items-center justify-center gap-2 shadow-xl shadow-blue-950/30 whitespace-nowrap"
              >
                Esplora Catalogo <ArrowRight size={14} />
              </Link>
              <a 
                href="https://pin.it/1v3FmlMRc"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 sm:px-14 py-4 sm:py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white/20 hover:scale-105 transition-all rounded-full flex items-center justify-center whitespace-nowrap"
              >
                Ispirazione
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
      <section className="py-24 px-4 sm:px-10 bg-white dark:bg-slate-950 overflow-hidden">
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
                <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs block">Oltre la Superficie</span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase italic">
                  La Nostra <br /> Missione
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                <p>
                  Fin dalla nostra fondazione, Nautipart si è posta l'obiettivo di ridefinire gli standard della componentistica nautica. Non siamo solo fornitori, ma partner tecnici per chi vive il mare come una sfida costante alla perfezione.
                </p>
                <p>
                  Dalla selezione dei materiali alla logistica di precisione, ogni nostro processo è guidato da un unico valore: l'eccellenza senza compromessi. Portiamo a bordo l'innovazione che garantisce sicurezza in ogni rotta.
                </p>
              </div>

              <Link 
                to="/chi-siamo"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-950 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-900 hover:scale-105 transition-all shadow-xl shadow-blue-950/20 group"
              >
                Scopri la nostra storia 
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
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Nautical Excellence" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 hidden sm:block">
                <div className="text-4xl font-black text-orange-600 mb-1">25+</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Anni di <br /> Esperienza</div>
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
            title="Precisione Tecnica"
            description="Ogni componente è selezionato per garantire prestazioni eccellenti in ogni condizione."
            isR={true}
          />
          <QualityCard 
            icon={<ShieldCheck className="w-10 h-10 text-orange-600" />}
            title="Standard Certificato"
            description="Collaboriamo solo con i migliori marchi mondiali per garantire la massima sicurezza."
            isR={true}
            isGray={true}
          />
          <div className="p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">In Evidenza</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1544654803-b69110bb2854?auto=format&fit=crop&q=80&w=200" alt="Sistemi Winch" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Sistemi Winch Pro</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Serie Performance 2024</p>
                </div>
              </div>
              <div className="flex gap-4 items-center p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=200" alt="Elica Pro-Pitch" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Elica Pro-Pitch V6</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Efficienza Idrodinamica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-24 px-4 sm:px-10 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] block">Sfoglia per Tipo</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
              Le Nostre <span className="text-blue-950 dark:text-orange-600">Eccellenze</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { name: "Accessori", img: "https://images.unsplash.com/photo-1516108185675-738981414704?auto=format&fit=crop&q=80&w=600" },
              { name: "Parabrezza", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=600" },
              { name: "Porte scorrevoli", img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798151?auto=format&fit=crop&q=80&w=600" },
              { name: "Sportelli", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600" },
              { name: "Polimero", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=600" }
            ].map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group cursor-pointer ${
                  idx < 3 ? 'col-span-1 lg:col-span-2' : 
                  idx === 4 ? 'col-span-2 lg:col-span-3' : 'col-span-1 lg:col-span-3'
                }`}
              >
                <div className={`relative overflow-hidden rounded-[2rem] shadow-xl mb-4 group-hover:shadow-2xl transition-all ${
                  idx < 3 ? 'aspect-[3/4]' : 
                  idx === 3 ? 'aspect-[3/4] lg:aspect-[16/10]' : 
                  'aspect-[2/1] lg:aspect-[16/10]'
                }`}>
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight mb-2">{cat.name}</h3>
                    <div className="w-8 h-1 bg-orange-600 rounded-full group-hover:w-16 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
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
                <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">Contatti</span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                  Sempre a <br /> Vostra Disposizione
                </h2>
              </div>

              <div className="space-y-8 text-slate-400 font-light">
                <div className="space-y-2">
                  <p className="text-white font-bold uppercase tracking-widest text-xs">Orari di Apertura</p>
                  <p className="text-2xl font-mono text-orange-600 uppercase tracking-tight">LUN/SAB — 08:30 / 18:00</p>
                </div>

                <p className="text-sm leading-relaxed max-w-md">
                  Per qualsiasi informazione, delucidazioni e chiarimenti in merito ai nostri prodotti, non esitare a contattarci. 
                  Compila il modulo con i tuoi dati e inviaci un messaggio. Ti risponderemo nel più breve tempo possibile.
                </p>
              </div>

              <div className="flex gap-10">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Telefono</span>
                  <p className="text-white font-bold">+39 081 123 4567</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Email</span>
                  <p className="text-white font-bold">info@nautipart.it</p>
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
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Nominativo</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors"
                      placeholder="Nome e Cognome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors"
                      placeholder="email@esempio.it"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Telefono</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="+39 ..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Messaggio</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 text-white text-sm focus:outline-none focus:border-orange-600 transition-colors resize-none"
                    placeholder="Come possiamo aiutarti?"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-[10px] rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-600/20"
                >
                  Invia Messaggio
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
              <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block underline decoration-2 underline-offset-8">Highlight</span>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Prodotti in Primo Piano</h2>
            </div>
            <Link to="/catalogo" className="hidden md:flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-medium">
              Vedi tutto il catalogo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 relative rounded-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-slate-900 dark:text-white rounded-full">
                    {product.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 truncate group-hover:text-orange-600 transition-colors">{product.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-light">
                  {product.description}
                </p>
                <Link 
                  to={`/catalogo/${product.id}`}
                  className="w-full py-5 bg-blue-950 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-900 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20"
                >
                  Dettagli Scheda <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function QualityCard({ icon, title, description, isR, isGray }: { icon: React.ReactNode, title: string, description: string, isR?: boolean, isGray?: boolean }) {
  return (
    <div className={cn(
      "p-12 flex flex-col justify-center transition-colors",
      isR && "border-r border-slate-200 dark:border-slate-800",
      isGray ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900"
    )}>
      <div className="mb-6 h-16 w-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-light">{description}</p>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
