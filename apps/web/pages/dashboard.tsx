// --- apps/web/pages/dashboard.tsx ---
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="flex gap-4">
        <a className="text-blue-600" href="/patients">View Patients</a>
        <a className="text-blue-600" href="/patients/new">Add New Patient</a>
      </nav>
    </main>
  );
}