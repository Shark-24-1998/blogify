import { 
  saveDraftToDB, 
  updateDraftInDB, 
  getDraftById, 
  savePostToDB,
  updatePostInDB
} from '@/models/postModel';

export async function handleSaveDraft({ postid, title, content, authorName, userEmail, setSaveStatus, router, setPostid }) {
  setSaveStatus("saving");
  
  const draftData = {
    title: title.trim() || 'Untitled Draft',
    content,
    authorName: authorName.trim(),
    userEmail: userEmail,
    status: 'draft',
    savedAt: new Date().toISOString()
  };
  
  try {
    let newPostId = postid;
    
    if (postid) {
      console.log("Updating existing draft:", postid);
      await updateDraftInDB(postid, draftData);
    } else {
      console.log("Creating new draft");
      newPostId = await saveDraftToDB(draftData);
      router.replace(`?postid=${newPostId}`);
    }
    
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
    
    if (newPostId && typeof newPostId === 'object' && newPostId.id) {
      setPostid(newPostId.id);
    } else if (newPostId && typeof newPostId === 'string') {
      setPostid(newPostId);
    }
    
    console.log("Setting postid in state:", newPostId, typeof newPostId);
    return newPostId || postid;
  } catch (error) {
    console.error("Error saving draft:", error);
    setSaveStatus("error");
    setTimeout(() => setSaveStatus(""), 3000);
    return null;
  }
}

export async function loadDraft({ postid }) {
  if (!postid) return null;
  return await getDraftById(postid);
}

export async function handlePublish({ postid, title, content, authorName, authorImage, userEmail, setPublishStatus, router }) {
  if (!title.trim() || !content.trim()) {
    alert('Please add a title and content for your blog post');
    return;
  }
  
  setPublishStatus("publishing");
  
  const postData = {
    title: title.trim(),
    content,
    authorName: authorName.trim() || 'Anonymous',
    authorImage,
    userEmail: userEmail,
    status: 'published',
    updatedAt: new Date().toISOString()
  };

  // If we have a postid, this is an existing draft being published
  if (postid) {
    postData.createdAt = new Date().toISOString();
  } else {
    postData.createdAt = new Date().toISOString();
  }
  
  try {
    if (postid) {
      // Update existing draft to published
      await updatePostInDB(postid, postData);
    } else {
      // Create new published post
      await savePostToDB(postData);
    }
    
    setPublishStatus("published");
    setTimeout(() => {
      setPublishStatus("");
      router.push('/blog');
    }, 2000);
  } catch (error) {
    setPublishStatus("error");
    setTimeout(() => {
      setPublishStatus("");
    }, 3000);
  }
} 