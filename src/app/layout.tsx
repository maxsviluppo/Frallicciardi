import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';
import Script from 'next/script';

import fs from 'fs';
import path from 'path';

export async function generateMetadata() {
  let title = 'Frallicciardi | Lavorazione Plexiglas Nautico';
  let description = 'La ditta Frallicciardi è specializzata nella lavorazione e trasformazione di plexiglas e affini per il settore nautico da oltre 28 anni.';
  let keywords = 'plexiglas, nautica, parabrezza barca, lavorazione plexiglas napoli';
  let favicon = '/favicon (2).png';
  let googleSearchConsole = '';

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'locales', 'it.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const locales = JSON.parse(fileData);
    if (locales.seo?.global?.title) title = locales.seo.global.title;
    if (locales.seo?.global?.description) description = locales.seo.global.description;
    if (locales.seo?.global?.keywords) keywords = locales.seo.global.keywords;
    if (locales.azienda?.favicon) favicon = locales.azienda.favicon;
    if (locales.seo?.integrations?.google_search_console) googleSearchConsole = locales.seo.integrations.google_search_console;
  } catch (err) {
    console.error('Error reading dynamic metadata:', err);
  }

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let googleAnalyticsId = '';
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'locales', 'it.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const locales = JSON.parse(fileData);
    if (locales.seo?.integrations?.google_analytics) {
      googleAnalyticsId = locales.seo.integrations.google_analytics;
    }
  } catch (err) {
    console.error('Error reading dynamic analytics ID:', err);
  }

  return (
    <html lang="it" suppressHydrationWarning>
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
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}


