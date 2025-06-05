import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    User as FirebaseUser
} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {auth, db} from '@/services/firebase';
import {User, AuthState, SignInCredentials, SignUpCredentials} from '@/types/authType.ts';

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

let authInitializedPromise: Promise<void> | null = null;

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, {dispatch}) => {
        if (!authInitializedPromise) {
            authInitializedPromise = new Promise<void>((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                    const user = await transformUser(firebaseUser);
                    dispatch(setAuthUser(user));
                    dispatch(markAuthInitialized());
                    resolve();
                    unsubscribe();
                });
            });
        }
        return authInitializedPromise;
    }
);

export const checkAuthState = createAsyncThunk(
    'auth/checkAuthState',
    async (_, {dispatch}) => {
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
    async ({email, password}: SignInCredentials, {rejectWithValue}) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return await transformUser(userCredential.user);
        } catch (error: any) {
            let errorMessage = 'Failed to sign in. Please try again later.';

            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password. Please check your credentials.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed login attempts. Please try again later or reset your password.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please check your email or sign up.';
            }

            return rejectWithValue(errorMessage);
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({email, password}: SignUpCredentials, {rejectWithValue}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Create user document in Firestore
            if (userCredential.user) {
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: userCredential.user.email,
                    createdAt: new Date().toISOString(),
                    isAdmin: false,
                    bio: '',
                    experiences: [],
                    skills: [],
                    education: []
                });
            }

            return await transformUser(userCredential.user);
        } catch (error: any) {
            let errorMessage = 'Failed to create account. Please try again later.';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email already in use. Please log in or use a different email.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address. Please enter a valid email.';
            }

            return rejectWithValue(errorMessage);
        }
    }
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, {rejectWithValue}) => {
        try {
            await firebaseSignOut(auth);
            return null;
        } catch (error: any) {
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
            state.loading = false;
        },
        markAuthInitialized: (state) => {
            state.initialized = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.currentUser = null;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(initializeAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to initialize authentication';
                state.initialized = true; // Still mark as initialized to prevent infinite loading
            });
    }
});

export const {setAuthUser, markAuthInitialized} = authSlice.actions;
export default authSlice.reducer;