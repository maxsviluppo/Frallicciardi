import React from 'react';
import { motion } from 'motion/react';
import { Compass, Shield, Users, Mail, Phone, MapPin, Anchor } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Editorial Header */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-slate-950 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1544413647-ad3030ba6890?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-5xl mx-auto relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Legacy of Excellence</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none font-sans">NAUTIPART</h1>
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed max-w-2xl mx-auto">
              Dal 1998, il punto di riferimento per i cantieri navali e i diportisti che esigono 
              prestazioni e sicurezza senza compromessi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-600/10 -rotate-3 rounded-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1574620078018-09a56f6719ac?auto=format&fit=crop&q=80&w=1200" 
              className="relative z-10 w-full h-[600px] object-cover rounded-3xl shadow-3xl"
              alt="Workshop"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest">Chi Siamo</h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">Distribuzione <br/> Certificata.</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Siamo nati dall'esigenza di colmare il gap tra produttori globali e utenti finali, 
                garantendo una logistica impeccabile e una selezione tecnica di primissimo livello.
              </p>
              <p>
                Ogni articolo nel nostro catalogo è stato testato e validato dai nostri ingegneri 
                per assicurare la massima resilienza alle sfide del mare aperto.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tighter">15k+</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest mt-1">Articoli a Magazzino</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tighter">24h</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest mt-1">Consegna Express</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white italic underline decoration-blue-950 dark:decoration-orange-600 decoration-4 underline-offset-8">I Nostri Pilastri</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <ValueCard 
            icon={<Shield className="w-12 h-12 text-blue-950 dark:text-orange-600" />}
            title="Senza Compromessi"
            description="La sicurezza della tua imbarcazione e dell'equipaggio è il nostro parametro di valutazione fondamentale."
          />
          <ValueCard 
            icon={<Compass className="w-12 h-12 text-blue-950 dark:text-orange-600" />}
            title="Visione Globale"
            description="Anticipiamo le innovazioni del settore per portarti il domani della propulsione e del rigging."
          />
          <ValueCard 
            icon={<Users className="w-12 h-12 text-blue-950 dark:text-orange-600" />}
            title="Consulenza Dedicata"
            description="Non siamo solo un catalogo: siamo i tuoi consulenti tecnici, dalla scelta alla post-vendita."
          />
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-slate-950 p-12 transition-colors flex flex-col items-center text-center rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
      <div className="mb-8">{icon}</div>
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">{description}</p>
    </div>
  );
}
