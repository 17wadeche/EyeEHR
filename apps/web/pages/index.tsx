import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-12 max-w-lg text-center">
        <h1 className="text-5xl font-bold text-gray-900">EyeEHR 👁️</h1>
        <p className="mt-4 text-lg text-gray-700">
          The future of optometry records management. Please log in or register to begin.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
