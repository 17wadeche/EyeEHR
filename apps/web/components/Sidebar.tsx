// aaps/web/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Patients', path: '/patients' },
  { label: 'Appointments', path: '/appointments' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' }
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-semibold border-b border-gray-700">
        EyeEHR
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-3 py-2 rounded hover:bg-gray-700 transition ${
              router.pathname.startsWith(item.path) ? 'bg-gray-700' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
