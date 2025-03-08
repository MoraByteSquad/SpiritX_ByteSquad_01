'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod'; // Zod library for validation
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z
    .string()
    .min(8, { message: 'Username must be at least 8 characters long' })
    .regex(/^\S*$/, { message: 'Username cannot have spaces' }), // Ensures no spaces
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], // This will set the error on confirmPassword
});

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [authError, setAuthError] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission here
    // Example logic for signup success
    setTimeout(() => {
      alert("Signup successful!");
      window.location.href = '/login'; // Redirect to login page
    }, 2000);
  };

  // Dynamically trigger validation on field change
  const handleInputChange = async (field: 'username' | 'password' | 'confirmPassword', value: string) => {
    setForm({ ...form, [field]: value });
    await trigger(field); // Trigger validation for the specific field
  };

  const checkPasswordStrength = (password: string) => {
    const strengthRegex = [
      /[a-z]/,  // lowercase
      /[A-Z]/,  // uppercase
      /[@$!%*?&]/,  // special character
      /[0-9]/,  // number
    ];

    let strength = 0;
    strengthRegex.forEach((regex) => {
      if (regex.test(password)) {
        strength += 1;
      }
    });
    setPasswordStrength(strength);
  };

  useEffect(() => {
    checkPasswordStrength(form.password);
  }, [form.password]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/signupimages/5.png" // Place this image inside the `public` folder
          alt="Signup Background"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 shadow-lg rounded-lg sm:px-10 border border-white/30">
        <div className="text-center">
          <Image
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            width={40}
            height={40}
            className="mx-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-white">Create a new account</h2>
        </div>

        {authError && <div className="text-red-500 text-sm mb-4">{authError}</div>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                type="text"
                value={form.username}
                {...register('username')}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
              {form.username.length < 8 && form.username.length > 0 && (
                <span className="text-red-500 text-sm">Username must be at least 8 characters long</span>
              )}
              {errors.username && !form.username.length && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
          </div>

          {/* Password Field */}
          {/* Password Field */}
<div>
  <label htmlFor="password" className="block text-sm font-medium text-white">
    Password
  </label>
  <div className="mt-1">
    <input
      id="password"
      type="password"
      value={form.password}
      {...register('password')}
      onChange={(e) => handleInputChange('password', e.target.value)}
      className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
    />
    {form.password.length < 8 && form.password.length > 0 && (
      <span className="text-red-500 text-sm">Password must be at least 8 characters long</span>
    )}
    {errors.password && !form.password.length && <span className="text-red-500 text-sm">{errors.password.message}</span>}
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-md">
        <div
          className={`h-2 rounded-md transition-all duration-300 ${
            passwordStrength === 4
              ? 'bg-green-500'
              : passwordStrength === 3
              ? 'bg-yellow-500'
              : passwordStrength === 2
              ? 'bg-orange-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${(passwordStrength / 4) * 100}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-400">
        {passwordStrength === 4
          ? 'Strong'
          : passwordStrength === 3
          ? 'Moderate'
          : passwordStrength === 2
          ? 'Weak'
          : 'Very Weak'}
      </span>
    </div>
  </div>
</div>


          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                {...register('confirmPassword')}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
             
            </div>
            {form.confirmPassword && form.confirmPassword !== form.password && (
              <span className="text-red-500 text-sm">Passwords do not match</span>
            )}
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-white">
          Already have an account?{' '}
          <a href="#" className="font-medium text-indigo-300 hover:text-indigo-100">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
