"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("frallicciardi-cookie-consent");
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("frallicciardi-cookie-consent", "accepted");
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("frallicciardi-cookie-consent", "declined");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-4 text-white">
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-orange-600/20 text-orange-500 rounded-xl flex-shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-grow">
            <h4 className="font-sans font-bold text-sm sm:text-base">Informativa sui Cookie</h4>
            <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
              Questo sito utilizza cookie tecnici per garantire una navigazione sicura ed efficiente. Ti informiamo che l'accettazione dei cookie di base per la navigazione <strong>non comporta la trasmissione di alcun dato o informazione personale</strong>.
            </p>
          </div>
          <button 
            onClick={handleDecline}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
            aria-label="Chiudi"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 justify-end pt-2 text-xs sm:text-sm font-sans">
          <Link 
            href="/privacy" 
            className="text-slate-400 hover:text-white transition-colors underline font-medium"
          >
            Leggi la Privacy Policy
          </Link>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-500 transition-all shadow-sm"
          >
            Accetta Cookie
          </button>
        </div>
      </div>
    </div>
  );
}
