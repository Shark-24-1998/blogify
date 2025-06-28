import React from 'react';
import { Upload } from "lucide-react";

const AuthorSection = ({ 
  authorName, 
  setAuthorName, 
  authorImage, 
  fileInputRef, 
  handleAuthorImageUpload 
}) => {
  const triggerFileInput = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleAuthorImageUpload}
              className="hidden"
              ref={fileInputRef}
              id="author-image-upload"
            />
            {authorImage ? (
              <img
                src={authorImage}
                alt={authorName || "Author"}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-lg md:text-xl">
                  {authorName ? authorName.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm cursor-pointer"
              title="Upload author image"
            >
              <Upload className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-grow">
          <div className="space-y-1">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Author name..."
              className="w-full sm:max-w-xs text-sm md:text-base font-medium text-gray-900 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none pb-1 placeholder:text-gray-400 transition-colors duration-200"
            />
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
              <span>{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span className="text-gray-400">Draft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSection; 