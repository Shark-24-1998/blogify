import { useState, useCallback } from 'react';
import { handleImageDelete } from '@/controllers/imageController';

export function useImageDelete() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteImage = useCallback(async ({ imageId, deleteNode }) => {
    if (!imageId) {
      setDeleteError('No image ID found!');
      return false;
    }
    
    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      const success = await handleImageDelete({ imageId, deleteNode });
      if (!success) {
        setDeleteError('Failed to delete image');
      }
      return success;
    } catch (error) {
      setDeleteError(error.message);
      console.error('Image delete error:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setDeleteError(null);
  }, []);

  return {
    deleteImage,
    isDeleting,
    deleteError,
    clearError
  };
} 