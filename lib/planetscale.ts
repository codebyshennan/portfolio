// import 'server-only' not working with API routes yet
import { Kysely } from 'kysely';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

interface ViewsTable {
  slug: string;
  count: number;
}

interface Database {
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
