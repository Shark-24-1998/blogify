"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useAuthModal } from './AuthModalContext';
import { FcGoogle } from 'react-icons/fc';
import AuthMenu from './AuthMenu';

export default function AuthModal() {
  const { open, formType, closeModal } = useAuthModal();
  const { user, signUp, signIn, signInWithGoogle, logOut } = useAuth();
  console.log('Header user:', user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // Automatically close modal when user logs in or signs up
  useEffect(() => {
    if (user && open) {
      closeModal();
    }
  }, [user, open, closeModal]);

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

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (formType === 'signup') {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      setEmail('');
      setPassword('');
      // closeModal(); // Now handled by effect
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

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
              onClick={signInWithGoogle}
              disabled={loading}
              className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all focus:outline-none"
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
          {/* Email form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-4 w-full">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-gray-50"
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
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-gray-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-base shadow mt-2"
            >
              {formType === 'signup' ? 'Sign Up' : 'Continue'}
            </button>
            {error && <span className="text-xs text-red-600 text-center mt-1">{error}</span>}
          </form>
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
          {user && (
            <button
              className="mt-1 text-xs text-red-600 hover:underline"
              onClick={() => {
                logOut();
                closeModal();
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
      <AuthMenu user={user} />
    </>
  );
} 