import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Transform Firebase user into our User type with additional data
  const transformUser = async (firebaseUser: FirebaseUser | null): Promise<User | null> => {
    if (!firebaseUser) return null;
    
    try {
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data();
      
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        isAdmin: userData?.isAdmin || false
      };
    } catch (err) {
      console.error('Error fetching user data:', err);
      
      // Return basic user info if we can't get additional data
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        isAdmin: false
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        const user = await transformUser(firebaseUser);
        setCurrentUser(user);
      } catch (err) {
        console.error('Auth state change error:', err);
        setError('Failed to authenticate user');
      } finally {
        setLoading(false);
      }
    });

    // Clean up subscription
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = await transformUser(userCredential.user);
      setCurrentUser(user);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in. Please check your credentials.');
      throw err;
    }
  };

  const signOut = async (): Promise<void> => {
    setError(null);
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};