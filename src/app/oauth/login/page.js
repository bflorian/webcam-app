'use client'
// components/LoginForm.js
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SHA1 } from "crypto-js";

const LoginForm = () => {
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')

  const passwordMatches = (salt) => {
    return SHA1(password + salt).toString() === this.password
  }

  const handleLogin = async () => {
    // const account = await getAccountByUsername(username)
    // if (account && passwordMatches(account.salt)) {
    //   const code = await generateCode(account.id)
    //   const url = new URL(redirectUri);
    //   url.searchParams.append('code', code)
    //   url.searchParams.append('state', state)
    //   window.location.href = url.toString()
    // } else {
    //   setErrorMessage('Invalid username or password')
    // }
  };

  return (
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">WebRTC Camera Test</h2>
        <div className="mb-4">{errorMessage}</div>
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
          Login
        </button>
      </div>
  );
};

export default LoginForm;
