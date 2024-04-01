import { validateRequest } from '@/lib/auth';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }

  const { user } = await validateRequest(req, res);

  const { county, visible } = req.query;

  if (!user || county === undefined || visible === undefined) {
    res.status(400).redirect('/ranks/account').end();
    return;
  }

  const countyString = county === 'none' ? null : county as string;
  const visibleBoolean = visible === 'true';

  await db.update(users).set({
    county: countyString,
    visible: visibleBoolean,
    beenToComp: true,
  }).where(eq(users.wcaId, user!.wcaId)).execute();

  res.redirect('/ranks/account');
  res.revalidate('/ranks', { unstable_onlyGenerated: true });
}
