import { useAppDispatch, useAppSelector } from '@/hooks/appHooks';
import { signIn, signOut, signUp, checkAuthState } from '@/store/auth/authSlice';
import { useEffect } from 'react';
import {SignInCredentials, SignUpCredentials} from "@components/interfaces/authType.ts";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { currentUser, loading, error, initialized } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    return {
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.isAdmin || false,
        loading,
        error,
        initialized,
        signIn: (credentials: SignInCredentials) => dispatch(signIn(credentials)),
        signUp: (credentials: SignUpCredentials) => dispatch(signUp(credentials)),
        signOut: () => dispatch(signOut())
    };
};