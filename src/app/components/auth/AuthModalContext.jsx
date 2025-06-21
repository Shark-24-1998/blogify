"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('signin'); // 'signin' | 'signup'

  const openSignIn = useCallback(() => {
    setFormType('signin');
    setOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setFormType('signup');
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  // Listen for 'open-signin-modal' event to trigger sign in modal from anywhere
  React.useEffect(() => {
    const handler = () => openSignIn();
    window.addEventListener('open-signin-modal', handler);
    return () => window.removeEventListener('open-signin-modal', handler);
  }, [openSignIn]);

  return (
    <AuthModalContext.Provider value={{ open, formType, openSignIn, openSignUp, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const { openSignIn, openSignUp } = useContext(AuthModalContext);
  console.log('AuthModalContext:', openSignIn, openSignUp);
  return useContext(AuthModalContext);
}

const handleMobileSignIn = () => {
  openSignIn();
  // setTimeout(() => setMenuOpen(false), 200); // Comment this out
};