"use client";

import { useAuth } from '../../hooks/useAuth';
import AuthRequiredModal from './AuthRequiredModal';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ 
  children, 
  message = "You must be signed in to access this page.",
  showModal = true 
}) {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!loading && !user && showModal) {
      setShowAuthModal(true);
    }
  }, [user, loading, showModal]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show auth modal if not authenticated
  if (!user && showModal) {
    return (
      <AuthRequiredModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={() => {
          setShowAuthModal(false);
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("open-signin-modal"));
          }, 200);
        }}
        message={message}
      />
    );
  }

  // Show children if authenticated or if no modal is required
  return children;
} 