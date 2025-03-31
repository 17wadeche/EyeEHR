import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

const TABS = ['Billing Summary', 'Rx Export'] as const;
type TabType = (typeof TABS)[number];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('Billing Summary');
  const [billing, setBilling] = useState<any[]>([]);
  const [rxData, setRxData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchReports = async () => {
      if (activeTab === 'Billing Summary') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/billing`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setBilling(data);
      }

      if (activeTab === 'Rx Export') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/prescriptions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setRxData(data);
      }
    };

    fetchReports();
  }, [activeTab]);

  const exportToCSV = (rows: any[], filename: string) => {
    const csv = [
      Object.keys(rows[0]).join(','),
      ...rows.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>
      <div className="flex gap-4 mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 'Billing Summary' && billing.length > 0 && (
        <div>
          <button
            className="mb-3 text-sm text-blue-600 underline"
            onClick={() => exportToCSV(billing, 'billing_summary.csv')}
          >
            Export CSV
          </button>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Charge</th>
              </tr>
            </thead>
            <tbody>
              {billing.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{item.patient}</td>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.status}</td>
                  <td className="p-2 border">${item.charge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'Rx Export' && rxData.length > 0 && (
        <div>
          <button
            className="mb-3 text-sm text-blue-600 underline"
            onClick={() => exportToCSV(rxData, 'rx_export.csv')}
          >
            Export CSV
          </button>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Rx Type</th>
                <th className="p-2 border">OD</th>
                <th className="p-2 border">OS</th>
              </tr>
            </thead>
            <tbody>
              {rxData.map((rx, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{rx.patient}</td>
                  <td className="p-2 border">{rx.date}</td>
                  <td className="p-2 border">{rx.type}</td>
                  <td className="p-2 border">{rx.od}</td>
                  <td className="p-2 border">{rx.os}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
