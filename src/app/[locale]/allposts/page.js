"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import { CheckCircle, Loader, Edit, Trash2 } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

function AllPostsContent() {
  const { locale } = useParams();
  const { 
    sortedPosts,
    isLoading, 
    deletingId, 
    error, 
    deletePost 
  } = usePosts();

  const renderPostCard = (post) => {
    const isPublished = post.status === 'published';
    const isDraft = post.status === 'draft';
    const date = isPublished ? post.createdAt : post.savedAt;
    
    return (
      <div
        key={post.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100"
        style={{ 
          borderLeft: isPublished ? "4px solid #22c55e" : "4px solid #2563eb" 
        }}
      >
        <div className="flex-1">
          <div className="text-base sm:text-lg font-semibold text-gray-900">
            {post.title}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 mt-1">
            By {post.authorName} &middot; {formatDate(date)}
            {isDraft && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Draft
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 sm:mt-0 items-center">
          <Link
            href={`/${locale}/blog/${post.slug || post.id}`}
            className="px-4 sm:px-5 py-2 rounded-lg bg-gray-100 text-blue-600 font-medium hover:bg-blue-50 transition text-sm sm:text-base"
          >
            View
          </Link>
          
          <Link
            href={`/${locale}/create-post?postid=${post.id}`}
            className="px-4 sm:px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm sm:text-base flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          
          <button
            onClick={() => deletePost(post.id)}
            disabled={deletingId === post.id}
            className="px-4 sm:px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm sm:text-base flex items-center gap-2"
          >
            {deletingId === post.id ? (
              <>
                <Loader className="animate-spin w-4 h-4" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
          
          {isPublished && (
            <span className="flex items-center gap-1 text-green-600 font-medium ml-2">
              <CheckCircle className="w-4 h-4" />
              Published
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-20 sm:pt-24 pb-24 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-center sm:text-left w-full">
          All Posts
        </h1>
        <Link
          href={`/${locale}/create-post`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 sm:px-6 py-2 rounded-lg shadow transition-all duration-150 w-full sm:w-auto text-center"
        >
          + New Post
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <Loader className="animate-spin w-8 h-8 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Loading posts...</p>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-6">
          {/* Posts List */}
          {sortedPosts.map(renderPostCard)}

          {sortedPosts.length === 0 && !isLoading && (
            <div className="text-center text-gray-400 py-20 text-lg">
              No posts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AllPostsPage() {
  return (
    <ProtectedRoute message="You must be signed in to view your posts.">
      <AllPostsContent />
    </ProtectedRoute>
  );
}
