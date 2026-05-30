"use client";

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Tiktok = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 dark:bg-black text-white pt-24 pb-12 px-6 transition-colors rounded-tl-[4rem] lg:rounded-tl-[12rem] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 font-sans">
        {/* Brand */}
        <div className="space-y-6 md:col-span-1">
          <Link href="/" className="flex items-center group">
            <img 
              src="/frallicciardi-logo.pdf.png" 
              alt="FRALLICCIARDI" 
              className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 invert"
            />
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed font-light italic">
            {t('footer.tagline')}
          </p>
          <div className="flex gap-4">
            <a href={t('azienda.social_instagram', '#')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-orange-600 hover:text-white transition-all"><Instagram size={18} /></a>
            <a href={t('azienda.social_facebook', '#')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-orange-600 hover:text-white transition-all"><Facebook size={18} /></a>
            <a href={t('azienda.social_linkedin', '#')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-orange-600 hover:text-white transition-all"><Linkedin size={18} /></a>
            <a href={t('azienda.social_tiktok', '#')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-orange-600 hover:text-white transition-all"><Tiktok size={18} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-orange-600">{t('footer.nav_title')}</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-slate-400 text-sm hover:text-orange-500 transition-colors">{t('nav.home')}</Link></li>
            <li><Link href="/catalogo" className="text-slate-400 text-sm hover:text-orange-500 transition-colors">{t('nav.catalog')}</Link></li>
            <li><Link href="/chi-siamo" className="text-slate-400 text-sm hover:text-orange-500 transition-colors">{t('nav.about')}</Link></li>
            <li><Link href="/contatti" className="text-slate-400 text-sm hover:text-orange-500 transition-colors">{t('nav.contacts')}</Link></li>
          </ul>
        </div>

        {/* Contact Info (Frallicciardi) */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-orange-600">{t('footer.contact_title')}</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin className="text-orange-600 shrink-0" size={20} />
              <span className="text-slate-400 text-sm leading-relaxed">
                {t('azienda.address', 'Via Ferrante Imparato, 265, 80146 Napoli (NA) ITALY')}
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="text-orange-600 shrink-0" size={20} />
              <div className="text-slate-400 text-sm flex flex-col gap-1">
                <a href={`tel:${t('azienda.phone', '+390817528376').replace(/\s+/g, '')}`} className="hover:text-orange-500 transition-colors">
                  {t('azienda.phone', '+39 081 752 8376')}
                </a>
                <a href={`tel:${t('azienda.phone_mobile', '+393397555860').replace(/\s+/g, '')}`} className="hover:text-orange-500 transition-colors">
                  {t('azienda.phone_mobile', '+39 339 75 55 860')}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="text-orange-600 shrink-0" size={20} />
              <a href={`mailto:${t('azienda.email', 'info@frallicciardi.it')}`} className="text-slate-400 text-sm hover:text-orange-500 transition-colors">
                {t('azienda.email', 'info@frallicciardi.it')}
              </a>
            </li>
          </ul>
        </div>

        {/* Request Info (Newsletter / Contact request) */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-orange-600">{t('footer.info_title')}</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-light mb-4">
            {t('footer.info_desc')}
          </p>
          <form className="relative group">
            <input 
              type="email" 
              placeholder={t('footer.info_placeholder')}
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs text-white focus:outline-none focus:border-orange-600 transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors active:scale-90"
            >
              <Mail size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
        <p>
          {t('footer.copyright')} ·{" "}
          <a href="mailto:castromassimo@gmail.com" className="hover:text-orange-600">
            WEBAGENCY - DEVTOOLS
          </a>
          <Link href="/admin" className="inline-flex items-center ml-2 text-slate-500 hover:text-orange-600 transition-colors align-middle" title="Area Amministratore">
            <Shield size={12} className="inline ml-1" />
          </Link>
        </p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-orange-600">{t('footer.privacy')}</Link>
          <Link href="/termini-condizioni" className="hover:text-orange-600">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}
