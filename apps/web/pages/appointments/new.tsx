import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

export default function NewAppointment() {
  const router = useRouter();
  const [form, setForm] = useState({ patientId: '', date: '', time: '' });
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');
    const fetchPatients = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    };

    fetchPatients();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push('/appointments');
    else alert('Failed to schedule appointment');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">New Appointment</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow flex flex-col gap-4 max-w-md">
        <select
          value={form.patientId}
          onChange={e => setForm({ ...form, patientId: e.target.value })}
          required
          className="border rounded p-2"
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="border rounded p-2"
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
          className="border rounded p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
          Schedule Appointment
        </button>
      </form>
    </Layout>
  );
}
