"use client";
import { useState } from "react";
import MobileTabbedEditor from "../components/Tabs";
import TextEditor from "../components/text-editor";
import { useAuth } from "../components/auth/AuthProvider";
import AuthRequiredModal from "../components/auth/AuthRequiredModal";

export default function CreatePost({}) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!user);

  // Function to trigger sign in modal in header
  const handleSignIn = () => {
    setShowAuthModal(false); // Close the modal first
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-signin-modal"));
    }, 200); // 200ms delay
  };

  if (!user) {
    return (
      <AuthRequiredModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={handleSignIn}
        message="You must be signed in to create a blog post."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>
       
      <div className="relative z-10 flex flex-col items-center px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-16 mt-16 sm:mt-6 lg:mt-10">
        <div className="w-full max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 sm:ml-8 lg:mb-12 pt-4 sm:pt-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4 px-2 ">
              Create Blog Post  
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xs sm:max-w-md lg:max-w-2xl mx-auto px-4 leading-relaxed">
              Craft your story with our powerful editor featuring rich formatting, media support, and intuitive controls.
            </p>
          </div>
           
          {/* Editor Container */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/50 shadow-lg sm:shadow-xl shadow-gray-900/10 p-3 sm:p-4 lg:p-6 mx-auto max-w-6xl">
            <MobileTabbedEditor TextEditor={TextEditor} />
          </div>
           
          {/* Mobile Footer Spacing */}
          <div className="h-8 sm:h-12 lg:h-16"></div>
        </div>
      </div>
    </div>
  );
}