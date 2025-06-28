"use client";
import MobileTabbedEditor from "@/components/Tabs";
import TextEditor from "@/components/text-editor";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function CreatePostContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>
       
      <div className="relative z-10 flex flex-col items-center px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-10 mt-16 sm:mt-6 lg:mt-10">
        <div className="w-full max-w-10xl">
          {/* Header Section */}
         
           
          
            <MobileTabbedEditor TextEditor={TextEditor} />
        
           
          {/* Mobile Footer Spacing */}
          <div className="h-8 sm:h-12 lg:h-16"></div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePost() {
  return (
    <ProtectedRoute message="You must be signed in to create a blog post.">
      <CreatePostContent />
    </ProtectedRoute>
  );
}