'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { getUsernameFromToken } from '../../components/Decoder';

function Dashboard() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the username from the token
        const fetchedUsername = getUsernameFromToken();
        console.log('Fetched Username:', fetchedUsername); // Debugging to ensure username is fetched correctly
        setUsername(fetchedUsername || 'Guest'); // Fallback to 'Guest' if username is null or undefined
    }, []);

    const signOut = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/sign-out');
            if (response.data.success) {
                sessionStorage.removeItem('token');
                setTimeout(() => router.push('/'), 1000);
            } else {
                throw new Error('Sign-out failed');
            }
        } catch (err) {
            console.error('Error during sign-out:', err);
        }
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <nav className="mt-5 space-y-2">
                    <Link href="/dashboard" className="block py-2 px-3 rounded-md bg-gray-700 hover:bg-gray-600">Home</Link>
                    <Link href="/dashboard/profile" className="block py-2 px-3 rounded-md hover:bg-gray-600">Profile</Link>
                    <Link href="/dashboard/reports" className="block py-2 px-3 rounded-md hover:bg-gray-600">Reports</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                    <h1 className="text-2xl font-semibold">Welcome, {username || 'Guest'}!</h1>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
                </div>
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

export default Dashboard;
