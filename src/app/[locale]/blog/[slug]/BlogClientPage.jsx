"use client";
import { useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import CommentsSidebar from "../../components/Comments";
import ShareMenu from "../../components/ShareMenu";

export default function BlogClientPage({ blog }) {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [dislikes, setDislikes] = useState(blog.dislikes || 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commentsList, setCommentsList] = useState([
    "Great article!",
    "Really helpful.",
    "Waiting for more posts.",
  ]);

  const handleAddComment = (newComment) => {
    setCommentsList((prev) => [...prev, newComment]);
  };

  return (
    <div className="bg-gradient-to-b from-pink-100 via-pink-50 to-white min-h-screen mt-20">
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{blog.subtitle}</p>

        <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
          <div className="w-9 h-9 rounded-full bg-gray-300" />
          <span>{blog.author}</span>
          <span>• {blog.readTime}</span>
          <span>• {blog.date}</span>
        </div>

        <div className="flex items-center gap-6 text-gray-500 text-sm mt-6 border-y py-4">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setLikes(likes + 1)}>
            <BiLike size={20} />
            <span>{likes}</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
            <FaRegComment size={20} />
            <span>{blog.comments}</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setDislikes(dislikes + 1)}>
            <BiDislike size={20} />
            <span>{dislikes}</span>
          </div>

          <ShareMenu />
        </div>

        <div className="mt-8 rounded-xl overflow-hidden shadow-lg w-full">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[220px] sm:h-[300px] md:h-[380px] object-cover"
          />
        </div>

        <div
          className="prose max-w-none mt-6 text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <CommentsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          comments={commentsList}
          addComment={handleAddComment}
        />
      </div>
    </div>
  );
}
