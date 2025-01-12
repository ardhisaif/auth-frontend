'use client'

import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoginView ? (
        <Login onSwitchToRegister={toggleView} />
      ) : (
        <Register onSwitchToLogin={toggleView} />
      )}
    </div>
  );
}