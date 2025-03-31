import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useAuth(requiredRole?: string) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      router.push('/login');
      return;
    }

    if (requiredRole && role !== requiredRole) {
      alert('Access denied');
      router.push('/dashboard');
      return;
    }

    setAuthenticated(true);
  }, [requiredRole, router]);

  return { authenticated };
}
