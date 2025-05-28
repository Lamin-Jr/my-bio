import { useAppDispatch, useAppSelector } from '@/hooks/appHooks.ts';
import { checkAuthState, signIn, signOut } from '@/store/auth/authSlice.ts';
import { useEffect } from 'react';
import {SignInCredentials} from "@/types/authType.ts";

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
        signOut: () => dispatch(signOut())
    };
};