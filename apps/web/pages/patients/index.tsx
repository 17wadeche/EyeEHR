// --- apps/web/pages/patients/index.tsx ---
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

type Patient = {
  id: string;
  name: string;
  dob: string;
};

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    };

    fetchData();
  }, [router]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Navbar />
      <h1 className="text-3xl font-semibold mb-6">Patients</h1>
      <div className="grid gap-4">
        {patients.map(p => (
          <div key={p.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h2 className="text-lg font-medium">{p.name}</h2>
            <p className="text-gray-600">DOB: {new Date(p.dob).toLocaleDateString()}</p>
          </div>
        ))}
        {patients.length === 0 && (
          <p className="text-gray-500 italic">No patients found.</p>
        )}
      </div>
    </div>
  );
}