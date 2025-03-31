import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Appointment = {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchAppointments = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, [router]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <Link
          href="/appointments/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Appointment
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Patient</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt.id} className="border-t">
                <td className="p-3">{appt.patientName}</td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    appt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                    appt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr><td className="p-4 text-gray-500 italic" colSpan={4}>No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
