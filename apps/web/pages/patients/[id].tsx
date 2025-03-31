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
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPatient(data);
        } else {
          console.error('Failed to load patient data');
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Exams</h2>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => router.push(`/patients/${id}/exams/new`)}
                  >
                    + New Exam
                  </button>
                </div>
                <ul className="space-y-2">
                  {/* Placeholder, replace with real fetched exam data */}
                  <li className="border p-3 rounded bg-gray-50">
                    <strong>Exam Date:</strong> 2024-12-01<br />
                    <strong>Chief Complaint:</strong> Blurry vision in the morning
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'Prescriptions' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Prescriptions</h2>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => router.push(`/patients/${id}/prescriptions/new`)}
                  >
                    + New Prescription
                  </button>
                </div>
                <ul className="space-y-2">
                  {/* Placeholder - replace with real prescriptions */}
                  <li className="border p-3 rounded bg-gray-50">
                    <strong>Date:</strong> 2024-12-01<br />
                    <strong>Rx Type:</strong> Distance<br />
                    <strong>OD:</strong> -2.00 / -0.50 x 180<br />
                    <strong>OS:</strong> -1.75 / -0.25 x 170
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'Documents' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Documents</h2>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (!file || !id) return;
                      const formData = new FormData();
                      formData.append('document', file);

                      const token = localStorage.getItem('token');
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${id}/documents`, {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${token}`
                        },
                        body: formData
                      });

                      if (res.ok) {
                        alert('Document uploaded');
                        router.reload();
                      } else {
                        alert('Upload failed');
                      }
                    }}
                    className="text-sm"
                  />
                </div>

                {/* Document List - replace with real API call */}
                <ul className="space-y-2">
                  <li className="border p-3 rounded bg-gray-50 flex justify-between items-center">
                    <span>Retina_Scan_2025.pdf</span>
                    <a
                      href="#"
                      className="text-blue-600 underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
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
