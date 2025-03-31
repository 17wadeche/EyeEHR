import express from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

router.post('/', async (req, res) => {
  const { patientId, date, time } = req.body;
  const dateTimeString = `${date}T${time}:00Z`;
  const appointmentDate = new Date(dateTimeString);

  try {
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        date: appointmentDate,
      },
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

export default router;
