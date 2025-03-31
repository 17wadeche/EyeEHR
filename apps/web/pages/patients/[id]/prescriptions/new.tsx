import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import { useRouter } from 'next/router';

export default function NewPrescription() {
  const router = useRouter();
  const { id: patientId } = router.query;

  const [form, setForm] = useState({
    type: 'Distance',
    date: new Date().toISOString().split('T')[0],
    odSphere: '',
    odCylinder: '',
    odAxis: '',
    osSphere: '',
    osCylinder: '',
    osAxis: '',
    addPower: ''
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${patientId}/prescriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push(`/patients/${patientId}`);
    else alert('Failed to save prescription');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">New Prescription</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Prescription Type</label>
            <select
              className="border p-2 rounded w-full"
              value={form.type}
              onChange={e => handleChange('type', e.target.value)}
            >
              <option value="Distance">Distance</option>
              <option value="Near">Near</option>
              <option value="Bifocal">Bifocal</option>
              <option value="Progressive">Progressive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">OD (Right Eye)</h2>
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Sphere" value={form.odSphere} onChange={e => handleChange('odSphere', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Cylinder" value={form.odCylinder} onChange={e => handleChange('odCylinder', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Axis" value={form.odAxis} onChange={e => handleChange('odAxis', e.target.value)} className="border p-2 rounded" />
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">OS (Left Eye)</h2>
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Sphere" value={form.osSphere} onChange={e => handleChange('osSphere', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Cylinder" value={form.osCylinder} onChange={e => handleChange('osCylinder', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Axis" value={form.osAxis} onChange={e => handleChange('osAxis', e.target.value)} className="border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-2">Add Power (if needed)</label>
          <input
            placeholder="+2.00"
            value={form.addPower}
            onChange={e => handleChange('addPower', e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Prescription
        </button>
      </form>
    </Layout>
  );
}
