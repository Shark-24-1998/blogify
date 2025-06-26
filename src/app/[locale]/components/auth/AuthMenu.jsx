import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useAuthModal } from './AuthModalContext';

export default function AuthMenu() {
  const { user, logOut } = useAuth();
  const { openSignIn, openSignUp } = useAuthModal();
  // Avatar dropdown hooks (always called)
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);
  // Avatar image error state (always called)
  const [imageError, setImageError] = useState(false);

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarOpen(false);
      }
    }
    if (avatarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [avatarOpen]);

  // Avatar dropdown when logged in
  if (user) {
    // Helper: get first letter of email, fallback to '?'
    const getInitial = (email) => (email && typeof email === 'string' ? email[0].toUpperCase() : '?');
    // Only show image if photoURL is a non-empty string and imageError is false
    const hasPhoto = user.photoURL && typeof user.photoURL === 'string' && user.photoURL.trim() !== '' && !imageError;
    return (
      <div className="relative flex items-center" ref={avatarRef}>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onClick={() => setAvatarOpen((v) => !v)}
          aria-label="User menu"
        >
          {hasPhoto ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white font-extrabold text-lg uppercase select-none">
              {getInitial(user.email)}
            </span>
          )}
        </button>
        {avatarOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
            <div className="px-4 py-2 text-sm text-gray-700 truncate">{user.email}</div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
              onClick={() => { logOut(); setAvatarOpen(false); }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  // Sign in/up buttons when logged out
  return (
    <div className="relative flex items-center gap-2">
      <button
        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onClick={openSignIn}
      >
        Sign In
      </button>
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onClick={openSignUp}
      >
        Sign Up
      </button>
    </div>
  );
} 