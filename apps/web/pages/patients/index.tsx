// --- apps/web/pages/patients/index.tsx ---
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

type Patient = {
  id: string;
  name: string;
  dob: string;
  email?: string;
  phone?: string;
};

const TABS = ['Demographics', 'Exams', 'Prescriptions', 'Documents', 'Billing'] as const;
type TabType = (typeof TABS)[number];

export default function PatientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState<TabType>('Demographics');
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPatient = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPatient(data);
      }
    };

    if (id) fetchPatient();
  }, [id, router]);

  if (!patient) return <Layout><p>Loading patient...</p></Layout>;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="border-b pb-2">
          <h1 className="text-2xl font-semibold">{patient.name}</h1>
          <p className="text-gray-600">DOB: {new Date(patient.dob).toLocaleDateString()}</p>
        </div>

        {/* Tabs + Content */}
        <div className="flex gap-6">
          {/* Tabs */}
          <aside className="w-48 border-r pr-4 space-y-2">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </aside>

          {/* Tab Content */}
          <section className="flex-1 bg-white rounded-lg shadow p-4">
            {activeTab === 'Demographics' && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Demographics</h2>
                <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {patient.phone || 'N/A'}</p>
              </div>
            )}
            {activeTab === 'Exams' && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Exams</h2>
                <p>No exam records yet.</p>
              </div>
            )}
            {activeTab === 'Prescriptions' && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Prescriptions</h2>
                <p>No prescriptions yet.</p>
              </div>
            )}
            {activeTab === 'Documents' && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Documents</h2>
                <p>No documents uploaded.</p>
              </div>
            )}
            {activeTab === 'Billing' && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Billing</h2>
                <p>No billing info.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}
