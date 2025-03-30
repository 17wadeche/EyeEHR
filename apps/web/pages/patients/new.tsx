// --- apps/web/pages/patients/new.tsx ---
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function NewPatient() {
  const [form, setForm] = useState({ name: '', dob: '', email: '', phone: '' });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push('/patients');
    else alert('Failed to add patient');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Navbar />
      <h1 className="text-2xl mb-4">Add New Patient</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2" required />
        <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} className="border p-2" required />
        <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="border p-2" />
        <button className="bg-green-600 text-white p-2 rounded" type="submit">Save</button>
      </form>
    </div>
  );
}
