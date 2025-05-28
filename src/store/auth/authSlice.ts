import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@services/firebase.ts';
import { User, AuthState, SignInCredentials } from "@/types/authType.ts";

const initialState: AuthState = {
    currentUser: null,
    loading: false,
    error: null,
    initialized: false
};

const transformUser = async (firebaseUser: FirebaseUser | null): Promise<User | null> => {
    if (!firebaseUser) return null;

    try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: userData?.isAdmin || false
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: false
        };
    }
};

export const checkAuthState = createAsyncThunk(
    'auth/checkAuthState',
    async (_, { dispatch }) => {
        return new Promise<void>((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                const user = await transformUser(firebaseUser);
                dispatch(setAuthUser(user));
                resolve();
            });
            unsubscribe();
        });
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: SignInCredentials, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return await transformUser(userCredential.user);
        } catch (error) {
            return rejectWithValue('Failed to sign in. Please check your credentials.');
        }
    }
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            await firebaseSignOut(auth);
            return null;
        } catch (error) {
            return rejectWithValue('Failed to sign out');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.currentUser = action.payload;
            state.initialized = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthState.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.currentUser = null;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;