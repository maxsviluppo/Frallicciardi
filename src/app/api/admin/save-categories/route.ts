import { NextResponse } from 'next/server';
import { initDb, setCmsData, getCmsData } from '../../../../lib/db';
import { CATEGORIES } from '../../../../data/categories';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { categories } = await req.json();
    
    if (!Array.isArray(categories)) {
      return NextResponse.json({ success: false, error: 'Dati categorie non validi' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      await initDb();
      await setCmsData('categories', categories);
      return NextResponse.json({ success: true, count: categories.length, storage: 'database' });
    }

    console.warn('DATABASE_URL not set. Category changes will not persist.');
    return NextResponse.json({ 
      success: true, 
      count: categories.length,
      storage: 'memory',
      warning: 'DATABASE_URL non configurato. I dati non saranno persistenti.'
    });

  } catch (error: any) {
    console.error('save-categories error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      await initDb();
      const data = await getCmsData('categories');
      if (data) {
        return NextResponse.json({ success: true, categories: data, storage: 'database' });
      }
    }
    
    // Fallback to static data
    return NextResponse.json({ success: true, categories: CATEGORIES, storage: 'static' });
  } catch (error: any) {
    return NextResponse.json({ success: true, categories: CATEGORIES, storage: 'static_fallback' });
  }
}
