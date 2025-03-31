import express, { Request, Response, Router } from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  const { patientId, date } = req.query;
  const filters: any = {};
  if (patientId) {
    filters.patientId = String(patientId);
  }
  if (date) {
    const startOfDay = new Date(date as string);
    const endOfDay = new Date(date as string);
    endOfDay.setHours(23, 59, 59, 999);
    filters.date = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }
  try {
    const appointments = await prisma.appointment.findMany({
      where: filters,
      include: { patient: true }, // Optional: include patient details
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { patient: true },
    });
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});
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
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { patientId, date, time } = req.body;
  const updateData: any = {};
  if (patientId) updateData.patientId = patientId;
  if (date && time) {
    const dateTimeString = `${date}T${time}:00Z`;
    const appointmentDate = new Date(dateTimeString);
    updateData.date = appointmentDate;
  }
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
    });
    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.appointment.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});
export default router;
