import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate('/', { unstable_onlyGenerated: true });

    return res.json({ revalidated: true });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return res.status(500).send(message);
  }
}
