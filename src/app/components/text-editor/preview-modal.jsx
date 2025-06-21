'use client'
import { useState } from 'react';
import { X } from 'lucide-react';

export default function PreviewModal({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  authorName, 
  authorImage,
  isMobile = false // Add this prop
}) {
  if (!isOpen) return null;

  // For mobile view, render content without modal wrapper
  const PreviewContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 leading-tight">
        {title || "Untitled Post"}
      </h1>
      
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
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
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} • {Math.ceil((content?.length || 0) / 1500)} min read
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
        dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-500 italic">Start writing to see your preview...</p>' }}
      />
    </div>
  );

  // For mobile view, return just the content
  if (isMobile) {
    return <PreviewContent />;
  }

  // For desktop view, return modal
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 pb-8 max-w-3xl mx-auto">
        <PreviewContent />
      </div>
    </div>
  );
}