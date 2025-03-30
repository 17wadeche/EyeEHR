// --- apps/web/components/Navbar.tsx ---
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b mb-4">
      <div className="font-bold text-lg">EyeEHR</div>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
