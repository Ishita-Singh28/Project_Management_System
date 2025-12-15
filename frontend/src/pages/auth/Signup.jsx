import React, { useState } from 'react';
import { signup } from '../../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_png.png';

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  const passwordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const passwordStrength = password.length >= 12 ? 'Very Good' : 'Good';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!emailValid) {
      return setError('Please enter a valid email address.');
    }

    if (!passwordValid) {
      return setError(
        'Password must be at least 8 characters, include uppercase, lowercase, and a digit.'
      );
    }

    if (!role) {
      return setError('Please select a user type.');
    }

    try {
      const res = await signup({
        username,
        email: username,
        password,
        role
      });

      if (res.data?.success) {
        setSuccess('Signup successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center">

      <Link
        to="/login"
        className="absolute top-10 left-10 text-gray-400 text-xl cursor-pointer hover:text-white transition">
        ←
      </Link>


      <img src={logo} alt="Ubiquitous" className="w-20 h-20 mb-6" />

      <div className="w-full max-w-sm bg-[#2a2a2a] rounded-xl p-8 shadow-lg">

        <h2 className="text-center text-white text-xl font-semibold">
          Sign Up
        </h2>
        <p className="text-center text-gray-400 text-sm mt-1 mb-6">
          Enter the below details to sign up
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-xs text-gray-300 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <label className="block text-xs text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {password && (
              <div className="absolute right-[-240px] top-0 w-56 bg-white text-black text-xs rounded-lg p-3 shadow-lg">
                <p className="font-semibold mb-1">
                  Password Strength:{' '}
                  <span className="text-purple-600">{passwordStrength}</span>
                </p>
                <div className="h-1 bg-gray-200 rounded mb-2">
                  <div className="h-1 bg-purple-500 rounded w-full"></div>
                </div>
                <p className="text-gray-600">
                  Use at least 8 characters. Password is case sensitive.
                  Don’t use passwords from other sites.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">
              User Type
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select your User Type</option>
              <option value="Client">Client</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-lg bg-purple-400 hover:bg-purple-500 text-white transition"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}
