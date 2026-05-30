import { neon } from '@neondatabase/serverless';

let sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set. Please add your Neon connection string.');
  }
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

export async function initDb() {
  const db = getDb();
  
  // Create tables if they don't exist
  await db`
    CREATE TABLE IF NOT EXISTS cms_data (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  
  return db;
}

export async function getCmsData(key: string): Promise<any | null> {
  try {
    const db = getDb();
    const rows = await db`SELECT value FROM cms_data WHERE key = ${key}` as any[];
    if (!rows || rows.length === 0) return null;
    return rows[0].value;
  } catch {
    return null;
  }
}

export async function setCmsData(key: string, value: any): Promise<void> {
  const db = getDb();
  await db`
    INSERT INTO cms_data (key, value, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}, NOW())
    ON CONFLICT (key) DO UPDATE
    SET value = ${JSON.stringify(value)}, updated_at = NOW()
  `;
}
