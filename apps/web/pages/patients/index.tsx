import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

type Patient = {
  id: string;
  name: string;
  dob: string;
  email?: string;
  phone?: string;
};

export default function PatientsListPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPatients = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        } else {
          setError('Failed to fetch patients.');
        }
      } catch (err) {
        setError('An error occurred while fetching patients.');
      }
      setLoading(false);
    };

    fetchPatients();
  }, [router]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Patients</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p>Loading patients...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Link key={patient.id} href={`/patients/${patient.id}`}>
                <a className="block p-6 border rounded-lg shadow hover:shadow-md transition">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">{patient.name}</h2>
                  <p className="text-sm text-gray-600">
                    DOB: {new Date(patient.dob).toLocaleDateString()}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
