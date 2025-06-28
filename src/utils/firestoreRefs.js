import { db } from './firebsae';
import { collection, doc } from 'firebase/firestore';

// Collection references
export const postsCollection = () => collection(db, 'posts');
export const usersCollection = () => collection(db, 'users');

// Document references
export const postDoc = (postId) => doc(db, 'posts', postId);
export const userDoc = (userId) => doc(db, 'users', userId);

// Helper functions for common queries
export const getCollectionRef = (collectionName) => collection(db, collectionName);
export const getDocumentRef = (collectionName, documentId) => doc(db, collectionName, documentId); 