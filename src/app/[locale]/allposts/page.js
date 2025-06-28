"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllDrafts, getAllPublishedPosts, deleteDraftById } from "../components/text-editor/mvc/model";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CheckCircle, Loader, List } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

export default function AllPostsPage() {
  const { locale } = useParams();
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
        setDrafts([]);
        setPublished([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const [draftsData, publishedData] = await Promise.all([
        getAllDrafts(),
        getAllPublishedPosts()
      ]);
      setDrafts(draftsData);
      setPublished(publishedData);
    }
    fetchData();
  }, []);

  // Handler to delete a draft
  async function handleDeleteDraft(id) {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;
    setDeletingId(id);
    try {
      await deleteDraftById(id);
      setDrafts((prev) => prev.filter((draft) => draft.id !== id));
    } catch (err) {
      alert("Failed to delete draft.");
    } finally {
      setDeletingId(null);
    }
  }

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

      {!userEmail ? (
        <div className="text-center text-gray-400 py-20 text-lg">
          Please log in to see your drafts.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Published Posts */}
          {published.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100"
              style={{ borderLeft: "4px solid #22c55e" }} // green accent for published
            >
              <div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{post.title}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  By {post.authorName} &middot; {formatDate(post.createdAt)}
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0 items-center">
                <Link
                  href={`/${locale}/blog/${post.slug || post.id}`}
                  className="px-4 sm:px-5 py-2 rounded-lg bg-gray-100 text-blue-600 font-medium hover:bg-blue-50 transition text-sm sm:text-base"
                >
                  View
                </Link>
                <span className="flex items-center gap-1 text-green-600 font-medium ml-2">
                  <CheckCircle className="w-4 h-4" />
                  Published
                </span>
              </div>
            </div>
          ))}

          {/* Drafts */}
          {drafts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100"
              style={{ borderLeft: "4px solid #2563eb" }}
            >
              <div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{post.title}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  By {post.authorName} &middot; {formatDate(post.savedAt)}
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Link
                  href={`/${locale}/blog/${post.slug || post.id}`}
                  className="px-4 sm:px-5 py-2 rounded-lg bg-gray-100 text-blue-600 font-medium hover:bg-blue-50 transition text-sm sm:text-base"
                >
                  View
                </Link>
                <Link
                  href={`/${locale}/create-post?postid=${post.id}`}
                  className="px-4 sm:px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteDraft(post.id)}
                  disabled={deletingId === post.id}
                  className="px-4 sm:px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm sm:text-base flex items-center gap-2"
                >
                  {deletingId === post.id ? (
                    <>
                      <Loader className="animate-spin w-4 h-4" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          ))}

          {drafts.length === 0 && published.length === 0 && (
            <div className="text-center text-gray-400 py-20 text-lg">
              No posts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
