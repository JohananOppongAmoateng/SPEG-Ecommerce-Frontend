import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2, Mail } from 'lucide-react';

// Preloader Component
const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Loader2 
            className="animate-spin text-emerald-500" 
            size={64} 
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading Your Account
        </h2>
        <p className="text-gray-500 mt-2">
          Verifying your credentials...
        </p>
      </div>
    </div>
  );
};

// Email Verification Component




// Protected Route Component
const ProtectedRoute = () => {
  const { isAuthenticated, isVerified, isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!isVerified) {
    // Show email verification page if not verified
    return <EmailVerification />;
  }

  // Render the child routes if authenticated and verified
  return <Outlet />;
};

// Hook to use authentication context
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { 
  Preloader,  
  ProtectedRoute, 
};