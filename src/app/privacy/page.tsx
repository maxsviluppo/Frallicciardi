"use client";

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  const privacySections = [
    {
      title: "Informativa utilizzo sito",
      body: "Questa pagina descrive come vengono gestiti i dati personali degli utenti che consultano e utilizzano il sito Frallicciardi. Il trattamento avviene secondo principi di liceita, correttezza, trasparenza e sicurezza, in conformita al GDPR 679/2016 e alla normativa italiana applicabile.",
    },
    {
      title: "Dati personali raccolti",
      body: "Attraverso i moduli di contatto o le richieste inviate spontaneamente possono essere raccolti nominativo, recapito telefonico, indirizzo email e contenuto del messaggio. Questi dati vengono utilizzati per rispondere a richieste di informazioni, preventivi o chiarimenti sui prodotti e sulle lavorazioni nautiche.",
    },
    {
      title: "Titolare del trattamento",
      body: `Il titolare del trattamento e Frallicciardi, con sede in ${t('azienda.address', 'Via Ferrante Imparato, 265 - 80146 Napoli (NA) ITALY')}. Per comunicazioni relative alla privacy e possibile scrivere a ${t('azienda.email', 'info@frallicciardi.it')}. Il responsabile indicato nell'informativa originale e Vincenzo Frallicciardi.`,
    },
    {
      title: "Luogo, destinatari e sicurezza",
      body: "I dati sono trattati presso la sede del titolare e, quando necessario, da personale autorizzato o fornitori tecnici che supportano la gestione del sito, dei sistemi informativi e delle richieste ricevute. I dati non vengono diffusi e possono essere comunicati solo quando richiesto dalla legge o necessario per tutelare un diritto.",
    },
    {
      title: "Tempi di conservazione",
      body: "I dati vengono conservati per il tempo necessario a gestire la richiesta dell'utente, adempiere a obblighi di legge o tutelare i diritti del titolare. L'utente puo chiedere aggiornamento, rettifica o cancellazione dei propri dati scrivendo ai contatti indicati.",
    },
    {
      title: "Diritti dell'interessato",
      body: "L'utente puo esercitare i diritti previsti dagli articoli 15-22 del GDPR, tra cui accesso, rettifica, cancellazione, limitazione, portabilita, opposizione e revoca del consenso. L'interessato ha inoltre diritto di proporre reclamo all'autorita di controllo competente.",
    },
    {
      title: "Minori, link esterni e difesa in giudizio",
      body: `Il sito non offre servizi destinati specificamente ai minori. Eventuali link esterni rimandano a siti non controllati da Frallicciardi, per i quali valgono le rispettive informative. I dati possono essere utilizzati per prevenire abusi o per la difesa in sede giudiziale.`,
    },
    {
      title: "Aggiornamenti",
      body: "Frallicciardi puo aggiornare questa informativa nel tempo. Si consiglia di consultare periodicamente la pagina per verificare eventuali modifiche.",
    },
  ];

  return (
    <div className="pt-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">Frallicciardi</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight mt-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-5 leading-relaxed">
            Informativa sul trattamento dei dati personali per gli utenti del sito e dei moduli di contatto.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        {privacySections.map((section) => (
          <section key={section.title} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4">{section.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
