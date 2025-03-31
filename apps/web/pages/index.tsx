// apps/web/pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to EyeEHR 👁️</h1>
      <p className="mt-4">Your deployment worked! Please log in or register to get started.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/login">
          <a className="bg-blue-600 text-white px-4 py-2 rounded">Login</a>
        </Link>
        <Link href="/register">
          <a className="bg-green-600 text-white px-4 py-2 rounded">Register</a>
        </Link>
      </div>
    </div>
  );
}
