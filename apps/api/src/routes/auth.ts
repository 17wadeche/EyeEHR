// --- apps/api/src/routes/auth.ts ---
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    res.json({ token: 'fake-jwt-token' });
    return;
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email, role }, 'my_secret_key', { expiresIn: '1h' });
  res.status(201).json({ token });
  return;
});

export default authRouter;
