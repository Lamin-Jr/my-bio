import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/appHooks.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { initializeAuth } from '@/store/auth/authSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({
                                   children,
                                   requireAdmin = false
                               }: ProtectedRouteProps) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { currentUser, initialized, loading } = useAppSelector((state) => state.auth);
    const isAdmin = currentUser?.isAdmin || false;

    // Initialize auth state if not already initialized
    useEffect(() => {
        if (!initialized && !loading) {
            dispatch(initializeAuth());
        }
    }, [dispatch, initialized, loading]);

    if (!initialized || loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Checking authentication..." />
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};