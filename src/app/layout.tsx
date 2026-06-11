import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { LanguageProvider } from '../context/LanguageContext';
import Script from 'next/script';

import fs from 'fs';
import path from 'path';
import { getCmsData } from '../lib/db';
import itLocaleFallback from '../data/locales/it.json';

async function getLocales() {
  if (process.env.DATABASE_URL) {
    try {
      const data = await getCmsData('locale_it');
      if (data) return data;
    } catch (err) {
      console.error('Error fetching locales from DB in layout:', err);
    }
  }
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'locales', 'it.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Error reading static locales file:', err);
  }
  return itLocaleFallback;
}

export async function generateMetadata() {
  let title = 'Frallicciardi | Lavorazione Plexiglas Nautico';
  let description = 'La ditta Frallicciardi è specializzata nella lavorazione e trasformazione di plexiglas e affini per il settore nautico da oltre 28 anni.';
  let keywords = 'plexiglas, nautica, parabrezza barca, lavorazione plexiglas napoli';
  let favicon = '/favicon (2).png';
  let googleSearchConsole = '';

  const locales = await getLocales();
  if (locales.seo?.global?.title) title = locales.seo.global.title;
  if (locales.seo?.global?.description) description = locales.seo.global.description;
  if (locales.seo?.global?.keywords) keywords = locales.seo.global.keywords;
  if (locales.azienda?.favicon) favicon = locales.azienda.favicon;
  if (locales.seo?.integrations?.google_search_console) googleSearchConsole = locales.seo.integrations.google_search_console;

  return {
    metadataBase: new URL('https://www.frallicciardi.it'),
    title,
    description,
    keywords,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    verification: googleSearchConsole ? {
      google: googleSearchConsole,
    } : undefined,
  };
}

import { ThemeColorProvider } from '../context/ThemeColorContext';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locales = await getLocales();
  
  let googleAnalyticsId = '';
  if (locales.seo?.integrations?.google_analytics) {
    googleAnalyticsId = locales.seo.integrations.google_analytics;
  }

  // Schema.org structured data (JSON-LD) for AI Search Engines & LLMs (RAG)
  const companyAddress = locales.azienda?.address || 'Via Ferrante Imparato, 265 - 80146 Napoli (NA) ITALY';
  const companyEmail = locales.azienda?.email || 'info@frallicciardi.it';
  const companyPhone = locales.azienda?.phone || '+39 081 752 8376';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Frallicciardi",
    "image": "https://www.frallicciardi.it/workshop.jpg",
    "description": locales.seo?.global?.description || "Specializzati nella lavorazione e trasformazione di plexiglas e affini per il settore nautico da oltre 28 anni.",
    "url": "https://www.frallicciardi.it",
    "telephone": companyPhone,
    "email": companyEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyAddress,
      "addressLocality": "Napoli",
      "addressRegion": "NA",
      "postalCode": "80146",
      "addressCountry": "IT"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      locales.azienda?.social_instagram || "#",
      locales.azienda?.social_facebook || "#",
      locales.azienda?.social_linkedin || "#"
    ].filter(link => link && link !== '#')
  };

  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-blue-900 selection:text-white bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <LanguageProvider>
          <ThemeColorProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </ThemeColorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


