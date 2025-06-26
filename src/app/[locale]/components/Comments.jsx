"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import AuthRequiredModal from "./auth/AuthRequiredModal";

export default function CommentsSidebar({ isOpen, onClose, comments, addComment }) {
    const sidebarRef = useRef();
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    // Function to trigger sign in modal in header
    const handleSignIn = () => {
        window.dispatchEvent(new CustomEvent("open-signin-modal"));
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ease-in-out 
  ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            {/* Sidebar Panel */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-xl 
  transition-transform duration-700 ease-in-out
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-lg font-semibold">Comments</h2>
                    <button onClick={onClose} className="text-xl hover:text-red-500">&times;</button>
                </div>

                <div className="p-4 space-y-2 overflow-y-auto max-h-[65vh]">
                    {comments.length === 0 ? (
                        <p className="text-gray-500">No comments yet.</p>
                    ) : (
                        comments.map((c, i) => (
                            <div key={i} className="bg-gray-100 p-2 rounded text-sm">{c}</div>
                        ))
                    )}
                </div>

                {/* Protected comment form */}
                {user ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const value = e.target.comment.value.trim();
                            if (value) {
                                addComment(value);
                                e.target.reset();
                            }
                        }}
                        className="border-t p-4"
                    >
                        <textarea
                            name="comment"
                            placeholder="Write a comment..."
                            className="w-full border rounded p-2 text-sm"
                            rows={3}
                            required
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                            Post
                        </button>
                    </form>
                ) : (
                    <>
                        <AuthRequiredModal
                            open={true}
                            onClose={() => setShowAuthModal(false)}
                            onSignIn={handleSignIn}
                            message="You must be signed in to post a comment."
                        />
                    </>
                )}
            </div>
        </>
    );
}
