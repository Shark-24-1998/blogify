import React from 'react';
import { EditorContent } from "@tiptap/react";

const EditorContainer = ({ editor, imageUploading, children }) => {
  return (
    <div className="relative z-10 bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
      {imageUploading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
          <div className="flex flex-col items-center gap-4 p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-100 animate-fade-in">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-semibold text-blue-700 tracking-wide">Uploading image...</span>
          </div>
        </div>
      )}
      <EditorContent 
        editor={editor} 
        className="min-h-[300px] md:min-h-[400px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-300 transition-all duration-200"
      />
      {children}
    </div>
  );
};

export default EditorContainer; 