import { useState, useEffect, useCallback, useRef } from 'react';
import { createTextEditorController } from '@/controllers/textEditorController';
import { useAuth } from './useAuth';

export function useTextEditor(initialPostid = null) {
  const { user } = useAuth();
  const [controller] = useState(() => createTextEditorController());
  const [state, setState] = useState(controller.getState());
  const [postid, setPostid] = useState(initialPostid);

  // Subscribe to controller state changes
  useEffect(() => {
    const unsubscribe = controller.subscribe(setState);
    return unsubscribe;
  }, [controller]);

  // Initialize postid in controller
  useEffect(() => {
    if (initialPostid) {
      controller.setPostId(initialPostid);
    }
  }, [initialPostid, controller]);

  // Title management
  const setTitle = useCallback((title) => {
    controller.setTitle(title);
  }, [controller]);

  // Author management
  const setAuthorName = useCallback((authorName) => {
    controller.setAuthorName(authorName);
  }, [controller]);

  const setAuthorImage = useCallback((authorImage) => {
    controller.setAuthorImage(authorImage);
  }, [controller]);

  // Content management
  const setContent = useCallback((content) => {
    controller.setContent(content);
  }, [controller]);

  // Draft operations
  const saveDraft = useCallback(async (router) => {
    return await controller.saveDraft(router, setPostid, user?.email);
  }, [controller, user?.email]);

  const loadDraft = useCallback(async () => {
    return await controller.loadDraftData();
  }, [controller]);

  // Publishing
  const publishPost = useCallback(async (router) => {
    return await controller.publishPost(router, user?.email);
  }, [controller, user?.email]);

  // Image upload
  const uploadImages = useCallback(async (files, locale, insertImageCallback) => {
    return await controller.uploadImages(files, locale, insertImageCallback);
  }, [controller]);

  // Auto-save
  const autoSave = useCallback((content, router) => {
    controller.autoSave(content, router, setPostid, user?.email);
  }, [controller, user?.email]);

  // Validation
  const validateForPublish = useCallback(() => {
    return controller.validateForPublish();
  }, [controller]);

  // Reset
  const reset = useCallback(() => {
    controller.reset();
  }, [controller]);

  return {
    // State
    title: state.title,
    authorName: state.authorName,
    content: state.content,
    authorImage: state.authorImage,
    postid: state.postid,
    saveStatus: state.saveStatus,
    publishStatus: state.publishStatus,
    imageUploading: state.imageUploading,
    uploadError: state.uploadError,
    
    // Actions
    setTitle,
    setAuthorName,
    setAuthorImage,
    setContent,
    saveDraft,
    loadDraft,
    publishPost,
    uploadImages,
    autoSave,
    validateForPublish,
    reset
  };
} 