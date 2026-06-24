import { NextResponse } from 'next/server';
import { initDb, setCmsData, getCmsData } from '../../../../lib/db';

// Static fallback import
import itLocale from '../../../../data/locales/it.json';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { lang, data } = await req.json();
    
    if (!['it', 'en', 'fr', 'de', 'es'].includes(lang)) {
      return NextResponse.json({ success: false, error: 'Lingua non valida' }, { status: 400 });
    }

    // Try to save to Neon DB
    if (process.env.DATABASE_URL) {
      await initDb();
      await setCmsData(`locale_${lang}`, data);
      return NextResponse.json({ success: true, storage: 'database' });
    }

    // Save to local file in development/local environment
    if (process.env.NODE_ENV === 'development' || !process.env.VERCEL) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'locales', `${lang}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return NextResponse.json({ success: true, storage: 'local_file' });
      } catch (fsError: any) {
        console.error('Error writing locale file:', fsError);
      }
    }

    // Fallback: return success but warn no persistence
    console.warn('DATABASE_URL not set. Changes will not persist across deployments.');
    return NextResponse.json({ 
      success: true, 
      storage: 'memory',
      warning: 'DATABASE_URL non configurato. I dati non saranno persistenti. Configura Neon in produzione.'
    });

  } catch (error: any) {
    console.error('save-locales error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'it';

  try {
    if (process.env.DATABASE_URL) {
      await initDb();
      const data = await getCmsData(`locale_${lang}`);
      if (data) {
        return NextResponse.json({ success: true, data, storage: 'database' });
      }
    }
    
    // In local development, try reading the actual file if it exists
    if (process.env.NODE_ENV === 'development' || !process.env.VERCEL) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'locales', `${lang}.json`);
        if (fs.existsSync(filePath)) {
          const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          return NextResponse.json({ success: true, data: fileData, storage: 'local_file' });
        }
      } catch (readError) {
        console.error('Error reading local locale file:', readError);
      }
    }

    // Fallback to static file
    return NextResponse.json({ success: true, data: itLocale, storage: 'static' });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: itLocale, storage: 'static_fallback' });
  }
}
