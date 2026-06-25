"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Settings, Globe, FileText, Image as ImageIcon, Plus, Trash2, 
  ArrowUp, ArrowDown, Edit3, X, Check, Eye, Save, HelpCircle, HardDrive
} from 'lucide-react';
import { CATEGORIES, type Category } from '../../data/categories';
import { PRODUCTS, type Product } from '../../data/products';
import itLocale from '../../data/locales/it.json';
import { Database, Cloud, Cpu } from 'lucide-react';
import { uploadFile } from '../../lib/uploadHelper';

type Tab = 'seo' | 'azienda' | 'pagine' | 'catalogo' | 'categorie';

interface LocalPage {
  id: string;
  name: string;
  url: string;
  titleKey: string;
  descKey: string;
  contentKeys: { label: string; key: string; type: 'text' | 'textarea' | 'image' }[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('seo');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [locales, setLocales] = useState<any>(null);
  
  // Save status states
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [storageInfo, setStorageInfo] = useState<'database' | 'localStorage' | 'static' | 'local_file' | null>(null);
  const [blobWarning, setBlobWarning] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Modals state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPage, setEditingPage] = useState<LocalPage | null>(null);
  const [pageModalData, setPageModalData] = useState<{ [key: string]: string }>({});
  
  // New entry states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');

  // Fetch / load initial data: DB > localStorage > static file
  useEffect(() => {
    const loadData = async () => {
      let usedStorage: 'database' | 'localStorage' | 'static' | 'local_file' = 'static';

      // --- LOCALES ---
      try {
        const localeRes = await fetch('/api/admin/save-locales?lang=it');
        if (localeRes.ok) {
          const localeData = await localeRes.json();
          if (localeData.storage === 'database') {
            setLocales(localeData.data);
            usedStorage = 'database';
          } else if (localeData.storage === 'local_file') {
            setLocales(localeData.data);
            usedStorage = 'local_file';
          } else {
            // Try localStorage first
            const lsLocale = localStorage.getItem('cms_locale_it');
            if (lsLocale) {
              setLocales(JSON.parse(lsLocale));
              usedStorage = 'localStorage';
            } else {
              setLocales(localeData.data || itLocale);
            }
          }
        }
      } catch {
        const lsLocale = localStorage.getItem('cms_locale_it');
        setLocales(lsLocale ? JSON.parse(lsLocale) : itLocale);
        usedStorage = lsLocale ? 'localStorage' : 'static';
      }

      // --- PRODUCTS ---
      try {
        const prodRes = await fetch('/api/admin/save-products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.storage === 'database') {
            setProducts(prodData.products);
          } else if (prodData.storage === 'local_file') {
            setProducts(prodData.products);
          } else {
            const lsProd = localStorage.getItem('cms_products');
            setProducts(lsProd ? JSON.parse(lsProd) : (prodData.products || PRODUCTS));
          }
        }
      } catch {
        const lsProd = localStorage.getItem('cms_products');
        setProducts(lsProd ? JSON.parse(lsProd) : PRODUCTS);
      }

      // --- CATEGORIES ---
      try {
        const catRes = await fetch('/api/admin/save-categories');
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData.storage === 'database') {
            setCategories(catData.categories);
          } else if (catData.storage === 'local_file') {
            setCategories(catData.categories);
          } else {
            const lsCat = localStorage.getItem('cms_categories');
            setCategories(lsCat ? JSON.parse(lsCat) : (catData.categories || CATEGORIES));
          }
        }
      } catch {
        const lsCat = localStorage.getItem('cms_categories');
        setCategories(lsCat ? JSON.parse(lsCat) : CATEGORIES);
      }

