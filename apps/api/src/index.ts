// --- apps/api/src/index.tsx ---
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patients';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send('EyeEHR API is live 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
