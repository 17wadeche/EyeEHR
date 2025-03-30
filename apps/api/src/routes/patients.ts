import express from 'express';
import prisma from '../lib/prisma';
import authMiddleware from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware);

// GET /api/patients
router.get('/', async (req, res) => {
  const patients = await prisma.patient.findMany();
  res.json(patients);
});

// POST /api/patients
router.post('/', async (req, res) => {
  const { name, dob, email, phone } = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: {
        name,
        dob: new Date(dob),
        email,
        phone,
      },
    });
    res.json(newPatient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add patient' });
  }
});

export default router;
