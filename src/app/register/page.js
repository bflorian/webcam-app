'use client'
// components/LoginForm.js
import React, { useState } from 'react';
import { redirect } from 'next/navigation';


const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = async () => {
    const response = await fetch('/api/accounts', {
      method: 'post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    });

    const account = await response.json()
    console.log('account', account)
    window.location.href = `/devices/${account.id}`
  }

  return (
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Create a New Account</h2>
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
            onClick={handleCreate}
        >
          Create Account
        </button>
        <span className="">
          <a href="/login">Sign In</a>
        </span>
      </div>
  );
};

export default RegistrationForm;
