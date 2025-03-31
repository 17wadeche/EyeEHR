import React from 'react';
import { useRouter } from 'next/router';

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="text-gray-700 text-lg font-medium">
        {/* Dynamic page label could go here */}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Dr. Smith</span>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
