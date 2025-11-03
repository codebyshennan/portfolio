import { queryBuilder } from 'lib/planetscale';
import { sql } from 'kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query?.slug as string;
    if (!slug) {
      return res.status(400).json({ message: 'Slug is required.' });
    }

    if (req.method === 'POST') {
      // Use atomic increment with ON CONFLICT
      // In Postgres, we reference the existing row's column directly
      await queryBuilder
        .insertInto('views')
        .values({ slug, count: 1 })
        .onConflict((oc) => oc
          .column('slug')
          .doUpdateSet({ 
            count: sql<number>`views.count + 1` 
          }))
        .execute();

      // Fetch updated count
      const data = await queryBuilder
        .selectFrom('views')
        .where('slug', '=', slug)
        .select(['count'])
        .execute();

      const views = !data.length ? 1 : Number(data[0].count);

      return res.status(200).json({
        total: views,
      });
    }

    if (req.method === 'GET') {
      const data = await queryBuilder
        .selectFrom('views')
        .where('slug', '=', slug)
        .select(['count'])
        .execute();

      const views = !data.length ? 0 : Number(data[0].count);
      return res.status(200).json({ total: views });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ message: e?.message || 'Internal server error' });
  }
}
