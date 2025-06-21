"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

const blogs = [
  {
    title: "Next.js 15 Released!",
    description: "Explore the new features and improvements in Next.js 15.",
    slug: "nextjs-15-released",
    date: "2025-05-10",
    author: "John Doe",
    comments: 12,
    likes: 150,
    dislikes: 3,
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Understanding React Server Components",
    description: "A complete guide to React Server Components in Next.js.",
    slug: "react-server-components-guide",
    date: "2025-04-22",
    author: "Jane Smith",
    comments: 8,
    likes: 95,
    dislikes: 2,
    image:
      "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Immutability in Data Flows for Safer, Simpler Code",
    subtitle:
      "How Immutable Data Improves Reasoning, Safety, and Testability",
    slug: "immutability-in-data-flows",
    author: "Rico Fritzsche",
    date: "2025-04-28",
    readTime: "11 min read",
    comments: 3,
    likes: 142,
    dislikes: 4,
    image:
      "https://images.pexels.com/photos/31840012/pexels-photo-31840012/free-photo-of-moody-misty-forest-path-in-ocypel-poland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `...`,
  },
];

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 md:px-8 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-wide text-gray-500">The Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Learn from our content experts
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From writing to publishing, our expert team answers the biggest questions in the online content community.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            onClick={() => router.push(`/blog/${blog.slug}`)}
            className="rounded-2xl bg-gradient-to-t from-gray-100 via-gray-50 to-white hover:from-blue-300 hover:to-white shadow-sm hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] cursor-pointer overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover hover:brightness-105 transition duration-300"
            />
            <div className="p-5 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  By <span className="font-semibold">{blog.author}</span>
                </p>
                <h2 className="text-lg font-bold mb-1">{blog.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {blog.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>{blog.date}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <FaRegComment />
                    <span>{blog.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiLike />
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiDislike />
                    <span>{blog.dislikes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
