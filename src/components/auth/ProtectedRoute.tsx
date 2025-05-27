import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin is required but user is not admin, redirect to home
  if (requireAdmin && !currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated (and is admin if required)
  return <>{children}</>;
};