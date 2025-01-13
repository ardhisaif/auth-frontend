'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Login from '../components/Login';
import Register from '../components/Register';
import 'dotenv/config'

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const router = useRouter(); 

  const handleLoginSuccess = (userId: number) => {
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
