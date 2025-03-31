import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';

const TABS = ['Summary', 'Chief Complaint', 'Vision', 'Refraction', 'SLE', 'Assessment & Plan'] as const;
type TabType = (typeof TABS)[number];

export default function NewExamPage() {
  const router = useRouter();
  const { id: patientId } = router.query;

  const [activeTab, setActiveTab] = useState<TabType>('Summary');
  const [form, setForm] = useState({
    chiefComplaint: '',
    visionOD: '',
    visionOS: '',
    refractionOD: '',
    refractionOS: '',
    sleNotes: '',
    assessment: '',
    plan: ''
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${patientId}/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push(`/patients/${patientId}`);
    else alert('Failed to save exam');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">New Exam</h1>
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
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 bg-white p-6 shadow rounded-lg">
          {activeTab === 'Summary' && (
            <div>
              <p className="text-gray-600">Use the tabs on the left to complete the exam. When finished, click Save.</p>
            </div>
          )}

          {activeTab === 'Chief Complaint' && (
            <div>
              <label className="block text-sm font-medium mb-1">Chief Complaint</label>
              <textarea
                className="border rounded w-full p-2"
                rows={4}
                value={form.chiefComplaint}
                onChange={e => handleChange('chiefComplaint', e.target.value)}
              />
            </div>
          )}

          {activeTab === 'Vision' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vision OD</label>
                <input
                  className="border rounded w-full p-2"
                  value={form.visionOD}
                  onChange={e => handleChange('visionOD', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vision OS</label>
                <input
                  className="border rounded w-full p-2"
                  value={form.visionOS}
                  onChange={e => handleChange('visionOS', e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'Refraction' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Refraction OD</label>
                <input
                  className="border rounded w-full p-2"
                  value={form.refractionOD}
                  onChange={e => handleChange('refractionOD', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Refraction OS</label>
                <input
                  className="border rounded w-full p-2"
                  value={form.refractionOS}
                  onChange={e => handleChange('refractionOS', e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'SLE' && (
            <div>
              <label className="block text-sm font-medium mb-1">Slit Lamp Exam Notes</label>
              <textarea
                className="border rounded w-full p-2"
                rows={5}
                value={form.sleNotes}
                onChange={e => handleChange('sleNotes', e.target.value)}
              />
            </div>
          )}

          {activeTab === 'Assessment & Plan' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Assessment</label>
                <textarea
                  className="border rounded w-full p-2"
                  rows={3}
                  value={form.assessment}
                  onChange={e => handleChange('assessment', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Plan</label>
                <textarea
                  className="border rounded w-full p-2"
                  rows={3}
                  value={form.plan}
                  onChange={e => handleChange('plan', e.target.value)}
                />
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Exam
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
