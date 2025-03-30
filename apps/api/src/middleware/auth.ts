// --- apps/api/src/middleware/auth.ts ---
import { Request, Response, NextFunction, RequestHandler } from 'express';

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  next();
};
export default authMiddleware;
