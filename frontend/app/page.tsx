'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const submitLogin = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/auth/sign-up', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error('API call failed', error);
    return null;
  }
};


const schema = z.object({
  username: z.string().min(8, 'Username must be at least 8 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const sanitizedUsername = DOMPurify.sanitize(data.username);
    const sanitizedPassword = DOMPurify.sanitize(data.password);

    setSubmissionStatus('loading');

    const result = await submitLogin({
      username: sanitizedUsername,
      password: sanitizedPassword,
    });

    if (result && result.success) {
      setSubmissionStatus('success');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      setSubmissionStatus('failed');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/signupimages/5.png"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 shadow-lg rounded-lg sm:px-10 border border-white/30">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-white">Login</h2>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register('username')}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer
                ${
                  submissionStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-500 focus:ring-green-500'
                    : submissionStatus === 'failed'
                    ? 'bg-red-600 hover:bg-red-500 focus:ring-red-500'
                    : 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500'
                }`}
              disabled={!isValid || submissionStatus === 'loading'}
            >
              {submissionStatus === 'loading'
                ? 'Submitting...'
                : submissionStatus === 'success'
                ? 'Login Successful!'
                : submissionStatus === 'failed'
                ? 'Login Failed!'
                : 'Login'}
            </button>
          </div>
        </form>

        <p className="flex gap-5 mt-6 text-center text-sm text-white justify-center">
          Don't have an account?
          <Link href="/signup" className="text-blue-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
