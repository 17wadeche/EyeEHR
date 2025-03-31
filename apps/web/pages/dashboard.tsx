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
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/patients"
            className="flex flex-col justify-between p-8 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                📋 View Patients
              </h2>
              <p className="text-gray-600">Browse the full patient list</p>
            </div>
          </a>
          <a
            href="/patients/new"
            className="flex flex-col justify-between p-8 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                ➕ Add New Patient
              </h2>
              <p className="text-gray-600">Create a new patient record</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
