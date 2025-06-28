import { useState, useCallback } from 'react';
import { handleImageUpload } from '@/controllers/imageController';

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadImages = useCallback(async ({ files, locale, insertImage }) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      await handleImageUpload({
        files,
        locale,
        insertImage,
        setImageUploading: setIsUploading
      });
    } catch (error) {
      setUploadError(error.message);
      console.error('Image upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setUploadError(null);
  }, []);

  return {
    uploadImages,
    isUploading,
    uploadError,
    clearError
  };
} 