import React from 'react';
import { Save, Send, Eye } from "lucide-react";

const ActionButtons = ({ 
  onSaveDraft, 
  onPublish, 
  onPreview, 
  saveStatus, 
  publishStatus, 
  title 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4 relative z-10">
      <button 
        onClick={onSaveDraft}
        disabled={saveStatus === "saving"}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
      >
        <Save className="w-4 h-4" />
        {saveStatus === "saving" ? "Saving..." : "Save as Draft"}
      </button>
      
      <div className="flex gap-2 order-1 sm:order-2">
        {/* Show Preview button only on desktop */}
        <button
          onClick={onPreview}
          className="hidden sm:flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        
        <button 
          onClick={onPublish}
          disabled={publishStatus === "publishing" || !title.trim()}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Send className="w-4 h-4" />
          {publishStatus === "publishing" ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
};

export default ActionButtons; 