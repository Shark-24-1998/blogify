// Image upload to external API
export async function uploadImageToAPI({ file }) {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error("Upload failed");
  }
  
  return await response.json();
}

// Image deletion from external API
export async function deleteImageFromAPI(imageId) {
  const response = await fetch(`/api/upload?id=${imageId}`, { 
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error("Delete failed");
  }
  
  return await response.json();
}

// Upload multiple images to storage
export async function uploadImagesToStorage({ files, locale, onProgress, onComplete }) {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      // Update progress
      if (onProgress) {
        onProgress((i / files.length) * 100);
      }
      
      // Upload single image
      const result = await uploadImageToAPI({ file });
      results.push({
        url: result.url,
        id: result.id
      });
      
    } catch (error) {
      console.error(`Failed to upload image ${i + 1}:`, error);
      throw error;
    }
  }
  
  // Complete callback
  if (onComplete) {
    onComplete(results);
  }
  
  return results;
} 