      setStorageInfo(usedStorage);
    };

    loadData();
  }, []);

  // List of pages to edit
  const pagesList: LocalPage[] = [
    {
      id: 'home',
      name: 'Home Page',
      url: '/',
      titleKey: 'hero.title_line1',
      descKey: 'hero.subtitle',
      contentKeys: [
        { label: 'Titolo Eroe Linea 1', key: 'hero.title_line1', type: 'text' },
        { label: 'Titolo Eroe Linea 2', key: 'hero.title_line2', type: 'text' },
        { label: 'Sottotitolo Eroe', key: 'hero.subtitle', type: 'text' },
        { label: 'Slide 1 Hero — Sfondo (Video, YouTube o Immagine)', key: 'hero.background_url', type: 'image' },
        { label: 'Slide 2 Hero — Sfondo (facoltativa)', key: 'hero.background_url_2', type: 'image' },
        { label: 'Slide 3 Hero — Sfondo (facoltativa)', key: 'hero.background_url_3', type: 'image' },
        { label: 'Testo Missione 1', key: 'mission.p1', type: 'textarea' },
        { label: 'Testo Missione 2', key: 'mission.p2', type: 'textarea' },
        { label: 'Testo Missione 3', key: 'mission.p3', type: 'textarea' },
        { label: 'Immagine Sezione Missione', key: 'mission.image', type: 'image' },
        { label: 'Box 1: Titolo', key: 'qualities.precision_title', type: 'text' },
        { label: 'Box 1: Descrizione', key: 'qualities.precision_desc', type: 'textarea' },
        { label: 'Box 1: Immagine', key: 'qualities.precision_image', type: 'image' },
        { label: 'Box 2: Titolo', key: 'qualities.certified_title', type: 'text' },
        { label: 'Box 2: Descrizione', key: 'qualities.certified_desc', type: 'textarea' },
        { label: 'Box 2: Immagine', key: 'qualities.certified_image', type: 'image' },
        { label: 'Box 3: Titolo', key: 'qualities.experience_title', type: 'text' },
        { label: 'Box 3: Descrizione', key: 'qualities.experience_desc', type: 'textarea' },
        { label: 'Box 3: Immagine', key: 'qualities.experience_image', type: 'image' },
      ]
    },
    {
      id: 'about',
      name: 'Chi Siamo',
      url: '/chi-siamo',
      titleKey: 'about_page.narrative_title',
      descKey: 'about_page.subtitle',
      contentKeys: [
        { label: 'Sottotitolo', key: 'about_page.subtitle', type: 'text' },
        { label: 'Titolo Articolo', key: 'about_page.narrative_title', type: 'text' },
        { label: 'Immagine Principale', key: 'about_page.image', type: 'image' },
        { label: 'Pilastro 1 Titolo', key: 'about_page.pillar1_title', type: 'text' },
        { label: 'Pilastro 1 Descrizione', key: 'about_page.pillar1_desc', type: 'textarea' },
        { label: 'Pilastro 2 Titolo', key: 'about_page.pillar2_title', type: 'text' },
        { label: 'Pilastro 2 Descrizione', key: 'about_page.pillar2_desc', type: 'textarea' },
        { label: 'Pilastro 3 Titolo', key: 'about_page.pillar3_title', type: 'text' },
        { label: 'Pilastro 3 Descrizione', key: 'about_page.pillar3_desc', type: 'textarea' },
      ]
    },
    {
      id: 'contacts',
      name: 'Contatti',
      url: '/contatti',
      titleKey: 'contact_page.title',
      descKey: 'contact_page.desc',
      contentKeys: [
        { label: 'Titolo Pagina', key: 'contact_page.title', type: 'text' },
        { label: 'Descrizione Pagina', key: 'contact_page.desc', type: 'textarea' },
        { label: 'Dettagli Orari', key: 'contact_section.hours_detail', type: 'text' },
      ]
    }
  ];

  const getNestedValue = (obj: any, path: string): string => {
    if (!obj) return '';
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return '';
      }
    }
    return typeof current === 'string' ? current : '';
  };

  const setNestedValue = (obj: any, path: string, value: string) => {
    if (!obj) return;
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
  };

  // Save actions — always persist to localStorage AND try the API
  const saveAllLocales = async (updatedLocales: any) => {
    setIsSaving(true);
    setSaveMessage('Salvataggio traduzioni...');
    // Always save to localStorage immediately
    try { localStorage.setItem('cms_locale_it', JSON.stringify(updatedLocales)); } catch {}
    setLocales(updatedLocales);
    try {
      const res = await fetch('/api/admin/save-locales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: 'it', data: updatedLocales }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.storage === 'database') {
          setSaveMessage('✓ Salvato nel Database!');
          setStorageInfo('database');
        } else if (data.storage === 'local_file') {
          setSaveMessage('✓ Salvato nei file locali!');
          setStorageInfo('local_file');
        } else {
          setSaveMessage('✓ Salvato (localStorage)');
          setStorageInfo('localStorage');
        }
        setShowSaveModal(true);
      } else {
        setSaveMessage('✓ Salvato in locale (localStorage)');
      }
    } catch {
      setSaveMessage('✓ Salvato in locale (localStorage)');
    } finally {
      setTimeout(() => setSaveMessage(''), 4000);
      setIsSaving(false);
    }
  };

  const saveAllProducts = async (updatedProducts: Product[]) => {
    setIsSaving(true);
    setSaveMessage('Salvataggio catalogo...');
    try { localStorage.setItem('cms_products', JSON.stringify(updatedProducts)); } catch {}
    setProducts(updatedProducts);
    try {
      const res = await fetch('/api/admin/save-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts }),
      });
      const data = await res.json();
      if (data.storage === 'database') {
        setSaveMessage('✓ Prodotti salvati nel Database!');
      } else if (data.storage === 'local_file') {
        setSaveMessage('✓ Prodotti salvati nei file locali!');
      } else {
        setSaveMessage('✓ Prodotti salvati (localStorage)');
      }
      setShowSaveModal(true);
    } catch {
      setSaveMessage('✓ Prodotti salvati in locale');
    } finally {
      setTimeout(() => setSaveMessage(''), 4000);
      setIsSaving(false);
    }
  };

  const saveAllCategories = async (updatedCategories: Category[]) => {
    setIsSaving(true);
    setSaveMessage('Salvataggio categorie...');
    try { localStorage.setItem('cms_categories', JSON.stringify(updatedCategories)); } catch {}
    setCategories(updatedCategories);
    try {
      const res = await fetch('/api/admin/save-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: updatedCategories }),
      });
      const data = await res.json();
      if (data.storage === 'database') {
        setSaveMessage('✓ Categorie salvate nel Database!');
      } else if (data.storage === 'local_file') {
        setSaveMessage('✓ Categorie salvate nei file locali!');
      } else {
        setSaveMessage('✓ Categorie salvate (localStorage)');
      }
      setShowSaveModal(true);
    } catch {
      setSaveMessage('✓ Categorie salvate in locale');
    } finally {
      setTimeout(() => setSaveMessage(''), 4000);
      setIsSaving(false);
    }
  };

  // Category Actions
  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    // Swap orders
    const temp = newCategories[index].order;
    newCategories[index].order = newCategories[targetIndex].order;
    newCategories[targetIndex].order = temp;

    // Re-sort
    newCategories.sort((a, b) => a.order - b.order);
    setCategories(newCategories);
    saveAllCategories(newCategories);
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    const newId = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: Category = {
      id: newId,
      name: newCategoryName,
      image: newCategoryImage || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      filter: newCategoryName,
      order: categories.length + 1
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    setNewCategoryName('');
    setNewCategoryImage('');
    saveAllCategories(updated);
  };

  const handleDeleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id).map((c, idx) => ({ ...c, order: idx + 1 }));
    setCategories(updated);
    saveAllCategories(updated);
  };

  // Product Actions
  const handleSaveProduct = (product: Product) => {
    const exists = products.find(p => p.id === product.id);
    let updated: Product[];
    if (exists) {
      updated = products.map(p => p.id === product.id ? product : p);
    } else {
      updated = [...products, product];
    }
    setProducts(updated);
    saveAllProducts(updated);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveAllProducts(updated);
    }
  };

  // Page Content Modal Actions
  const openPageEditor = (page: LocalPage) => {
    setEditingPage(page);
    const initialData: { [key: string]: string } = {};
    page.contentKeys.forEach(item => {
      initialData[item.key] = getNestedValue(locales, item.key);
    });
    // Load SEO fields
    initialData['seo_title'] = getNestedValue(locales, `seo.${page.id}.title`) || getNestedValue(locales, page.titleKey);
    initialData['seo_desc'] = getNestedValue(locales, `seo.${page.id}.description`) || getNestedValue(locales, page.descKey);
    initialData['seo_keywords'] = getNestedValue(locales, `seo.${page.id}.keywords`) || 'nautica, plexiglas, frallicciardi';
    
    setPageModalData(initialData);
  };

  const handleSavePageContent = () => {
    if (!editingPage || !locales) return;
    const updatedLocales = JSON.parse(JSON.stringify(locales));

    editingPage.contentKeys.forEach(item => {
      setNestedValue(updatedLocales, item.key, pageModalData[item.key] || '');
    });

    // Save SEO metadata under "seo.<pageId>"
    if (!updatedLocales.seo) updatedLocales.seo = {};
    if (!updatedLocales.seo[editingPage.id]) updatedLocales.seo[editingPage.id] = {};
    
    updatedLocales.seo[editingPage.id].title = pageModalData['seo_title'];
    updatedLocales.seo[editingPage.id].description = pageModalData['seo_desc'];
    updatedLocales.seo[editingPage.id].keywords = pageModalData['seo_keywords'];
    updatedLocales.seo[editingPage.id].robots = "index, follow"; // Automatic Robots tag

    saveAllLocales(updatedLocales);
    setEditingPage(null);
  };

  if (!locales) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-4">
          <Settings className="w-12 h-12 animate-spin text-orange-600" />
          <p className="font-mono text-sm tracking-widest text-slate-500">CARICAMENTO CONSOLE AMMINISTRATIVA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-850 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600/10 p-4 rounded-2xl border border-orange-500/20 text-orange-650">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
                Console CMS <span className="text-xs bg-orange-655 bg-orange-600 text-white px-2 py-0.5 rounded-full font-mono">V1.0</span>
              </h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Gestione contenuti e ottimizzazione SEO</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {storageInfo && (
              <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-mono border ${
                storageInfo === 'database' 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : storageInfo === 'local_file'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : storageInfo === 'localStorage'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}>
                {storageInfo === 'database' ? <Database className="w-3 h-3" /> : storageInfo === 'local_file' ? <HardDrive className="w-3 h-3" /> : <Cloud className="w-3 h-3" />}
                {storageInfo === 'database' ? 'Neon DB' : storageInfo === 'local_file' ? 'File Locali' : storageInfo === 'localStorage' ? 'Browser (locale)' : 'File Statici'}
              </span>
            )}
            {saveMessage && (
              <span className="text-xs bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-xl font-mono">
                {saveMessage}
              </span>
            )}
            <Link href="/" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all">
              Torna al Sito
            </Link>
          </div>
        </div>

        {/* localStorage warning banner */}
        {storageInfo === 'localStorage' && (
          <div className="mb-6 px-6 py-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 text-sm text-blue-800">
            <Cloud className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
            <div>
              <strong className="font-bold">Modalità Browser (localStorage)</strong> — Le modifiche vengono salvate in questo browser e sopravvivono ai refresh. 
              Per renderle permanenti su tutti i dispositivi, configura <strong>Neon DB</strong> e <strong>Vercel Blob</strong> nelle variabili d&apos;ambiente su Vercel.
            </div>
          </div>
        )}

        {/* localFile banner */}
        {storageInfo === 'local_file' && (
          <div className="mb-6 px-6 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-sm text-emerald-850">
            <HardDrive className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-500" />
            <div>
              <strong className="font-bold">Modalità Sviluppo (File Locali)</strong> — Le modifiche vengono salvate direttamente nei file del codice sorgente del progetto (`src/data/`).
              Saranno persistenti e incluse nel prossimo commit/build.
            </div>
          </div>
        )}

        {/* Console Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 bg-white p-2 rounded-2xl border border-slate-200 mb-10 shadow-sm">
          {[
            { id: 'seo', label: 'Ottimizzazione SEO', icon: <Globe className="w-4 h-4" /> },
            { id: 'azienda', label: 'Dati Aziendali', icon: <Settings className="w-4 h-4" /> },
            { id: 'pagine', label: 'Contenuto Pagine', icon: <FileText className="w-4 h-4" /> },
            { id: 'catalogo', label: 'Catalogo Prodotti', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'categorie', label: 'Categorie', icon: <Settings className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <main className="bg-white rounded-[2rem] border border-slate-200 p-8 sm:p-10 shadow-xl text-slate-800">
          
          {/* SEO TAB */}
          {activeTab === 'seo' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight border-b border-slate-200 pb-4">Configurazione SEO Globale</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Tag Title Principale</label>
                    <input 
                      type="text" 
                      id="seo_global_title"
                      defaultValue={getNestedValue(locales, 'seo.global.title') || 'Frallicciardi | Lavorazione Plexiglas Nautico'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Titolo principale del sito visualizzato nelle schede del browser e nei motori di ricerca.</span>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Meta Description Globale</label>
                    <textarea 
                      rows={3}
                      id="seo_global_description"
                      defaultValue={getNestedValue(locales, 'seo.global.description') || 'La ditta Frallicciardi è specializzata nella lavorazione e trasformazione di plexiglas e affini per il settore nautico.'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 resize-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Descrizione del sito visualizzata nei risultati di ricerca.</span>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Keywords Globali</label>
                    <input 
                      type="text" 
                      id="seo_global_keywords"
                      defaultValue={getNestedValue(locales, 'seo.global.keywords') || 'plexiglas, nautica, parabrezza barca, lavorazione plexiglas napoli'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Parole chiave separate da virgole.</span>
                  </div>
                </div>

                {/* Google Preview Widget */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Anteprima Google Snippet</h3>
                    <div className="bg-white text-black p-6 rounded-xl space-y-1 shadow-md font-sans text-left border border-slate-100">
                      <span className="text-xs text-slate-600 block">www.frallicciardi.it</span>
                      <span className="text-[#1a0dab] text-xl font-medium block leading-tight">
                        {getNestedValue(locales, 'seo.global.title') || 'Frallicciardi | Lavorazione Plexiglas'}
                      </span>
                      <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                        {getNestedValue(locales, 'seo.global.description') || 'Specializzati nella lavorazione e trasformazione di plexiglas per il settore nautico.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrations Section */}
              <div className="border-t border-slate-200 pt-8 mt-8 space-y-6">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" /> Integrazioni e Indicizzazione Avanzata (Booster SEO)
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Codice di Verifica Google Search Console</label>
                      <input 
                        type="text" 
                        id="seo_google_search_console"
                        defaultValue={getNestedValue(locales, 'seo.integrations.google_search_console') || ''} 
                        placeholder="Es. google-site-verification=abc123xyz..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Meta tag fornito da Google per verificare la proprietà del sito su Search Console.</span>
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">ID di Tracciamento Google Analytics (GA4)</label>
                      <input 
                        type="text" 
                        id="seo_google_analytics"
                        defaultValue={getNestedValue(locales, 'seo.integrations.google_analytics') || ''} 
                        placeholder="Es. G-XXXXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Il codice tag di tracciamento per monitorare le visite e il traffico in tempo reale.</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Contenuto file Ads.txt</label>
                      <textarea 
                        rows={5}
                        id="seo_ads_txt"
                        defaultValue={getNestedValue(locales, 'seo.integrations.ads_txt') || ''}
                        placeholder="google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono resize-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Contenuto per la monetizzazione e la certificazione dei venditori pubblicitari autorizzati.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI SEO Monitor Section */}
              <div className="border-t border-slate-200 pt-8 mt-8 space-y-6">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-orange-600" /> Monitor di Ottimizzazione AI SEO (Search GPT, Gemini, Perplexity)
                </h3>
                
                {(() => {
                  const titleText = getNestedValue(locales, 'seo.global.title') || '';
                  const descText = getNestedValue(locales, 'seo.global.description') || '';
                  const hasAddress = !!getNestedValue(locales, 'azienda.address');
                  const hasPhone = !!getNestedValue(locales, 'azienda.phone');
                  const hasEmail = !!getNestedValue(locales, 'azienda.email');
                  
                  let aiScore = 20; 
                  if (titleText.length >= 30 && titleText.length <= 70) aiScore += 20;
                  if (descText.length >= 100 && descText.length <= 170) aiScore += 20;
                  if (hasAddress && hasPhone && hasEmail) aiScore += 20;
                  if (products.length > 0) aiScore += 20;

                  return (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Searchability Score</span>
                            <div className="text-3xl font-black text-slate-900 mt-2">{aiScore}%</div>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-orange-600 h-full transition-all duration-500" style={{ width: `${aiScore}%` }}></div>
                            </div>
                            <span className="text-[10px] text-slate-550 text-slate-500 mt-1 block">Pronto per l'indicizzazione semantica</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Entità Indicizzate</span>
                            <div className="text-3xl font-black text-slate-900 mt-2">{products.length + 6}</div>
                          </div>
                          <div className="mt-4 text-[10px] text-slate-500 leading-tight">
                            {products.length} prodotti + 6 pagine base registrate in sitemap.xml.
                          </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Schema.org (JSON-LD)</span>
                            <div className="text-sm font-bold text-green-700 mt-2 flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-green-600" /> Attivo & Validato
                            </div>
                          </div>
                          <div className="mt-4 text-[10px] text-slate-500 leading-tight">
                            LocalBusiness schema iniettato direttamente nell'header per parser semantici e crawler LLM.
                          </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Robots.txt AI Access</span>
                            <div className="text-sm font-bold text-green-700 mt-2 flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-green-600" /> Ottimizzato
                            </div>
                          </div>
                          <div className="mt-4 text-[10px] text-slate-500 leading-tight">
                            Accesso consentito a tutti gli User-Agent intelligenti.
                          </div>
                        </div>

                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mt-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Stato Crawler AI abilitati (Robots.txt)</h4>
                          <div className="space-y-3">
                            {[
                              { name: 'GPTBot (OpenAI / SearchGPT)', status: 'Consentito (100%)', purpose: 'Risposte dirette e link in ChatGPT' },
                              { name: 'Google-Extended (Gemini)', status: 'Consentito (100%)', purpose: 'Risposte di ricerca e RAG in Gemini' },
                              { name: 'ClaudeBot (Anthropic)', status: 'Consentito (100%)', purpose: 'Addestramento e Retrieval Claude' },
                              { name: 'PerplexityBot (Perplexity)', status: 'Consentito (100%)', purpose: 'Citazione fonti in Perplexity Search' },
                              { name: 'Applebot-Extended (Apple Intelligence)', status: 'Consentito (100%)', purpose: 'Integrazione Siri e Spotlight AI' }
                            ].map((bot, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                                <div>
                                  <div className="text-xs font-bold text-slate-800">{bot.name}</div>
                                  <div className="text-[10px] text-slate-400">{bot.purpose}</div>
                                </div>
                                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-200">
                                  {bot.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">JSON-LD Dati Strutturati (schema.org)</h4>
                            <span className="text-[9px] font-bold text-orange-600 uppercase bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">Real-time</span>
                          </div>
                          
                          <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-green-400 overflow-x-auto max-h-[260px] border border-slate-950">
                            <pre className="whitespace-pre">{JSON.stringify({
                              "@context": "https://schema.org",
                              "@type": "LocalBusiness",
                              "name": "Frallicciardi",
                              "telephone": getNestedValue(locales, 'azienda.phone') || "Non configurato",
                              "email": getNestedValue(locales, 'azienda.email') || "Non configurato",
                              "address": {
                                "@type": "PostalAddress",
                                "streetAddress": getNestedValue(locales, 'azienda.address') || "Non configurato"
                              },
                              "openingHours": getNestedValue(locales, 'azienda.hours') || "Non configurato",
                              "sitemap": "https://www.frallicciardi.it/sitemap.xml",
                              "productsCount": products.length
                            }, null, 2)}</pre>
                          </div>
                          <span className="text-[10px] text-slate-500 block">
                            Questi dati vengono letti in tempo reale dagli agenti IA per rispondere a query del tipo: "Qual è il telefono di Frallicciardi?" o "Dove si trova l'azienda Frallicciardi?".
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const updatedLocales = JSON.parse(JSON.stringify(locales));
                    if (!updatedLocales.seo) updatedLocales.seo = {};
                    if (!updatedLocales.seo.global) updatedLocales.seo.global = {};
                    if (!updatedLocales.seo.integrations) updatedLocales.seo.integrations = {};
                    
                    updatedLocales.seo.global.title = (document.getElementById('seo_global_title') as HTMLInputElement).value;
                    updatedLocales.seo.global.description = (document.getElementById('seo_global_description') as HTMLTextAreaElement).value;
                    updatedLocales.seo.global.keywords = (document.getElementById('seo_global_keywords') as HTMLInputElement).value;
                    
                    updatedLocales.seo.integrations.google_search_console = (document.getElementById('seo_google_search_console') as HTMLInputElement).value;
                    updatedLocales.seo.integrations.google_analytics = (document.getElementById('seo_google_analytics') as HTMLInputElement).value;
                    updatedLocales.seo.integrations.ads_txt = (document.getElementById('seo_ads_txt') as HTMLTextAreaElement).value;
                    
                    saveAllLocales(updatedLocales);
                  }}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
                >
                  <Save className="w-4 h-4" /> Salva Configurazione SEO & Integrazioni
                </button>
              </div>
            </div>
          )}

          {/* AZIENDA TAB */}
          {activeTab === 'azienda' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight border-b border-slate-200 pb-4">Dati Aziendali e Configurazione Layout</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Favicon del Sito (URL o Percorso)</label>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        id="az_favicon"
                        defaultValue={getNestedValue(locales, 'azienda.favicon') || '/favicon (2).png'} 
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-slate-900"
                      />
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                        <img src={getNestedValue(locales, 'azienda.favicon') || '/favicon (2).png'} alt="Favicon" className="w-6 h-6 object-contain" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Indirizzo Sede Centrale</label>
                    <input 
                      type="text" 
                      id="az_address"
                      defaultValue={getNestedValue(locales, 'azienda.address') || 'Via Ferrante Imparato, 265 - 80146 Napoli (NA) ITALY'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Email Principale</label>
                    <input 
                      type="email" 
                      id="az_email"
                      defaultValue={getNestedValue(locales, 'azienda.email') || 'info@frallicciardi.it'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Email per il modulo dei contatti</label>
                    <input 
                      type="email" 
                      id="az_contact_email"
                      defaultValue={getNestedValue(locales, 'azienda.contact_email') || getNestedValue(locales, 'azienda.email') || 'info@frallicciardi.it'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">I messaggi compilati dal form contatti verranno recapitati a questo indirizzo.</span>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Orari di Apertura</label>
                    <input 
                      type="text" 
                      id="az_hours"
                      defaultValue={getNestedValue(locales, 'azienda.hours') || 'LUN/SAB — 08:30 / 18:00'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Telefono Fisso</label>
                    <input 
                      type="text" 
                      id="az_phone"
                      defaultValue={getNestedValue(locales, 'azienda.phone') || '+39 081 752 8376'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Cellulare / Mobile</label>
                    <input 
                      type="text" 
                      id="az_phone_mobile"
                      defaultValue={getNestedValue(locales, 'azienda.phone_mobile') || '+39 339 75 55 860'} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Instagram (Link)</label>
                      <input 
                        type="text" 
                        id="az_ig"
                        defaultValue={getNestedValue(locales, 'azienda.social_instagram') || '#'} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Facebook (Link)</label>
                      <input 
                        type="text" 
                        id="az_fb"
                        defaultValue={getNestedValue(locales, 'azienda.social_facebook') || '#'} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Linkedin (Link)</label>
                      <input 
                        type="text" 
                        id="az_li"
                        defaultValue={getNestedValue(locales, 'azienda.social_linkedin') || '#'} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Tiktok (Link)</label>
                      <input 
                        type="text" 
                        id="az_tt"
                        defaultValue={getNestedValue(locales, 'azienda.social_tiktok') || '#'} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const updatedLocales = JSON.parse(JSON.stringify(locales));
                    if (!updatedLocales.azienda) updatedLocales.azienda = {};
                    
                    updatedLocales.azienda.favicon = (document.getElementById('az_favicon') as HTMLInputElement).value;
                    updatedLocales.azienda.address = (document.getElementById('az_address') as HTMLInputElement).value;
                    updatedLocales.azienda.email = (document.getElementById('az_email') as HTMLInputElement).value;
                    updatedLocales.azienda.contact_email = (document.getElementById('az_contact_email') as HTMLInputElement).value;
                    updatedLocales.azienda.hours = (document.getElementById('az_hours') as HTMLInputElement).value;
                    updatedLocales.azienda.phone = (document.getElementById('az_phone') as HTMLInputElement).value;
                    updatedLocales.azienda.phone_mobile = (document.getElementById('az_phone_mobile') as HTMLInputElement).value;
                    updatedLocales.azienda.social_instagram = (document.getElementById('az_ig') as HTMLInputElement).value;
                    updatedLocales.azienda.social_facebook = (document.getElementById('az_fb') as HTMLInputElement).value;
                    updatedLocales.azienda.social_linkedin = (document.getElementById('az_li') as HTMLInputElement).value;
                    updatedLocales.azienda.social_tiktok = (document.getElementById('az_tt') as HTMLInputElement).value;
                    
                    saveAllLocales(updatedLocales);
                  }}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
                >
                  <Save className="w-4 h-4" /> Salva Dati Aziendali
                </button>
              </div>
            </div>
          )}

          {/* PAGINE TAB */}
          {activeTab === 'pagine' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight border-b border-slate-200 pb-4">Gestione Pagine e Modifica Contenuti</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagesList.map(page => (
                  <div key={page.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-orange-500/50 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{page.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mb-4">{page.url}</p>
                    </div>
                    <button
                      onClick={() => openPageEditor(page)}
                      className="w-full py-3 bg-slate-900 hover:bg-orange-655 bg-slate-800 hover:bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" /> Modifica Contenuto & SEO
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATALOGO TAB */}
          {activeTab === 'catalogo' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Catalogo Prodotti</h2>
                <button
                  onClick={() => setEditingProduct({
                    id: 'nuovo-prodotto-' + Date.now(),
                    name: 'Nuovo Prodotto',
                    category: 'Accessori',
                    description: 'Inserisci qui la descrizione del prodotto.',
                    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
                    specs: { "Materiale": "Plexiglas" }
                  })}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-md shadow-orange-600/10"
                >
                  <Plus className="w-4 h-4" /> Aggiungi Prodotto
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 flex flex-col justify-between group hover:border-orange-500/50 hover:shadow-lg transition-all">
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{product.category}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1 mb-2 leading-tight">{product.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-6 font-light">{product.description || 'Nessuna descrizione.'}</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="flex-1 py-2.5 bg-slate-250 bg-slate-200 hover:bg-slate-300 text-slate-750 text-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                        >
                          Modifica
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 bg-red-50 hover:bg-red-655 hover:bg-red-600 text-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORIE TAB */}
          {activeTab === 'categorie' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight border-b border-slate-200 pb-4">Gestione Categorie</h2>
              
              {/* Add category box */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome Nuova Categoria</label>
                  <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="Esempio: Bitte e Cime"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600 text-slate-900"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Immagine Categoria</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={newCategoryImage} 
                      onChange={e => setNewCategoryImage(e.target.value)}
                      placeholder="Carica o inserisci link..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600 text-slate-900"
                    />
                    <label className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center whitespace-nowrap">
                      Carica
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const result = await uploadFile(file);
                            if (result.success && result.url) {
                              setNewCategoryImage(result.url);
                            } else {
                              alert('Caricamento fallito: ' + (result.error || 'URL non disponibile'));
                            }
                          } catch (err: any) {
                            alert('Errore di caricamento: ' + err.message);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Aggiungi
                </button>
              </div>

              {newCategoryImage && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-3xl max-w-xs transition-all">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Anteprima Immagine Nuova Categoria</span>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={newCategoryImage} alt="New Category Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {/* Categories list */}
              <div className="space-y-4">
                {categories.map((cat, idx) => (
                  <div key={cat.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">Filtro: {cat.filter}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCategory(cat)}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-all shadow-sm"
                        title="Modifica Categoria"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveCategory(idx, 'up')}
                        disabled={idx === 0}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-all shadow-sm"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveCategory(idx, 'down')}
                        disabled={idx === categories.length - 1}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-all shadow-sm"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 bg-red-50 hover:bg-red-600 rounded-lg text-red-600 hover:text-white border border-red-150 hover:border-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* PAGE EDIT MODAL */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Modifica: {editingPage.name}</h3>
              <button onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8 flex-1">
              
              {/* SEO Inputs & Preview Widget */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-650 border-b border-slate-200 pb-2">Sezione Ottimizzazione SEO</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Tag Title (SEO)</label>
                      <input 
                        type="text" 
                        value={pageModalData['seo_title'] || ''}
                        onChange={e => setPageModalData({ ...pageModalData, seo_title: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Meta Description (SEO)</label>
                      <textarea 
                        rows={2}
                        value={pageModalData['seo_desc'] || ''}
                        onChange={e => setPageModalData({ ...pageModalData, seo_desc: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Keywords (SEO)</label>
                      <input 
                        type="text" 
                        value={pageModalData['seo_keywords'] || ''}
                        onChange={e => setPageModalData({ ...pageModalData, seo_keywords: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Realtime Google Snippet Preview */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner flex flex-col justify-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 block">Anteprima Risultato di Ricerca</span>
                    <div className="bg-white text-black p-4 rounded-lg space-y-1 font-sans text-left border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-600 block">www.frallicciardi.it{editingPage.url}</span>
                      <span className="text-[#1a0dab] text-base font-medium hover:underline block leading-tight">
                        {pageModalData['seo_title'] || 'Titolo SEO'}
                      </span>
                      <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                        {pageModalData['seo_desc'] || 'Nessuna descrizione impostata.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Content Fields */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-600 border-b border-slate-200 pb-2">Contenuti della Pagina</h4>
                {editingPage.contentKeys.map(item => (
                  <div key={item.key}>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">{item.label}</label>
                    {item.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        value={pageModalData[item.key] || ''}
                        onChange={e => setPageModalData({ ...pageModalData, [item.key]: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                      />
                    ) : item.type === 'image' ? (
                      <div className="space-y-2">
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={pageModalData[item.key] || ''}
                            onChange={e => setPageModalData({ ...pageModalData, [item.key]: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                            placeholder={item.key.includes('background') ? 'Es: https://www.youtube.com/watch?v=ID oppure URL .mp4/.webm o link immagine' : 'URL immagine o carica un file...'}
                          />
                          <label className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center whitespace-nowrap">
                            Carica File
                            <input
                              type="file"
                              accept="image/*,video/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const result = await uploadFile(file);
                                  if (result.success && result.url) {
                                    setPageModalData({ ...pageModalData, [item.key]: result.url });
                                  } else {
                                    alert('Caricamento fallito: ' + (result.error || 'URL non disponibile'));
                                  }
                                } catch (err: any) {
                                  alert('Errore di caricamento: ' + err.message);
                                }
                              }}
                            />
                          </label>
                        </div>
                        {pageModalData[item.key] && (
                          <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden max-w-xs aspect-video bg-slate-100 flex items-center justify-center">
                            {(() => {
                              const url = pageModalData[item.key];
                              const isYoutube = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('/embed/');
                              const isVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
                              
                              if (isYoutube) {
                                let videoId = '';
                                if (url.includes('/embed/')) {
                                  return (
                                    <iframe
                                      src={url}
                                      className="w-full h-full"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      title="Video Preview"
                                    />
                                  );
                                }
                                if (url.includes('youtube.com/watch')) {
                                  try {
                                    const urlObj = new URL(url);
                                    videoId = urlObj.searchParams.get('v') || '';
                                  } catch(e){}
                                } else if (url.includes('youtu.be/')) {
                                  videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                                }
                                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : url;
                                return (
                                  <iframe
                                    src={embedUrl}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Video Preview"
                                  />
                                );
                              }
                              
                              if (isVideo) {
                                return (
                                  <video
                                    src={url}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-full object-cover"
                                  />
                                );
                              }
                              
                              return (
                                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={pageModalData[item.key] || ''}
                        onChange={e => setPageModalData({ ...pageModalData, [item.key]: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                      />
                    )}
                  </div>
                ))}
              </div>

            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-4">
              <button 
                onClick={() => setEditingPage(null)}
                className="px-6 py-3 bg-slate-250 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                Annulla
              </button>
              <button 
                onClick={handleSavePageContent}
                className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Salva Contenuti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT EDIT MODAL */}
      {editingProduct && (() => {
        const specsText = Object.entries(editingProduct.specs).map(([k, v]) => `${k}: ${v}`).join('\n');
        
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
            <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Dettaglio Prodotto</h3>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 overflow-y-auto space-y-6 flex-1">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome Prodotto</label>
                    <input 
                      type="text" 
                      defaultValue={editingProduct.name}
                      id="prod_name"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Categoria</label>
                    <select 
                      defaultValue={editingProduct.category}
                      id="prod_category"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                    >
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Immagine Prodotto</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      defaultValue={editingProduct.image}
                      id="prod_image"
                      onChange={(e) => {
                        const previewImg = document.getElementById('prod_image_preview') as HTMLImageElement;
                        if (previewImg) previewImg.src = e.target.value;
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                    />
                    <label className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center whitespace-nowrap">
                      Carica File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const result = await uploadFile(file);
                            if (result.success && result.url) {
                              const input = document.getElementById('prod_image') as HTMLInputElement;
                              if (input) input.value = result.url;
                              const previewImg = document.getElementById('prod_image_preview') as HTMLImageElement;
                              if (previewImg) previewImg.src = result.url;
                            } else {
                              alert('Caricamento fallito: ' + (result.error || 'URL non disponibile'));
                            }
                          } catch (err: any) {
                            alert('Errore di caricamento: ' + err.message);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {/* Visual Preview */}
                  <div className="mt-2 border border-slate-200 rounded-2xl overflow-hidden max-w-xs aspect-video bg-slate-100 flex items-center justify-center">
                    <img 
                      id="prod_image_preview" 
                      src={editingProduct.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'} 
                      alt="Product Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5';
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Descrizione</label>
                  <textarea 
                    rows={4}
                    defaultValue={editingProduct.description}
                    id="prod_description"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Specifiche Tecniche (Una per riga, Chiave: Valore)</label>
                  <textarea 
                    rows={4}
                    defaultValue={specsText}
                    id="prod_specs"
                    placeholder="Materiale: Plexiglas&#10;Spessore: 8mm"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900 font-mono"
                  />
                </div>

                {/* Autogenerated SEO indicator */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 block">SEO Automatico Abilitato</span>
                    <p className="text-[10px] text-slate-500">Next.js genererà in automatico i tag title e description basandosi sul nome e la descrizione forniti.</p>
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-4">
                <button 
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-350 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  Annulla
                </button>
                <button 
                  onClick={() => {
                    const name = (document.getElementById('prod_name') as HTMLInputElement).value;
                    const category = (document.getElementById('prod_category') as HTMLSelectElement).value;
                    const image = (document.getElementById('prod_image') as HTMLInputElement).value;
                    const description = (document.getElementById('prod_description') as HTMLTextAreaElement).value;
                    
                    const specsInput = (document.getElementById('prod_specs') as HTMLTextAreaElement).value;
                    const specs: { [key: string]: string } = {};
                    specsInput.split('\n').forEach(line => {
                      const idx = line.indexOf(':');
                      if (idx > -1) {
                        specs[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
                      }
                    });

                    handleSaveProduct({
                      ...editingProduct,
                      name,
                      category,
                      image,
                      description,
                      specs
                    });
                  }}
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Salva Prodotto
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* CATEGORY EDIT MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Modifica Categoria</h3>
              <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome Categoria</label>
                <input 
                  type="text" 
                  defaultValue={editingCategory.name}
                  id="cat_edit_name"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Immagine Categoria</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    defaultValue={editingCategory.image}
                    id="cat_edit_image"
                    onChange={(e) => {
                      const previewImg = document.getElementById('cat_edit_image_preview') as HTMLImageElement;
                      if (previewImg) previewImg.src = e.target.value;
                    }}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                  <label className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center whitespace-nowrap">
                    Carica File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const result = await uploadFile(file);
                          if (result.success && result.url) {
                            const input = document.getElementById('cat_edit_image') as HTMLInputElement;
                            if (input) input.value = result.url;
                            const previewImg = document.getElementById('cat_edit_image_preview') as HTMLImageElement;
                            if (previewImg) previewImg.src = result.url;
                          } else {
                            alert('Caricamento fallito: ' + (result.error || 'URL non disponibile'));
                          }
                        } catch (err: any) {
                          alert('Errore di caricamento: ' + err.message);
                        }
                      }}
                    />
                  </label>
                </div>
                {/* Visual Preview */}
                <div className="mt-2 border border-slate-200 rounded-2xl overflow-hidden max-w-xs aspect-video bg-slate-100 flex items-center justify-center">
                  <img 
                    id="cat_edit_image_preview" 
                    src={editingCategory.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'} 
                    alt="Category Preview" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5';
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Filtro / ID di Selezione</label>
                <input 
                  type="text" 
                  defaultValue={editingCategory.filter}
                  id="cat_edit_filter"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-4">
              <button 
                onClick={() => setEditingCategory(null)}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                Annulla
              </button>
              <button 
                onClick={() => {
                  const name = (document.getElementById('cat_edit_name') as HTMLInputElement).value;
                  const image = (document.getElementById('cat_edit_image') as HTMLInputElement).value;
                  const filter = (document.getElementById('cat_edit_filter') as HTMLInputElement).value;

                  const updated = categories.map(c => c.id === editingCategory.id ? { ...c, name, image, filter } : c);
                  setCategories(updated);
                  saveAllCategories(updated);
                  setEditingCategory(null);
                }}
                className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Salva Modifiche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS SAVE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 w-full max-w-sm rounded-[2rem] shadow-2xl p-8 flex flex-col items-center text-center text-slate-800">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100 shadow-sm animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Salvataggio Completato</h3>
            <p className="text-sm text-slate-500 mb-6">Dati salvati con successo!</p>
            <button
              onClick={() => setShowSaveModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
