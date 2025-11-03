import { queryBuilder } from 'lib/planetscale';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await queryBuilder
      .selectFrom('views')
      .select(['slug', 'count'])
      .execute();

    // Always return an array, even if empty
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (e) {
    console.error("Error fetching views:", e);
    // Return empty array on error so client doesn't crash
    return res.status(500).json([]);
  }
}
