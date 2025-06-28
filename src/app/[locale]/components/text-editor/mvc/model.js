// This file will be moved to src/app/[locale]/components/text-editor/mvc/model.js
import { db } from "@/app/[locale]/utils/firebsae";
import { collection, addDoc, doc, getDoc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';

export async function savePostToDB(postData) {
  return await addDoc(collection(db, "posts"), postData);
}

export async function saveDraftToDB(draftData) {
  const docRef = await addDoc(collection(db, "drafts"), draftData);
  return docRef.id;
}

export async function uploadImageToAPI({ file, locale }) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`/${locale}/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Upload failed");
  }
  return await response.json();
}

export async function getDraftById(postid) {
  const docRef = doc(db, "drafts", postid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function updateDraftInDB(postid, draftData) {
  const docRef = doc(db, "drafts", postid);
  await setDoc(docRef, draftData, { merge: true });
}

// Fetch all drafts for a specific author (by email)
export async function getDraftsByAuthor(authorEmail) {
  const draftsRef = collection(db, "drafts");
  const q = query(draftsRef, where("authorName", "==", authorEmail));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch all drafts (no filter)
export async function getAllDrafts() {
  const draftsRef = collection(db, "drafts");
  const querySnapshot = await getDocs(draftsRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch all published posts
export async function getAllPublishedPosts() {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("status", "==", "published"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Delete a draft by its document ID
export async function deleteDraftById(postid) {
  const docRef = doc(db, "drafts", postid);
  await deleteDoc(docRef);
}

// Add more data functions as needed 