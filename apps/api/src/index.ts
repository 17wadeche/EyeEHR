// --- apps/api/src/index.tsx ---
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patients';
import authMiddleware from './middleware/auth';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT ?? '8080', 10);
app.use(cors({
  origin: [
    '*',
    'https://eyeehr-5d8qbu68h-cheyanne-bronk-wades-projects.vercel.app',
    'https://eyeehr.vercel.app',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/patients', authMiddleware, patientRoutes);
app.get('/', (req, res) => {
  console.log("Received GET / request");
  res.send("EyeEHR API is live 🚀");
});
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
