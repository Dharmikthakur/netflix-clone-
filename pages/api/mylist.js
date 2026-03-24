import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (req.method === 'GET') {
    return res.status(200).json({ myList: user.myList });
  }

  if (req.method === 'POST') {
    const movie = req.body;
    const exists = user.myList.some((m) => m.id === movie.id);
    if (exists) return res.status(200).json({ myList: user.myList });

    user.myList.push(movie);
    await user.save();
    return res.status(200).json({ myList: user.myList });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    user.myList = user.myList.filter((m) => m.id !== id);
    await user.save();
    return res.status(200).json({ myList: user.myList });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
