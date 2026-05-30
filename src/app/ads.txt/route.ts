import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'locales', 'it.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const locales = JSON.parse(fileData);
    const adsTxtContent = locales.seo?.integrations?.ads_txt || '# Predisposizione Ads.txt';
    
    return new Response(adsTxtContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    return new Response('# Errore nel caricamento di ads.txt', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
