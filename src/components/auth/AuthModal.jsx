"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useAuthModal } from './AuthModalContext';
import { useAuth } from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

export default function AuthModal() {
  const { open, formType, closeModal } = useAuthModal();
  const { 
    user, 
    signUp, 
    signIn, 
    signInWithGoogle, 
    logOut 
  } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const modalRef = useRef(null);

  // Automatically close modal when user logs in
  useEffect(() => {
    if (user && open) {
      closeModal();
    }
  }, [user, open, closeModal]);

  // Clear errors when modal opens/closes
  useEffect(() => {
    if (open) {
      setLocalError('');
    }
  }, [open]);

  // Close modal on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') closeModal();
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, closeModal]);

  const handleGoogleSignIn = async () => {
    setLocalLoading(true);
    setLocalError('');
    try {
      await signInWithGoogle();
      setEmail('');
      setPassword('');
    } catch (err) {
      setLocalError(err.message);
    }
    setLocalLoading(false);
  };

  const handleSignOut = async () => {
    setLocalLoading(true);
    try {
      await logOut();
      closeModal();
    } catch (err) {
      setLocalError(err.message);
    }
    setLocalLoading(false);
  };

  // Display error from local state
  const displayError = localError;
  const isLoading = localLoading;

  if (!open) return null;

  return (
    <>
      {/* Modal Backdrop with strong blur and dark overlay, very high z-index */}
      <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-lg transition-opacity" />
      {/* Modal Content, very high z-index */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
          ref={modalRef}
          className="relative w-full max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-2xl px-8 py-8 animate-fadeIn flex flex-col items-center"
          style={{ minWidth: 340 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={closeModal}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-extrabold mb-1 text-center text-gray-900 tracking-tight">
            {formType === 'signup' ? 'Sign up for Blogify' : 'Sign in to Blogify'}
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            {formType === 'signup' ? 'Create your account to get started.' : 'Welcome back! Please sign in to continue.'}
          </p>
          
          {/* Social login row */}
          <div className="flex justify-center gap-3 w-full mb-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all focus:outline-none disabled:opacity-50"
              title="Sign in with Google"
            >
              <FcGoogle size={26} />
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center w-full mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          {/* Email form - Note: Email/password auth not implemented in new MVC */}
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-gray-100 cursor-not-allowed"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold text-base shadow mt-2 cursor-not-allowed"
            >
              {formType === 'signup' ? 'Sign Up' : 'Continue'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-1">
              Email/password authentication coming soon. Please use Google Sign-In.
            </p>
          </div>
          
          {displayError && (
            <span className="text-xs text-red-600 text-center mt-1">{displayError}</span>
          )}
          
          <div className="w-full text-center mt-6 text-sm text-gray-500">
            {formType === 'signup' ? (
              <>
                Already have an account?{' '}
                <span
                  className="text-blue-600 cursor-pointer font-semibold hover:underline"
                  onClick={closeModal}
                >
                  Sign In
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <span
                  className="text-blue-600 cursor-pointer font-semibold hover:underline"
                  onClick={closeModal}
                >
                  Sign Up
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 