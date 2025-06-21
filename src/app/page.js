import Image from 'next/image';
import BlogShowcaseSection from './components/BlogSection';
import TrustPartner from './components/TrustPartner';
import WritersSection from './components/WriterSection';
import Offer from './components/Offer';

export default function Home() {
  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4">
              Build authority with Blogify
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Your trusted partner <br /> for industry-leading content
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              End-to-end content marketing with data-driven content strategy and high authority articles written by subject-matter experts.
            </p>
            <a
              href="#blog-highlights"
              className="text-base font-medium text-gray-800 border-b-2 border-gray-400 hover:border-gray-800 transition"
            >
              Learn more
            </a>
          </div>

          {/* Image content */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <Image
              src="/images/hero-image.png"
              alt="Hero visual"
              priority
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <TrustPartner />

      {/* Writers Section */}
      <WritersSection />
      {/* Blog Section */}

      <section id="blog-highlights">
        <BlogShowcaseSection />
      </section>

      {/* What do we offer */}
      <Offer />


    </div>
  );
}
