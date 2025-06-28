import { useState, useCallback } from 'react';
import { handlePublish } from '@/controllers/postController';

export function usePublish() {
  const [publishStatus, setPublishStatus] = useState(""); // "publishing", "published", "error"

  const publishPost = useCallback(async ({ title, content, authorName, authorImage, router }) => {
    return await handlePublish({
      title,
      content,
      authorName,
      authorImage,
      setPublishStatus,
      router
    });
  }, []);

  const clearStatus = useCallback(() => {
    setPublishStatus("");
  }, []);

  return {
    publishPost,
    publishStatus,
    clearStatus
  };
} 