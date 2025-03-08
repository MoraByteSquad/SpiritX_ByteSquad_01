'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component

// Define types for the API response structure
interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

const SignUp: NextPage = () => {
  // Type state variables
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false); // New state to track successful signup

  // Password constraints state
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
  });

  // Check password constraints dynamically
  const checkPasswordValidations = (password: string) => {
    setPasswordValidations({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    });
  };

  useEffect(() => {
    checkPasswordValidations(password);
    // Password strength calculation
    const strengthRegex = [
      /[a-z]/, // lowercase
      /[A-Z]/, // uppercase
      /[@$!%*?&]/, // special character
      /[0-9]/, // number
    ];

    let strength = 0;
    strengthRegex.forEach((regex) => {
      if (regex.test(password)) {
        strength += 1;
      }
    });
    setPasswordStrength(strength);
  }, [password]);

  // Validate form fields
  const validateForm = () => {
    if (username.length < 8) {
      setMessage('Username must be at least 8 characters long');
      return false;
    }

    if (!passwordValidations.minLength || !passwordValidations.hasUpperCase || !passwordValidations.hasLowerCase || !passwordValidations.hasSpecialChar) {
      setMessage('Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one special character');
      return false;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }

    setMessage(''); // Clear any previous error messages
    return true;
  };

  // Define the handleSubmit function with typing for the event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const userData = { username, password, confirmPassword };

    try {
      const response = await axios.post<ApiResponse>('http://localhost:8001/api/v1/auth/sign-up', userData);

      if (response.data.success) {
        setMessage(response.data.message);
        setToken(response.data.data.token);
        setIsSignedUp(true); // Set to true when signup is successful
      } else {
        setMessage('Failed to create user');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message);
        setMessage(`An error occurred: ${error.message}`);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

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
          <h2 className="mt-6 text-2xl font-bold text-white">Create a new account</h2>
        </div>

        {message && <div className="text-red-500 text-sm mb-4">{message}</div>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
                required
              />
            </div>

            {/* Password Strength Indicator */}
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

            {/* Password Validation List */}
            <div className="mt-2 text-sm text-white">
              <ul>
                <li className={`text-${passwordValidations.minLength ? 'green' : 'red'}-500`}>
                  - Password must be at least 8 characters long
                </li>
                <li className={`text-${passwordValidations.hasUpperCase ? 'green' : 'red'}-500`}>
                  - Password must contain at least one uppercase letter
                </li>
                <li className={`text-${passwordValidations.hasLowerCase ? 'green' : 'red'}-500`}>
                  - Password must contain at least one lowercase letter
                </li>
                <li className={`text-${passwordValidations.hasSpecialChar ? 'green' : 'red'}-500`}>
                  - Password must contain at least one special character
                </li>
              </ul>
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white/30 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
                required
              />
            </div>
            {confirmPassword && confirmPassword !== password && (
              <span className="text-red-500 text-sm">Passwords do not match</span>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Display login link after successful signup */}
        {isSignedUp && (
          <div className="mt-4 text-center">
            <p className="text-white">
              Account created successfully!{' '}
              <Link href="/" className="text-indigo-400 hover:text-indigo-600">
                Go to login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
