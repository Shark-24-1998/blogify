import { handleSaveDraft, loadDraft, handlePublish } from './postController';
import { uploadImagesToStorage } from '@/models/imageModel';

// Create a functional controller that returns state and actions
export function createTextEditorController() {
  let state = {
    title: '',
    authorName: '',
    content: '',
    authorImage: '',
    postid: null,
    saveStatus: '',
    publishStatus: '',
    imageUploading: false,
    uploadError: null
  };

  let listeners = [];

  // State management
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const notifyListeners = () => {
    listeners.forEach(listener => listener(state));
  };

  const setState = (newState) => {
    state = { ...state, ...newState };
    notifyListeners();
  };

  // Title management
  const setTitle = (title) => {
    setState({ title });
  };

  // Author management
  const setAuthorName = (authorName) => {
    setState({ authorName });
  };

  const setAuthorImage = (authorImage) => {
    setState({ authorImage });
  };

  // Content management
  const setContent = (content) => {
    setState({ content });
  };

  // Post ID management
  const setPostId = (postid) => {
    setState({ postid });
  };

  // Draft operations
  const saveDraft = async (router, setPostid, userEmail) => {
    const { postid, title, content, authorName } = state;
    
    const newPostId = await handleSaveDraft({
      postid,
      title,
      content,
      authorName,
      userEmail,
      setSaveStatus: (status) => setState({ saveStatus: status }),
      router,
      setPostid
    });

    if (newPostId && !postid) {
      setState({ postid: newPostId });
      setPostid(newPostId);
    }

    return newPostId;
  };

  const loadDraftData = async () => {
    const { postid } = state;
    if (!postid) return null;

    const draftData = await loadDraft({ postid });
    if (draftData) {
      setState({
        title: draftData.title || '',
        authorName: draftData.authorName || '',
        content: draftData.content || ''
      });
    }
    return draftData;
  };

  // Publishing
  const publishPost = async (router, userEmail) => {
    const { postid, title, content, authorName, authorImage } = state;
    
    await handlePublish({
      postid,
      title,
      content,
      authorName,
      authorImage,
      userEmail,
      setPublishStatus: (status) => setState({ publishStatus: status }),
      router
    });
  };

  // Image upload
  const uploadImages = async (files, locale, insertImageCallback) => {
    setState({ imageUploading: true, uploadError: null });

    try {
      await uploadImagesToStorage({
        files,
        locale,
        onProgress: (progress) => {
          // Handle upload progress if needed
        },
        onComplete: (results) => {
          results.forEach(({ url, id }) => {
            insertImageCallback({ url, id });
          });
        }
      });
    } catch (error) {
      setState({ uploadError: error.message });
    } finally {
      setState({ imageUploading: false });
    }
  };

  // Auto-save functionality
  const autoSave = (content, router, setPostid, userEmail) => {
    const { title, authorName } = state;
    
    // Only auto-save if we have some content and a title
    if (content.trim() && title.trim()) {
      setContent(content);
      saveDraft(router, setPostid, userEmail);
    }
  };

  // Validation
  const validateForPublish = () => {
    const { title, content } = state;
    return title.trim() && content.trim();
  };

  // Reset state
  const reset = () => {
    setState({
      title: '',
      authorName: '',
      content: '',
      authorImage: '',
      postid: null,
      saveStatus: '',
      publishStatus: '',
      imageUploading: false,
      uploadError: null
    });
  };

  // Get current state
  const getState = () => state;

  return {
    // State getter
    getState,
    
    // Actions
    setTitle,
    setAuthorName,
    setAuthorImage,
    setContent,
    setPostId,
    saveDraft,
    loadDraftData,
    publishPost,
    uploadImages,
    autoSave,
    validateForPublish,
    reset,
    
    // Subscription
    subscribe
  };
} 