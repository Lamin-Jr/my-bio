export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isAdmin: boolean;
}

export interface AuthState {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

export type SignInCredentials = {
    email: string;
    password: string;
};

// export type {User, AuthState}