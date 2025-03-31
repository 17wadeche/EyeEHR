// --- apps/web/pages/dashboard.tsx ---
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <Navbar />
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/patients"
          className="block border p-6 rounded-lg shadow hover:shadow-md transition bg-white"
        >
          <h2 className="text-lg font-medium text-blue-600">📋 View Patients</h2>
          <p className="text-sm text-gray-500">Browse the full patient list</p>
        </a>
        <a
          href="/patients/new"
          className="block border p-6 rounded-lg shadow hover:shadow-md transition bg-white"
        >
          <h2 className="text-lg font-medium text-blue-600">➕ Add New Patient</h2>
          <p className="text-sm text-gray-500">Create a new patient record</p>
        </a>
      </div>
    </main>
  );
}
