"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs mb-6 block underline decoration-orange-600 decoration-2 underline-offset-8">{t('contact_page.badge')}</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-8 tracking-tighter leading-none">{t('contact_page.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-12 font-light">
              {t('contact_page.desc')}
            </p>

            <div className="space-y-12">
              <ContactInfoItem 
                icon={<MapPin className="text-orange-600" />}
                title={t('contact_page.center_title')}
                detail={
                  <span>
                    Frallicciardi<br />
                    {t('azienda.address', 'Via Ferrante Imparato, 265 - 80146 Napoli (NA) ITALY')}
                  </span>
                }
              />
              <ContactInfoItem 
                icon={<Phone className="text-orange-600" />}
                title={t('contact_page.consulting_title')}
                detail={
                  <span className="flex flex-col">
                    <a href={`tel:${t('azienda.phone', '+390817528376').replace(/\s+/g, '')}`} className="hover:text-orange-600 transition-colors">
                      {t('azienda.phone', '+39 081 752 8376')}
                    </a>
                    <a href={`tel:${t('azienda.phone_mobile', '+393397555860').replace(/\s+/g, '')}`} className="hover:text-orange-600 transition-colors">
                      {t('azienda.phone_mobile', '+39 339 75 55 860')}
                    </a>
                  </span>
                }
              />
              <ContactInfoItem 
                icon={<Mail className="text-orange-600" />}
                title={t('contact_page.quotes_title')}
                detail={
                  <a href={`mailto:${t('azienda.email', 'info@frallicciardi.it')}`} className="hover:text-orange-600 transition-colors">
                    {t('azienda.email', 'info@frallicciardi.it')}
                  </a>
                }
              />
            </div>

            <div className="mt-16 p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('contact_section.opening_hours')}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{t('azienda.hours', 'LUN/SAB — 08:30 / 18:00')}</p>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={42} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('contact_page.success_title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">{t('contact_page.success_desc')}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-10 py-5 bg-blue-950 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-900 transition-all rounded-full shadow-xl shadow-blue-950/20"
                >
                  {t('contact_page.new_msg_btn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">{t('contact_section.form_name')}</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-950 dark:focus:border-orange-600 focus:ring-0 transition-all outline-none rounded-xl text-sm dark:text-white"
                      placeholder={t('contact_section.form_name_placeholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">{t('contact_section.form_email')}</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-950 dark:hover:border-orange-600 focus:ring-0 transition-all outline-none rounded-xl text-sm dark:text-white"
                      placeholder={t('contact_section.form_email_placeholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">{t('contact_page.form_subject')}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-950 dark:focus:border-orange-600 focus:ring-0 transition-all outline-none rounded-xl text-sm dark:text-white"
                    placeholder={t('contact_page.form_subject_placeholder')}
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">{t('contact_section.form_message')}</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-950 dark:focus:border-orange-600 focus:ring-0 transition-all outline-none rounded-xl text-sm dark:text-white"
                    placeholder={t('contact_page.form_msg_placeholder')}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full py-6 bg-blue-950 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-900 hover:scale-[1.02] transition-all disabled:bg-slate-300 flex items-center justify-center gap-3 rounded-full shadow-2xl shadow-blue-950/30"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{t('contact_section.form_submit')}</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 bg-slate-50 dark:bg-slate-900 flex items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
        <div className="text-slate-500 dark:text-slate-400 font-medium">{detail}</div>
      </div>
    </div>
  );
}

