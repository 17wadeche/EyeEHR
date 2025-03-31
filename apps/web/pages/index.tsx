import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-lg rounded-xl p-12 max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">EyeEHR 👁️</h1>
        <p className="mt-4 text-gray-600">
          The future of optometry records management. Log in or register to begin.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
