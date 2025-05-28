import { useAppSelector } from '@/hooks/appHooks.ts';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({children, requireAdmin = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, initialized } = useAppSelector(
      (state) => ({
        isAuthenticated: state.auth.currentUser !== null,
        isAdmin: state.auth.currentUser?.isAdmin || false,
        initialized: state.auth.initialized
      })
  );

  if (!initialized) {
    return (
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Checking authentication..." />
        </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};