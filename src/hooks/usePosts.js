import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllPosts, deletePostById } from '@/models/postModel';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  // Computed properties for drafts and published posts
  const drafts = useMemo(() => 
    posts.filter(post => post.status === 'draft'), 
    [posts]
  );
  
  const published = useMemo(() => 
    posts.filter(post => post.status === 'published'), 
    [posts]
  );

  // Sorted posts: published first, then drafts, both sorted by date (newest first)
  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => {
      // Published posts first
      if (a.status !== b.status) {
        return a.status === 'published' ? -1 : 1;
      }
      
      // Then sort by date (newest first)
      const dateA = new Date(a.createdAt || a.savedAt || 0);
      const dateB = new Date(b.createdAt || b.savedAt || 0);
      return dateB - dateA;
    });
  }, [posts]);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete post (works for both drafts and published posts)
  const deletePost = useCallback(async (id) => {
    const post = posts.find(p => p.id === id);
    const postType = post?.status === 'published' ? 'published post' : 'draft';
    
    if (!window.confirm(`Are you sure you want to delete this ${postType}? This action cannot be undone.`)) return false;
    
    setDeletingId(id);
    try {
      await deletePostById(id);
      // Remove from posts array
      setPosts((prev) => prev.filter((post) => post.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
      return false;
    } finally {
      setDeletingId(null);
    }
  }, [posts]);

  // Update a specific post (useful for when posts are published or edited)
  const updatePost = useCallback((postId, updates) => {
    setPosts((prev) => 
      prev.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    // Raw data
    posts,
    
    // Computed properties
    drafts,
    published,
    sortedPosts,
    
    // State
    isLoading,
    deletingId,
    error,
    
    // Actions
    deletePost,
    updatePost,
    fetchPosts,
    clearError
  };
} 