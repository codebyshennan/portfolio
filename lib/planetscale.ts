// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

interface GuestbookTable {
  id: Generated<number>;
  email: string;
  body: string;
  created_by: string;
  updated_at?: string;
}

interface ViewsTable {
  slug: string;
  count: number;
}

interface Database {
  guestbook: GuestbookTable;
  views: ViewsTable;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL connections - connection string should include sslmode=require
  // The pg driver will automatically use SSL if sslmode is in the connection string
  ssl: process.env.DATABASE_URL?.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : undefined,
});

export const queryBuilder = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
});
