'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Login from '../components/Login';
import Register from '../components/Register';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const router = useRouter(); // Initialize router

  const handleLoginSuccess = (userId: number) => {
    // Redirect to UserDetail page with user ID
    router.push(`/user/profile`);
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoginView ? (
        <Login onSwitchToRegister={toggleView} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Register onSwitchToLogin={toggleView} />
      )}
    </div>
  );
}
