"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRequiredModal({ open, onClose, onSignIn, message }) {
  const router = useRouter();
  if (!open) return null;

  // Handler for closing modal and redirecting home
  const handleClose = () => {
    if (onClose) onClose();
    router.push('/');
  };

  return (
    <div>
      {/* Backdrop with blur, clickable to close and redirect */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-lg transition-opacity"
        onClick={handleClose}
      />
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
        <div
          className="relative w-full max-w-sm mx-auto bg-white border border-gray-100 rounded-2xl shadow-2xl px-4 py-6 flex flex-col items-center sm:px-8 max-h-[90vh] overflow-y-auto"
          style={{ minWidth: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-extrabold mb-2 text-center text-gray-900 tracking-tight">
            Sign In Required
          </h2>
          <p className="text-gray-500 text-base mb-6 text-center">
            {message || 'You must be signed in to access this feature.'}
          </p>
          <button
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-base shadow mb-3 mt-2"
            onClick={onSignIn}
          >
            Sign In
          </button>
          <button
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-base shadow"
            onClick={handleClose}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
} 