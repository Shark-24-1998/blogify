import { 
  FaPen, 
  FaRocket, 
  FaGlobe, 
  FaChartBar, 
  FaPalette, 
  FaLock 
} from 'react-icons/fa';
import Link from 'next/link';
import BlogShowcaseSection from '../components/BlogSection';
import AnimatedCounter from '../components/AnimatedCounter';





export default function AboutPage() {
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-500 to-purple-600">
        {/* Floating Elements */}
        <div className="absolute w-full h-full overflow-hidden">
          <div className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full top-1/5 left-1/10 animate-bounce" 
               style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute w-30 h-30 bg-white bg-opacity-10 rounded-full top-3/5 right-1/10 animate-bounce" 
               style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
          <div className="absolute w-15 h-15 bg-white bg-opacity-10 rounded-full bottom-1/5 left-1/5 animate-bounce" 
               style={{ animationDelay: '4s', animationDuration: '6s' }}></div>
        </div>

        <div className="text-center text-white z-10 max-w-4xl px-5">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
            BLOGIFY
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
            Where Stories Come to Life
          </p>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Empowering creators worldwide to share their unique perspectives, build communities, 
            and make their mark in the digital storytelling landscape.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white relative z-10">
        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Blogify?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the features that make Blogify the perfect platform for modern storytellers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Feature Cards */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="w-15 h-15 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <FaPen />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Intuitive Editor
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Write with our distraction-free, powerful editor. Rich formatting, media embedding, 
                  and real-time collaboration make content creation effortless.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="w-15 h-15 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <FaRocket />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Built for speed and performance. Your readers will love the fast loading times 
                  and smooth browsing experience across all devices.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="w-15 h-15 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <FaGlobe />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Global Reach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with readers worldwide. Built-in SEO optimization and social sharing 
                  tools help your content reach the right audience.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="w-15 h-15 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <FaChartBar />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Smart Analytics
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Understand your audience with detailed insights. Track engagement, growth trends, 
                  and optimize your content strategy.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="w-15 h-15 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <FaPalette />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Beautiful Themes
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose from stunning, responsive themes or customize your own. Make your blog 
                  reflect your unique style and brand.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="w-15 h-15 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <FaLock />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your content is safe with enterprise-grade security, automatic backups, 
                  and 99.9% uptime guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
              <div className="p-5">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={50} suffix="K+"  />
                </div>
                <div className="text-base md:text-lg opacity-90">Active Bloggers</div>
              </div>
              <div className="p-5">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={2} suffix="M+"  />
                </div>
                <div className="text-base md:text-lg opacity-90">Published Posts</div>
              </div>
              <div className="p-5">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={15} suffix="M+"  />
                </div>
                <div className="text-base md:text-lg opacity-90">Monthly Readers</div>
              </div>
              <div className="p-5">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={99.9} suffix="%"  />
                </div>
                <div className="text-base md:text-lg opacity-90">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Get started with Blogify in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                  1
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Sign Up
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create your account in seconds. Choose your unique blog URL and get started immediately.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                  2
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Customize
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Select a beautiful theme and customize it to match your style. Make your blog uniquely yours.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                  3
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Create
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Write your first post using our intuitive editor. Add images, videos, and rich formatting with ease.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                  4
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Publish
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Share your story with the world. Optimize for search engines and promote across social media.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Showcase Section */}
        <BlogShowcaseSection />

        {/* Contact Section */}
        <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20 md:py-24 relative overflow-hidden">
          {/* Background Shapes */}
          <div className="absolute w-full h-full top-0 left-0">
            <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-white bg-opacity-10 rounded-full top-1/10 left-1/10 animate-pulse" 
                 style={{ animationDuration: '8s' }}></div>
            <div className="absolute w-36 h-36 md:w-48 md:h-48 bg-white bg-opacity-10 rounded-full bottom-1/5 right-1/6 animate-pulse" 
                 style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
              Have Questions?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
             {` We're here to help you succeed on your blogging journey. Whether you need technical support, 
              have feature requests, or want to share feedback, our team is ready to assist you.`}
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-indigo-600 px-10 py-4 md:px-12 md:py-5 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
              <span className="relative">Get in Touch</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}