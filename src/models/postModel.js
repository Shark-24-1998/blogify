import { 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { 
  postsCollection, 
  postDoc
} from '@/utils/firestoreRefs';

// Post operations
export async function savePostToDB(postData) {
  return await addDoc(postsCollection(), postData);
}

export async function getPostById(postId) {
  const docRef = postDoc(postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

export async function updatePostInDB(postId, postData) {
  const docRef = postDoc(postId);
  await updateDoc(docRef, postData);
}

export async function getAllPublishedPosts() {
  const postsRef = postsCollection();
  const q = query(postsRef, where("status", "==", "published"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllDrafts() {
  const postsRef = postsCollection();
  const q = query(postsRef, where("status", "==", "draft"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllPosts() {
  const postsRef = postsCollection();
  const querySnapshot = await getDocs(postsRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// User-specific post operations
export async function getUserPosts(userEmail) {
  if (!userEmail) return [];
  
  const postsRef = postsCollection();
  const q = query(postsRef, where("userEmail", "==", userEmail));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getUserDrafts(userEmail) {
  if (!userEmail) return [];
  
  const postsRef = postsCollection();
  const q = query(
    postsRef, 
    where("userEmail", "==", userEmail),
    where("status", "==", "draft")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getUserPublishedPosts(userEmail) {
  if (!userEmail) return [];
  
  const postsRef = postsCollection();
  const q = query(
    postsRef, 
    where("userEmail", "==", userEmail),
    where("status", "==", "published")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deletePostById(postId) {
  const docRef = postDoc(postId);
  await deleteDoc(docRef);
}

// Legacy draft operations (now using posts collection)
export async function saveDraftToDB(draftData) {
  const docRef = await addDoc(postsCollection(), draftData);
  return docRef.id;
}

export async function getDraftById(draftId) {
  return await getPostById(draftId);
}

export async function updateDraftInDB(draftId, draftData) {
  return await updatePostInDB(draftId, draftData);
}

export async function getDraftsByAuthor(authorEmail) {
  const postsRef = postsCollection();
  const q = query(
    postsRef, 
    where("authorName", "==", authorEmail),
    where("status", "==", "draft")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteDraftById(draftId) {
  return await deletePostById(draftId);
} 