'use client'

import { useState, useEffect } from 'react';
import { 
  FiEdit3, 
  FiSearch, 
  FiEye, 
  FiTag, 
  FiLink, 
  FiImage, 
  FiGlobe, 
  FiTwitter, 
  FiCopy, 
  FiDownload,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

// Enhanced SEO generation function
export function generateSeo({
  title = 'Tech Blog | Stay updated with the latest in web development',
  description = 'Explore insightful articles on Next.js, React, and modern web development trends. Stay current with best practices and expert advice.',
  keywords = '',
  images = [
    {
      url: '/blog_cover.png',
      width: 1200,
      height: 630,
      alt: 'Tech Blog Cover'
    }
  ],
  siteName = 'DevBlog',
  metadataBase = new URL("https://multilang-nine.vercel.app/en"),
  type = 'article',
  locale = 'en_US',
  slug = ''
} = {}) {
  return {
    title: {
      default: title,
      template: `%s - ${title.split('|')[0].trim()}`
    },
    description,
    keywords,
    metadataBase,
    alternates: {
      canonical: slug ? `${metadataBase.origin}/${slug}` : metadataBase.origin
    },
    openGraph: {
      title,
      description,
      images,
      type,
      siteName,
      locale,
      url: slug ? `${metadataBase.origin}/${slug}` : metadataBase.origin
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

// SEO Score Calculator
const calculateSeoScore = (seoData) => {
  let score = 0;
  const issues = [];
  const suggestions = [];

  // Title checks
  if (seoData.title) {
    if (seoData.title.length >= 30 && seoData.title.length <= 60) {
      score += 20;
    } else if (seoData.title.length > 0) {
      score += 10;
      if (seoData.title.length < 30) {
        issues.push('Title is too short (less than 30 characters)');
      } else {
        issues.push('Title is too long (more than 60 characters)');
      }
    } else {
      issues.push('Title is missing');
    }
  } else {
    issues.push('Title is required');
  }

  // Description checks
  if (seoData.description) {
    if (seoData.description.length >= 120 && seoData.description.length <= 160) {
      score += 20;
    } else if (seoData.description.length > 0) {
      score += 10;
      if (seoData.description.length < 120) {
        issues.push('Description is too short (less than 120 characters)');
      } else {
        issues.push('Description is too long (more than 160 characters)');
      }
    }
  } else {
    issues.push('Description is required');
  }

  // Keywords check
  if (seoData.keywords && seoData.keywords.trim()) {
    const keywordCount = seoData.keywords.split(',').filter(k => k.trim()).length;
    if (keywordCount >= 3 && keywordCount <= 5) {
      score += 15;
    } else if (keywordCount > 0) {
      score += 8;
      if (keywordCount < 3) {
        suggestions.push('Consider adding more keywords (3-5 recommended)');
      } else {
        suggestions.push('Consider reducing keywords (3-5 recommended)');
      }
    }
  } else {
    suggestions.push('Add focus keywords for better SEO');
  }

  // Slug check
  if (seoData.slug && seoData.slug.trim()) {
    if (seoData.slug.length <= 50 && /^[a-z0-9-]+$/.test(seoData.slug)) {
      score += 15;
    } else {
      score += 8;
      if (seoData.slug.length > 50) {
        issues.push('URL slug is too long');
      }
    }
  } else {
    issues.push('URL slug is missing');
  }

  // Image check
  if (seoData.imageUrl && seoData.imageAlt) {
    score += 15;
  } else if (seoData.imageUrl) {
    score += 8;
    suggestions.push('Add alt text for your image');
  } else {
    suggestions.push('Add a social media image');
  }

  // Bonus points
  if (seoData.siteName && seoData.siteName.trim()) score += 5;
  if (seoData.locale) score += 5;
  if (seoData.type) score += 5;

  return { score: Math.min(score, 100), issues, suggestions };
};

// Enhanced SEO Component
const SEOComponent = () => {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    slug: '',
    siteName: 'DevBlog',
    imageUrl: '/blog_cover.png',
    imageAlt: 'Blog Cover',
    type: 'article',
    locale: 'en_US'
  });

  const [generatedSeo, setGeneratedSeo] = useState(null);
  const [seoScore, setSeoScore] = useState({ score: 0, issues: [], suggestions: [] });
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate SEO score whenever data changes
  useEffect(() => {
    setSeoScore(calculateSeoScore(seoData));
  }, [seoData]);

  const handleInputChange = (field, value) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateSeo = () => {
    const seoConfig = generateSeo({
      title: seoData.title || 'Tech Blog | Stay updated with the latest in web development',
      description: seoData.description || 'Explore insightful articles on Next.js, React, and modern web development trends.',
      keywords: seoData.keywords,
      images: [{
        url: seoData.imageUrl,
        width: 1200,
        height: 630,
        alt: seoData.imageAlt
      }],
      siteName: seoData.siteName,
      type: seoData.type,
      locale: seoData.locale,
      slug: seoData.slug
    });
    setGeneratedSeo(seoConfig);
  };

  const copyToClipboard = async () => {
    if (generatedSeo) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(generatedSeo, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const downloadSeoFile = () => {
    if (generatedSeo) {
      const dataStr = JSON.stringify(generatedSeo, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'seo-metadata.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  // Format date only on client-side
  const formattedDate = mounted ? new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <FiSearch className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            SEO Optimization
          </h3>
        </div>
        
        {/* SEO Score Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getScoreBackground(seoScore.score)} text-white text-sm font-semibold`}>
            Score: {seoScore.score}/100
          </div>
        </div>
      </div>

      {/* SEO Issues and Suggestions */}
      {(seoScore.issues.length > 0 || seoScore.suggestions.length > 0) && (
        <div className="space-y-3">
          {seoScore.issues.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-red-800 mb-2">
                <FiAlertCircle className="w-4 h-4" />
                Issues to Fix
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                {seoScore.issues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {seoScore.suggestions.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-800 mb-2">
                <FiCheckCircle className="w-4 h-4" />
                Suggestions
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {seoScore.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <FiTag className="w-4 h-4" />
            Meta Title
          </label>
          <input
            type="text"
            value={seoData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Craft an engaging title (30-60 characters)"
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 text-slate-800 placeholder-slate-400"
            maxLength={60}
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Recommended: 30-60 characters</span>
            <span className={seoData.title.length > 60 ? 'text-red-500' : seoData.title.length < 30 ? 'text-yellow-500' : 'text-green-500'}>
              {seoData.title.length}/60
            </span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <FiEdit3 className="w-4 h-4" />
            Meta Description
          </label>
          <textarea
            value={seoData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Write a compelling description that encourages clicks (120-160 characters)"
            rows={3}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none"
            maxLength={160}
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Recommended: 120-160 characters</span>
            <span className={seoData.description.length > 160 ? 'text-red-500' : seoData.description.length < 120 ? 'text-yellow-500' : 'text-green-500'}>
              {seoData.description.length}/160
            </span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <FiTag className="w-4 h-4" />
            Focus Keywords
          </label>
          <input
            type="text"
            value={seoData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 text-slate-800 placeholder-slate-400"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Separate keywords with commas (3-5 recommended)</span>
            <span className="text-slate-500">
              {seoData.keywords ? seoData.keywords.split(',').filter(k => k.trim()).length : 0} keywords
            </span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <FiLink className="w-4 h-4" />
            URL Slug
          </label>
          <div className="relative">
            <input
              type="text"
              value={seoData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-'))}
              placeholder="your-awesome-blog-post"
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 text-slate-800 placeholder-slate-400"
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Automatically formatted for SEO-friendly URLs</span>
            <span className={seoData.slug.length > 50 ? 'text-red-500' : 'text-slate-500'}>
              {seoData.slug.length}/50
            </span>
          </div>
        </div>

        {/* Advanced SEO Settings */}
        <div className="border-t border-slate-200/60 pt-5">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
            <FiGlobe className="w-4 h-4" />
            Advanced Settings
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={seoData.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="w-full px-3 py-2 bg-white/60 border border-slate-200/50 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all duration-200 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Content Type
              </label>
              <select
                value={seoData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-white/60 border border-slate-200/50 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all duration-200 text-sm"
              >
                <option value="article">Article</option>
                <option value="website">Website</option>
                <option value="blog">Blog</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <FiImage className="w-4 h-4" />
                Social Media Image URL
              </label>
              <input
                type="text"
                value={seoData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="/blog_cover.png"
                className="w-full px-3 py-2 bg-white/60 border border-slate-200/50 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all duration-200 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Image Alt Text
              </label>
              <input
                type="text"
                value={seoData.imageAlt}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                placeholder="Descriptive alt text"
                className="w-full px-3 py-2 bg-white/60 border border-slate-200/50 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Generate SEO Button */}
        <div className="pt-4">
          <button
            onClick={handleGenerateSeo}
            disabled={seoScore.score < 40}
            className={`w-full px-6 py-3 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg ${
              seoScore.score < 40 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/25'
            }`}
          >
            {seoScore.score < 40 ? 'Fix Issues to Generate SEO' : 'Generate SEO Metadata'}
          </button>
        </div>

        {/* Generated SEO Preview */}
        {generatedSeo && (
          <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100/80 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between mb-3">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FiTwitter className="w-4 h-4" />
                Generated SEO Metadata
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs flex items-center gap-1"
                >
                  <FiCopy className="w-3 h-3" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadSeoFile}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs flex items-center gap-1"
                >
                  <FiDownload className="w-3 h-3" />
                  Download
                </button>
              </div>
            </div>
            <pre className="text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap bg-white/50 p-3 rounded-lg">
              {JSON.stringify(generatedSeo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock TextEditor component for demonstration
const TextEditor = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        Blog Title
      </label>
      <input
        type="text"
        placeholder="Enter your blog title..."
        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 text-slate-800 placeholder-slate-400"
      />
    </div>
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        Content
      </label>
      <textarea
        placeholder="Start writing your blog post..."
        rows={12}
        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none"
      />
    </div>
  </div>
);

const MobileTabbedEditor = ({ 
  TextEditor: PassedTextEditor, 
  title = "", 
  authorName = "", 
  authorImage = "", 
  editor = null,
  onContentChange = () => {} // Add this prop
}) => {
  // All hooks must be at the top level
  const [activeTab, setActiveTab] = useState('blog');
  const [editorContent, setEditorContent] = useState('');
  const [mounted, setMounted] = useState(false);
  const [previewMounted, setPreviewMounted] = useState(false);
  const EditorComponent = PassedTextEditor || TextEditor;

  useEffect(() => {
    setMounted(true);
    setPreviewMounted(true);
  }, []);

  useEffect(() => {
    if (editor) {
      const content = editor.getHTML();
      setEditorContent(content);
    }
  }, [editor, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
    onContentChange(content);
  };

  const tabs = [
    { id: 'blog', label: 'Editor', icon: FiEdit3 },
    { id: 'seo', label: 'SEO', icon: FiSearch },
    { id: 'preview', label: 'Preview', icon: FiEye }
  ];

  // Move renderPreview to a regular function without hooks
  const renderPreview = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
          <FiEye className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Live Preview
        </h3>
      </div>
      
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
            {title || "Untitled Post"}
          </h1>
          
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
            <div className="flex-shrink-0">
              {authorImage ? (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <span className="text-white font-semibold text-lg">
                    {authorName ? authorName.charAt(0).toUpperCase() : "A"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900">
                {authorName || "Anonymous"}
              </div>
              <div className="text-sm text-gray-500">
                {previewMounted ? new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''} • {previewMounted ? Math.ceil((editorContent?.length || 0) / 1500) : '0'} min read
              </div>
            </div>
          </div>
          
          <div 
            className="prose prose-sm md:prose-base max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold 
              prose-p:text-gray-700 prose-p:leading-relaxed 
              prose-strong:text-gray-900 prose-strong:font-semibold 
              prose-em:text-gray-700 prose-em:italic 
              prose-ul:space-y-1 prose-ol:space-y-1 
              prose-li:text-gray-700 
              prose-img:rounded-lg prose-img:mx-auto 
              prose-img:shadow-md prose-img:my-4"
            dangerouslySetInnerHTML={{ 
              __html: editorContent || '<p class="text-gray-500 italic">Start writing to see your preview...</p>' 
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="block md:hidden mb-6">
        <div className="flex bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl rounded-2xl p-1.5 border border-white/40 shadow-lg shadow-slate-900/5">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/70 hover:shadow-sm'
                }`}
              >
                <IconComponent className="text-lg mb-1.5" />
                <span className="tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="block md:hidden">
        <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl shadow-slate-900/10 p-6 min-h-[500px]">
          {activeTab === 'blog' && (
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <FiEdit3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Blog Editor
                </h3>
              </div>
              <EditorComponent 
                onChange={handleEditorChange}
                content={editorContent}
                editor={editor}
              />
            </div>
          )}

          {activeTab === 'seo' && <SEOComponent />}
          
          {activeTab === 'preview' && renderPreview()}
        </div>
      </div>

      {/* Desktop version remains the same */}
      <div className="hidden md:block">
        <div className="bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl shadow-slate-900/10 p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
              <FiEdit3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Blog Editor
            </h2>
          </div>
          <EditorComponent />
        </div>
      </div>
    </div>
  );
};

export default MobileTabbedEditor; 