import { uploadImageToAPI, deleteImageFromAPI } from '@/models/imageModel';

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

export async function handleImageDelete({ imageId, deleteNode }) {
  if (!imageId) {
    alert('No image ID found!');
    return false;
  }
  
  try {
    const data = await deleteImageFromAPI(imageId);
    
    if (data.success) {
      if (deleteNode) deleteNode();
      return true;
    } else {
      alert('Failed to delete image: ' + (data.error || 'Unknown error'));
      return false;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    alert('Failed to delete image. Please try again.');
    return false;
  }
} 