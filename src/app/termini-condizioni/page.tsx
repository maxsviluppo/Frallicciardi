"use client";

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  const termsSections = [
    {
      title: "Oggetto del sito",
      body: "Il sito Frallicciardi presenta l'attivita aziendale, il catalogo prodotti e le lavorazioni in plexiglas, metacrilato, polimeri, accessori, parabrezza, porte scorrevoli e sportelli per il settore nautico. Le informazioni hanno finalita descrittiva e commerciale.",
    },
    {
      title: "Informazioni di catalogo",
      body: "Immagini, descrizioni, materiali e dati tecnici sono forniti per illustrare esempi di lavorazione e prodotti realizzati. Colori, finiture, dimensioni e configurazioni possono variare in base alla disponibilita, alla personalizzazione richiesta e alle caratteristiche dell'imbarcazione.",
    },
    {
      title: "Preventivi e richieste",
      body: "L'invio di una richiesta tramite form, email o telefono non costituisce contratto ne conferma d'ordine. Ogni fornitura, lavorazione o servizio viene definito tramite preventivo, conferma commerciale e accordi specifici tra Frallicciardi e il cliente.",
    },
    {
      title: "Uso corretto del sito",
      body: "L'utente si impegna a utilizzare il sito in modo lecito, evitando comportamenti che possano danneggiare il funzionamento delle pagine, compromettere la sicurezza o trasmettere contenuti falsi, illeciti o non pertinenti.",
    },
    {
      title: "Proprieta dei contenuti",
      body: "Testi, immagini, marchi, loghi, layout e materiali presenti nel sito appartengono a Frallicciardi o ai rispettivi aventi diritto. Non e consentita la riproduzione, distribuzione o modifica dei contenuti senza autorizzazione.",
    },
    {
      title: "Link e servizi esterni",
      body: "Il sito puo includere collegamenti, mappe, contenuti incorporati o servizi di terze parti. Frallicciardi non e responsabile per contenuti, disponibilita o politiche privacy di siti e piattaforme esterne.",
    },
    {
      title: "Limitazione di responsabilita",
      body: "Frallicciardi cura l'aggiornamento delle informazioni pubblicate, ma non garantisce l'assenza assoluta di errori o interruzioni. Per dati tecnici, compatibilita e fattibilita delle lavorazioni e sempre necessario richiedere una conferma diretta.",
    },
    {
      title: "Legge applicabile e contatti",
      body: `I presenti termini sono regolati dalla legge italiana. Per chiarimenti, richieste commerciali o comunicazioni relative al sito e possibile contattare Frallicciardi in ${t('azienda.address', 'Via Ferrante Imparato, 265 - 80146 Napoli (NA) ITALY')}, via email a ${t('azienda.email', 'info@frallicciardi.it')} o telefonicamente ai recapiti indicati nel sito.`,
    },
  ];

  return (
    <div className="pt-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">Frallicciardi</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight mt-4">
            Termini e Condizioni
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-5 leading-relaxed">
            Condizioni generali di utilizzo del sito, del catalogo e delle informazioni pubblicate.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        {termsSections.map((section) => (
          <section key={section.title} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4">{section.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
