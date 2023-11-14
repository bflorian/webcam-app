'use client'
// components/LoginForm.js
import React, { useState } from 'react';
import {getAccountByUsername} from "@/lib/sqllite";

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const account = await fetch(`/api/accounts/find?username=${username}`)
    if (account && passwordMatches(account.salt)) {
      window.location.href = `/devices/${account.id}`
    } else {
      setErrorMessage('Invalid username or password')
    }
  };

  return (
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Sign In to Existing Account</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleLogin}
        >
          Sign In
        </button>
        <span>
          <a href="/register">Create an Account</a>
        </span>
      </div>
  );
};

export default RegistrationForm;
