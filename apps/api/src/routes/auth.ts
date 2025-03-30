import { Router, Request, Response } from 'express';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    res.json({ token: 'fake-jwt-token' });
    return;
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

export default authRouter;
