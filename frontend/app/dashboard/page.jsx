'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [username] = useState('John Doe'); // Replace with actual user data

  const handleLogout = () => {
    // Simulate logout
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <nav className="mt-5 space-y-2">
          <Link href="/dashboard" className="block py-2 px-3 rounded-md bg-gray-700 hover:bg-gray-600">
            Home
          </Link>
          <Link href="/dashboard/profile" className="block py-2 px-3 rounded-md hover:bg-gray-600">
            Profile
          </Link>
          <Link href="/dashboard/reports" className="block py-2 px-3 rounded-md hover:bg-gray-600">
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-semibold">Welcome, {username}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl mt-2">$10,000</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">New Users</h3>
            <p className="text-2xl mt-2">120</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-2xl mt-2">240</p>
          </div>
        </div>
      </main>
    </div>
  );
}
