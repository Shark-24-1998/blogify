import { saveDraftToDB, updateDraftInDB, getDraftById, savePostToDB, uploadImageToAPI } from './model';

export async function handleSaveDraft({ postid, title, content, authorName, setSaveStatus, router, setPostid }) {
  setSaveStatus("saving");
  const draftData = {
    title: title.trim() || 'Untitled Draft',
    content,
    authorName: authorName.trim(),
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

export async function handlePublish({ title, content, authorName, authorImage, setPublishStatus, router }) {
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'published',
  };
  try {
    await savePostToDB(postData);
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

export async function handleImageUpload({ files, locale, insertImage, setImageUploading }) {
  if (!files || files.length === 0) return;
  if (setImageUploading) setImageUploading(true);
  try {
    for (const file of files) {
      try {
        const data = await uploadImageToAPI({ file, locale });
        if (data.url && insertImage) {
          insertImage({ url: data.url, id: data.id });
        }
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Image upload failed.");
      }
    }
  } finally {
    if (setImageUploading) setImageUploading(false);
  }
}