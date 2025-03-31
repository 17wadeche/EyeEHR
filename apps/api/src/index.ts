// --- apps/api/src/index.tsx ---
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patients';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/patients', patientRoutes);
app.get('/', (req, res) => {
  console.log("Received GET / request");
  res.send("EyeEHR API is live 🚀");
});
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
