import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Patient = {
  id: string;
  name: string;
  dob: string;
};

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

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
