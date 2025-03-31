// apps/api/src/routes/patients.ts
import express from 'express';
import prisma from '../lib/prisma';
import authMiddleware from '../middleware/auth';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// GET single patient by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});

// POST new patient
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
