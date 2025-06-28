import React from 'react';
import { CheckCircle, AlertCircle } from "lucide-react";

const StatusMessages = ({ saveStatus, publishStatus }) => {
  if (!saveStatus && !publishStatus) return null;

  return (
    <div className="mt-4 flex items-center gap-2 relative z-10">
      {saveStatus === "saving" && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Saving draft...</span>
        </div>
      )}
      {saveStatus === "saved" && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Draft saved successfully</span>
        </div>
      )}
      {saveStatus === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Failed to save draft</span>
        </div>
      )}
      
      {publishStatus === "publishing" && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Publishing post...</span>
        </div>
      )}
      {publishStatus === "published" && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Post published successfully!</span>
        </div>
      )}
      {publishStatus === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Failed to publish post</span>
        </div>
      )}
    </div>
  );
};

export default StatusMessages; 