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

    // Save to local file in development/local environment
    if (process.env.NODE_ENV === 'development' || !process.env.VERCEL) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'products.ts');
        const fileContent = `export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: { [key: string]: string };
}

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;
        fs.writeFileSync(filePath, fileContent, 'utf-8');
        return NextResponse.json({ success: true, count: products.length, storage: 'local_file' });
      } catch (fsError: any) {
        console.error('Error writing products file:', fsError);
      }
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
    
    // In local development, try reading the actual file if it exists
    if (process.env.NODE_ENV === 'development' || !process.env.VERCEL) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'products.ts');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const prefix = 'export const PRODUCTS: Product[] = ';
          const index = content.indexOf(prefix);
          if (index !== -1) {
            let jsonText = content.slice(index + prefix.length).trim();
            if (jsonText.endsWith(';')) {
              jsonText = jsonText.slice(0, -1);
            }
            const parsedProducts = JSON.parse(jsonText);
            return NextResponse.json({ success: true, products: parsedProducts, storage: 'local_file' });
          }
        }
      } catch (readError) {
        console.error('Error reading local products file:', readError);
      }
    }
    
    // Fallback to static data
    return NextResponse.json({ success: true, products: PRODUCTS, storage: 'static' });
  } catch (error: any) {
    return NextResponse.json({ success: true, products: PRODUCTS, storage: 'static_fallback' });
  }
}
