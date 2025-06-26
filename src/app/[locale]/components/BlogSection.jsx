'use client';
import { useRouter } from 'next/navigation';

const blogs = [
  {
    title: "Next.js 15 Released!",
    description: "Explore the new features and improvements in Next.js 15.",
    slug: "nextjs-15-released",
    author: 'Christian Rigg',
    date: 'May 2, 2025',
    category: 'Web Development',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    title: "Understanding React Server Components",
    description: "A complete guide to React Server Components in Next.js.",
    slug: "react-server-components-guide",
    author: 'Christian Rigg',
    date: 'May 2, 2025',
    category: 'React',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    title: "Immutability in Data Flows for Safer, Simpler Code",
    description: "How Immutable Data Improves Reasoning, Safety, and Testability",
    slug: "immutability-in-data-flows",
    author: 'Christian Rigg',
    date: 'May 2, 2025',
    category: 'JavaScript',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

export default function BlogShowcaseSection() {
  const router = useRouter();

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-center text-[#1c1c1c] mb-4">
          The latest from the Blogify
        </h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 font-sans text-sm sm:text-base">
          From writing and editing to strategy and marketing, our expert team answers the biggest questions in online content.
        </p>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Large Card */}
          <div
            onClick={() => router.push(`/blog/${blogs[0].slug}`)}
            className="lg:col-span-2 bg-gradient-to-b from-[#c7d2fe] to-white p-6 rounded-3xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1c1c1c] mb-2">
              {blogs[0].title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{blogs[0].date}</p>
            <p className="text-sm text-gray-600 mb-4">{blogs[0].description}</p>
            <div className="flex items-center gap-2 mt-auto pt-4">
              <img src={blogs[0].image} alt="Author" className="w-8 h-8 rounded-full object-cover" />
              <div className="text-sm">
                <p className="text-gray-500">Written by</p>
                <p className="font-medium text-[#1c1c1c]">{blogs[0].author}</p>
              </div>
            </div>
          </div>

          {/* Two Right Cards */}
          <div className="flex flex-col gap-6">
            {blogs.slice(1).map((blog, i) => (
              <div
                key={i}
                onClick={() => router.push(`/blog/${blog.slug}`)}
                className="bg-gradient-to-b from-[#e5f4ff] to-white p-6 rounded-3xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <p className="text-sm text-[#4176ae] font-medium mb-1">{blog.category}</p>
                <h4 className="text-lg sm:text-xl font-serif text-[#1c1c1c] leading-snug mb-3">
                  {blog.title}
                </h4>
                <div className="flex items-center gap-2 mt-auto pt-4">
                  <img src={blog.image} alt="Author" className="w-8 h-8 rounded-full object-cover" />
                  <div className="text-sm">
                    <p className="text-gray-500">Written by</p>
                    <p className="font-medium text-[#1c1c1c]">{blog.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 w-full border border-gray-200 rounded-xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <p className="text-gray-700 text-center md:text-left text-sm">
            Get more insights from content marketing professionals
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            See more articles
          </button>
        </div>
      </div>
    </section>
  );
}
