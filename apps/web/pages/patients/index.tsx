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
      const res = await fetch('/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    };

    fetchData();
  }, [router]);

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <ul>
        {patients.map(p => (
          <li key={p.id} className="border-b py-2">
            {p.name} - {new Date(p.dob).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}