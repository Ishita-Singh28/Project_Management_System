import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../../services/api';
import logo from '../../assets/logo_png.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     const res = await login({ username, password });
  //     if (res.data?.success) {
  //       navigate('/projects');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Invalid username or password');
  //   }
  // };

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login({ username, password });

      console.log('LOGIN RESPONSE:', res.data);

      if (res.data?.success) {
        alert('Login success');
        navigate('/projects');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Invalid username or password');
    }
  };



  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center">
      <img src={logo} alt="Ubiquitous" className="w-20 h-20 mb-6" />

      <div className="w-full max-w-sm bg-[#2a2a2a] rounded-xl p-8 shadow-lg">

        <h2 className="text-center text-white text-xl font-semibold">
          Login
        </h2>
        <p className="text-center text-gray-400 text-sm mt-1 mb-6">
          Please login to continue
        </p>

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block text-xs text-gray-300 mb-1">
              User Name
            </label>
            <input
              type="email"
              placeholder="Enter Your User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>


          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-lg bg-purple-400 hover:bg-purple-500 text-white transition"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Not Registered Yet? Sign Up{' '}
          <Link
            to="/signup"
            className="text-purple-400 underline"
          >
            Here
          </Link>
        </p>
      </div>
    </div>
  );
}
