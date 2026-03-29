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
    // DB unavailable in local dev — empty views is a valid state, not an error
    return res.status(200).json([]);
  }
}
