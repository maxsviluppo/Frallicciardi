"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Editorial Header */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-slate-950 via-transparent to-transparent z-10" />
        <div className="max-w-5xl mx-auto relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">{t('about_page.badge')}</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none font-sans">FRALLICCIARDI</h1>
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed max-w-2xl mx-auto">
              {t('about_page.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-600/10 -rotate-3 rounded-3xl" />
            <img 
              src={t('about_page.image', '/workshop.jpg')} 
              className="relative z-10 w-full h-[350px] sm:h-[450px] md:h-[600px] object-cover rounded-3xl shadow-3xl"
              alt="Workshop Compass"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest">{t('about_page.our_history')}</h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">{t('about_page.narrative_title')}</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-light">
              <p>
                {t('mission.p1')}
              </p>
              <p>
                {t('mission.p2')}
              </p>
              <p>
                {t('mission.p3')}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tighter">28+</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest mt-1">{t('mission.experience_years')}</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tighter">100%</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest mt-1">{t('mission.detail_care')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white italic underline decoration-blue-950 dark:decoration-orange-600 decoration-4 underline-offset-8">{t('about_page.pillars_title')}</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <ValueCard 
            icon={<Shield className="w-12 h-12 text-blue-950 dark:text-orange-600" />}
            title={t('about_page.pillar1_title')}
            description={t('about_page.pillar1_desc')}
          />
          <ValueCard 
            icon={<Compass className="w-12 h-12 text-blue-950 dark:text-orange-600" />}
            title={t('about_page.pillar2_title')}
            description={t('about_page.pillar2_desc')}
          />
          <ValueCard 
            icon={<Zap className="w-12 h-12 text-blue-950 dark:text-orange-600" />}
            title={t('about_page.pillar3_title')}
            description={t('about_page.pillar3_desc')}
          />
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 md:p-12 transition-colors flex flex-col items-center text-center rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
      <div className="mb-8">{icon}</div>
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">{description}</p>
    </div>
  );
}

