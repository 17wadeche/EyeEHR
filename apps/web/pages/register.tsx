// apps/web/pages/register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'optometrist'
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting registration with:', form);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        router.push('/dashboard');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl mb-4">Register for EyeEHR</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="border p-2"
          required
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="border p-2"
        >
          <option value="optometrist">Optometrist</option>
          <option value="office_manager">Office Manager</option>
        </select>
        <button className="bg-green-600 text-white p-2 rounded" type="submit">Register</button>
      </form>
    </main>
  );
}
