// --- apps/api/src/routes/auth.ts ---
import { Router, Request, Response } from 'express';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    return res.json({ token: 'fake-jwt-token' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

export default authRouter;
