// aaps/web/pages/appointments/calendar.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  parseISO,
  format as dateFnsFormat,
  parse,
  startOfWeek,
  getDay,
} from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { useRouter } from 'next/router';

type Appointment = {
  id: string;
  patientName: string;
  date: string;
  time: string;
};

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format: dateFnsFormat,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchAppointments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data: Appointment[] = await res.json();
      const calendarEvents = data.map((appt) => {
        const [hour, minute] = appt.time.split(':');
        const date = parseISO(appt.date);
        const start = new Date(date);
        start.setHours(Number(hour), Number(minute));
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 30);
        return {
          id: appt.id,
          title: appt.patientName,
          start,
          end,
        };
      });
      setEvents(calendarEvents);
    };
    fetchAppointments();
  }, [router]);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Appointments Calendar</h1>
      <div className="bg-white p-4 rounded shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          formats={{
            dateFormat: 'dd',
            dayFormat: 'eeee MM/dd',
            weekdayFormat: 'eeee',
            monthHeaderFormat: 'MMMM yyyy',
            dayHeaderFormat: 'MMMM dd, yyyy',
            dayRangeHeaderFormat: ({ start, end }, culture, lclzr) => {
              const startStr = lclzr?.format
                ? lclzr.format(start, 'MMM dd', culture)
                : '';
              const endStr = lclzr?.format
                ? lclzr.format(end, 'MMM dd', culture)
                : '';
              return `${startStr} — ${endStr}`;
            },
          }}
          style={{ height: 600 }}
          onSelectEvent={(event) => {
            alert(`Selected appointment for: ${event.title}`);
          }}
        />
      </div>
    </Layout>
  );
}
