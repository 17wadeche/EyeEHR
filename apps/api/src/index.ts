// --- apps/api/src/index.tsx ---
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patients';
import authMiddleware from './middleware/auth';
import authRouter from './routes/auth';
import { Request, Response, NextFunction } from 'express';
import appointmentRoutes from './routes/appointments';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '10000', 10);
const allowedOrigins = ['https://eyeehr.vercel.app'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/patients', authMiddleware, patientRoutes);
app.use('/api/appointments', authMiddleware, appointmentRoutes);
app.get('/', (req, res) => {
  res.send("EyeEHR API is live 🚀");
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
