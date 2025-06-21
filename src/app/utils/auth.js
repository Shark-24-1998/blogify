import { auth, googleProvider } from './firebsae';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

// Sign up with email and password
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Sign out
export const logOut = () => {
  return signOut(auth);
}; 