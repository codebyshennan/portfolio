# Migration from PlanetScale to Neon DB

## Changes Made

1. **Package Updates:**
   - Removed: `@planetscale/database`, `kysely-planetscale`
   - Added: `pg` (PostgreSQL driver), `@types/pg` (TypeScript types)
   - Kysely already supports Postgres natively, so no additional dialect package needed

2. **Database Connection (`lib/planetscale.ts`):**
   - Changed from `PlanetScaleDialect` to `PostgresDialect`
   - Updated to use `pg.Pool` instead of PlanetScale's connection
   - Added SSL configuration for Neon (Neon requires SSL connections)

3. **Query Syntax Updates:**
   - Updated `pages/api/views/[slug].ts`:
     - Changed MySQL's `onDuplicateKeyUpdate` to Postgres's `onConflict().doUpdateSet()`
     - Improved atomic increment using SQL expression

4. **Schema:**
   - Created `schema.sql` with Postgres-compatible schema
   - Changed `AUTO_INCREMENT` to `SERIAL` (Postgres syntax)
   - Primary keys and indexes remain the same

## Next Steps

1. **Update Environment Variables:**
   - Add or update your `.env` file with the Neon `DATABASE_URL`:
     ```
     DATABASE_URL=postgresql://blog-views_owner:<password>@ep-wispy-cloud-a136q3ja-pooler.ap-southeast-1.aws.neon.tech/blog-views?sslmode=require
     ```
   - Replace `<password>` with your actual password
   - Note: Remove `channel_binding=require` from the connection string (it's only for psql client, not needed for the pg driver)

2. **Run the Schema:**
   You have two options:
   
   **Option A: Using Neon Web Console (Easiest)**
   - Go to your Neon project dashboard
   - Click on "SQL Editor"
   - Copy and paste the contents of `schema.sql`
   - Run the query
   
   **Option B: Using psql command line**
   ```bash
   psql 'postgresql://blog-views_owner:<password>@ep-wispy-cloud-a136q3ja-pooler.ap-southeast-1.aws.neon.tech/blog-views?sslmode=require' < schema.sql
   ```

4. **Migrate Data (if needed):**
   - If you have existing data in PlanetScale, you'll need to export it and import it into Neon
   - PlanetScale uses MySQL, Neon uses PostgreSQL, so you may need to convert data types
   - Consider using tools like `pgloader` for MySQL to PostgreSQL migration

5. **Test the Application:**
   - Run `pnpm install` to ensure all dependencies are installed
   - Test the guestbook and view counter functionality
   - Verify all database operations work correctly

## Notes

- The file `lib/planetscale.ts` still has the old name but now uses Postgres/Neon
- You may want to rename this file to `lib/db.ts` in the future for clarity
- All existing imports from `lib/planetscale` continue to work
- SSL is automatically configured when connecting to Neon domains

