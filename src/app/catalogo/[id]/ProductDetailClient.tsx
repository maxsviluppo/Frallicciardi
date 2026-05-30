"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Mail, Info } from 'lucide-react';
import { PRODUCTS } from '../../../data/products';
import { useLanguage, type Language } from '../../../context/LanguageContext';

export default function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const product = PRODUCTS.find(p => p.id === id);

  const getProductTranslationKey = (id: string) => {
    if (id.includes('anchor')) return 'anchor';
    if (id.includes('propeller')) return 'propeller';
    if (id.includes('fender')) return 'fender';
    if (id.includes('gps')) return 'gps';
    return '';
  };

  const specKeyTranslations: { [key: string]: string } = {
    "Materiale": "spec_material",
    "Peso": "spec_weight",
    "Compatibilità": "spec_compat",
    "Diametro": "spec_diam",
    "Passo": "spec_pass",
    "Pale": "spec_pale",
    "Lunghezza": "spec_length",
    "Colore": "spec_color",
    "Display": "spec_display",
    "Risoluzione": "spec_res",
    "Impermeabilità": "spec_water"
  };

  const specLabels: { [key: string]: { [lang in Language]: string } } = {
    "Materiale": { it: "Materiale", en: "Material", fr: "Matériel", de: "Material", es: "Material" },
    "Peso": { it: "Peso", en: "Weight", fr: "Poids", de: "Gewicht", es: "Peso" },
    "Compatibilità": { it: "Compatibilità", en: "Compatibility", fr: "Compatibilité", de: "Kompatibilité", es: "Compatibilidad" },
    "Diametro": { it: "Diametro", en: "Diameter", fr: "Diamètre", de: "Durchmesser", es: "Diámetro" },
    "Passo": { it: "Passo", en: "Pitch", fr: "Pas", de: "Steigung", es: "Paso" },
    "Pale": { it: "Pale", en: "Blades", fr: "Pales", de: "Flügel", es: "Palas" },
    "Lunghezza": { it: "Lunghezza", en: "Length", fr: "Longueur", de: "Länge", es: "Longitud" },
    "Colore": { it: "Colore", en: "Color", fr: "Couleur", de: "Farbe", es: "Color" },
    "Display": { it: "Display", en: "Display", fr: "Écran", de: "Bildschirm", es: "Pantalla" },
    "Risoluzione": { it: "Risoluzione", en: "Resolution", fr: "Résolution", de: "Auflösung", es: "Resolución" },
    "Impermeabilità": { it: "Impermeabilità", en: "Waterproofing", fr: "Étanchéité", de: "Wasserdichtigkeit", es: "Impermeabilidad" }
  };

  const detailTranslations = {
    back: { it: "Indietro", en: "Back", fr: "Retour", de: "Zurück", es: "Atrás" },
    not_found: { it: "Prodotto non trovato", en: "Product not found", fr: "Produit non trouvé", de: "Produkt nicht gefunden", es: "Producto no encontrado" },
    back_to_catalog: { it: "Torna al catalogo", en: "Back to catalog", fr: "Retour au catalogue", de: "Zurück zum Katalog", es: "Volver al catálogo" },
    tech_details: { it: "Dettagli Tecnici", en: "Technical Details", fr: "Détails Techniques", de: "Technische Details", es: "Detalles Técnicos" },
    status_available: { it: "Status: Disponibile", en: "Status: Available", fr: "Statut: Disponible", de: "Status: Verfügbar", es: "Estado: Disponible" },
    status_desc: {
      it: "Disponibile per spedizione immediata in 24/48h. Contatta il nostro ufficio tecnico per schemi di montaggio.",
      en: "Available for immediate shipping in 24/48h. Contact our technical office for mounting diagrams.",
      fr: "Disponible pour expédition immédiate en 24/48h. Contactez notre bureau technique pour les schémas de montage.",
      de: "Verfügbar für sofortigen Versand in 24/48h. Wenden Sie sich an unsere technische Abteilung für Montagepläne.",
      es: "Disponible para envío inmediato en 24/48h. Contacte con nuestra oficina técnica para esquemas de montaje."
    },
    req_quote: { it: "Richiedi Preventivo", en: "Request Quote", fr: "Demander un devis", de: "Angebot anfordern", es: "Solicitar presupuesto" }
  };

  if (!product) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{detailTranslations.not_found[language] || detailTranslations.not_found['it']}</h2>
          <Link href="/catalogo" className="text-blue-900 font-bold hover:underline">
            {detailTranslations.back_to_catalog[language] || detailTranslations.back_to_catalog['it']}
          </Link>
        </div>
      </div>
    );
  }

  const translationKey = getProductTranslationKey(product.id);
  const name = translationKey ? t(`products.${translationKey}.name`) : product.name;
  const categoryKey = translationKey ? t(`products.${translationKey}.category`) : product.category;
  const description = translationKey ? t(`products.${translationKey}.description`) : product.description;

  return (
    <div className="pt-24 pb-24 bg-white dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-semibold uppercase text-xs tracking-widest">
              {detailTranslations.back[language] || detailTranslations.back['it']}
            </span>
          </button>
          
          <Link 
            href="/catalogo"
            className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors font-semibold uppercase text-xs tracking-widest"
          >
            {language === 'it' ? 'Chiudi' : 'Close'} <span className="text-lg leading-none">&times;</span>
          </Link>
        </div>

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
                alt={name}
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
              {categoryKey}
            </span>
            <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-none mb-6">
              {name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 font-light">
              {description}
            </p>

            <div className="space-y-8 mb-12">
              <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-6">
                  <Info size={14} /> {detailTranslations.tech_details[language] || detailTranslations.tech_details['it']}
                </h3>
                  <div className="grid gap-4">
                    {Object.entries(product.specs).map(([key, value]) => {
                      const specKey = specKeyTranslations[key];
                      const translatedKeyLabel = specLabels[key]?.[language] || key;
                      const translatedValue = specKey && translationKey ? t(`products.${translationKey}.${specKey}`) : value;
                      
                      return (
                        <div key={key} className="flex justify-between items-center py-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all px-2 md:rounded-lg group relative">
                          <span className="text-slate-500 dark:text-slate-500 text-xs uppercase font-bold tracking-widest">{translatedKeyLabel}</span>
                          <div className="relative group/tooltip">
                            <span className="text-slate-900 dark:text-white font-extrabold text-sm tracking-tight cursor-help">{translatedValue}</span>
                            
                            {/* Tooltip */}
                            <motion.div 
                              className="absolute bottom-full mb-2 right-0 pointer-events-none z-50 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 translate-y-2 group-hover/tooltip:translate-y-0"
                            >
                              <div className="bg-slate-900 dark:bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap">
                                {translatedKeyLabel}: {translatedValue}
                              </div>
                              <div className="w-2 h-2 bg-slate-900 dark:bg-orange-600 rotate-45 mx-auto -mt-1 absolute right-6" />
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
              </div>

              <div className="bg-blue-950 p-8 rounded-3xl text-white shadow-2xl shadow-blue-950/20">
                <h4 className="font-extrabold text-orange-500 mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <CheckCircle size={16} /> {detailTranslations.status_available[language] || detailTranslations.status_available['it']}
                </h4>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {detailTranslations.status_desc[language] || detailTranslations.status_desc['it']}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Link 
                href="/contatti"
                className="flex-1 py-5 bg-blue-950 text-white font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-blue-900 hover:scale-[1.02] transition-all rounded-full flex items-center justify-center gap-3 shadow-2xl shadow-blue-950/30"
              >
                <Mail size={18} /> {detailTranslations.req_quote[language] || detailTranslations.req_quote['it']}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
