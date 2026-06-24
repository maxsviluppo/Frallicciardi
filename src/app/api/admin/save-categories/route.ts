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

    // Save to local file in development/local environment
    if (process.env.NODE_ENV === 'development' || !process.env.VERCEL) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'categories.ts');
        const fileContent = `export interface Category {
  id: string;
  name: string;
  image: string;
  filter: string;
  order: number;
}

export const CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};
`;
        fs.writeFileSync(filePath, fileContent, 'utf-8');
        return NextResponse.json({ success: true, count: categories.length, storage: 'local_file' });
      } catch (fsError: any) {
        console.error('Error writing categories file:', fsError);
      }
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
    
    // In local development, try reading the actual file if it exists
    if (process.env.NODE_ENV === 'development' || !process.env.VERCEL) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'categories.ts');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const prefix = 'export const CATEGORIES: Category[] = ';
          const index = content.indexOf(prefix);
          if (index !== -1) {
            let jsonText = content.slice(index + prefix.length).trim();
            if (jsonText.endsWith(';')) {
              jsonText = jsonText.slice(0, -1);
            }
            const parsedCategories = JSON.parse(jsonText);
            return NextResponse.json({ success: true, categories: parsedCategories, storage: 'local_file' });
          }
        }
      } catch (readError) {
        console.error('Error reading local categories file:', readError);
      }
    }

    // Fallback to static data
    return NextResponse.json({ success: true, categories: CATEGORIES, storage: 'static' });
  } catch (error: any) {
    return NextResponse.json({ success: true, categories: CATEGORIES, storage: 'static_fallback' });
  }
}
