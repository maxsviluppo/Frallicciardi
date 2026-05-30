import { NextResponse } from 'next/server';
import { initDb, setCmsData, getCmsData } from '../../../../lib/db';
import { PRODUCTS } from '../../../../data/products';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { products } = await req.json();
    
    if (!Array.isArray(products)) {
      return NextResponse.json({ success: false, error: 'Dati prodotti non validi' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      await initDb();
      await setCmsData('products', products);
      return NextResponse.json({ success: true, count: products.length, storage: 'database' });
    }

    console.warn('DATABASE_URL not set. Product changes will not persist.');
    return NextResponse.json({ 
      success: true, 
      count: products.length,
      storage: 'memory',
      warning: 'DATABASE_URL non configurato. I dati non saranno persistenti.'
    });

  } catch (error: any) {
    console.error('save-products error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      await initDb();
      const data = await getCmsData('products');
      if (data) {
        return NextResponse.json({ success: true, products: data, storage: 'database' });
      }
    }
    
    // Fallback to static data
    return NextResponse.json({ success: true, products: PRODUCTS, storage: 'static' });
  } catch (error: any) {
    return NextResponse.json({ success: true, products: PRODUCTS, storage: 'static_fallback' });
  }
}
