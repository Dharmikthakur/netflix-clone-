import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  await dbConnect();

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already registered' });

  const user = await User.create({ name, email, password });
  return res.status(201).json({ message: 'Account created', userId: user._id });
}
