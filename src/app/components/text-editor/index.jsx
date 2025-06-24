'use client'
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import React, { useState, useEffect, useRef } from "react";
import { Save, Send, CheckCircle, AlertCircle, Upload, Eye } from "lucide-react";
import MenuBar from "./menu-bar";
import PreviewModal from './preview-modal';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from "@/app/utils/firebsae";
import { ReactNodeViewRenderer } from '@tiptap/react';
import CustomImageNode from './CustomImageNode';

const AuthorSection = ({ authorName, setAuthorName, authorImage, fileInputRef, handleAuthorImageUpload }) => {
  const triggerFileInput = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleAuthorImageUpload}
              className="hidden"
              ref={fileInputRef}
              id="author-image-upload"
            />
            {authorImage ? (
              <img
                src={authorImage}
                alt={authorName || "Author"}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-lg md:text-xl">
                  {authorName ? authorName.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm cursor-pointer"
              title="Upload author image"
            >
              <Upload className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-grow">
          <div className="space-y-1">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Author name..."
              className="w-full sm:max-w-xs text-sm md:text-base font-medium text-gray-900 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none pb-1 placeholder:text-gray-400 transition-colors duration-200"
            />
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
              <span>{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span className="text-gray-400">Draft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TextEditor({ content = "", onChange = () => {} }) {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [saveStatus, setSaveStatus] = useState(""); // "saving", "saved", "error"
  const [publishStatus, setPublishStatus] = useState(""); // "publishing", "published", "error"
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const [authorImage, setAuthorImage] = useState(''); // Only for preview, not saved to Firestore
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        if (data.url && editor) {
          // Move cursor to end before inserting image
          editor.chain().focus().setTextSelection(editor.state.doc.content.size).run();
          editor.chain().focus().setImage({ 
            src: data.url,
            'data-id': data.id  // Add the image ID as a data attribute
          }).run();
          console.log("Image uploaded:", data.url);
          console.log("Image name (ID):", data.name);
        }
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Image upload failed.");
      }
    }
  };

  const editor = useEditor({
    extensions: [ 
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-6 space-y-1" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-6 space-y-1" } },
        heading: {
          HTMLAttributes: {
            class: "font-bold text-gray-900",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "text-gray-700 leading-relaxed",
          },
        },
      }),
      TextAlign.configure({ 
        types: ["heading", "paragraph"] 
      }),
      Image.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CustomImageNode);
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            'data-id': {
              default: null,
              parseHTML: element => element.getAttribute('data-id'),
              renderHTML: attributes => {
                if (!attributes['data-id']) {
                  return {};
                }
                return {
                  'data-id': attributes['data-id'],
                };
              },
            },
          };
        },
      }).configure({
        HTMLAttributes: {
          class: "mx-auto my-4 rounded-lg shadow-md",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `
          min-h-[300px] md:min-h-[400px] 
          w-full bg-white rounded-xl border-0 
          px-3 md:px-6 py-3 md:py-4 
          focus:outline-none 
          prose prose-sm md:prose-lg max-w-none 
          prose-headings:text-gray-900 prose-headings:font-bold 
          prose-p:text-gray-700 prose-p:leading-relaxed 
          prose-strong:text-gray-900 prose-strong:font-semibold 
          prose-em:text-gray-700 prose-em:italic 
          prose-ul:space-y-1 prose-ol:space-y-1 
          prose-li:text-gray-700 
          [&_img]:mx-auto 
          [&_img]:rounded-lg 
          [&_img]:shadow-md 
          [&_img]:my-4
          [&_img]:max-w-[calc(100%-2rem)]
          md:[&_img]:max-w-[800px]
        `.replace(/\s+/g, ' ').trim(),
        'data-placeholder': 'Start writing your blog post...',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      // Auto-save after 2 seconds of inactivity
      clearTimeout(window.autoSaveTimeout);
      window.autoSaveTimeout = setTimeout(() => {
        handleAutoSave();
      }, 2000);
    },
  });

  // Auto-save functionality
  const handleAutoSave = async () => {
    if (!editor || (!title.trim() && !editor.getText().trim())) return;
    
    setSaveStatus("saving");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save only text data, no images
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        authorName: authorName.trim(),
        status: 'draft',
        updatedAt: new Date().toISOString()
      };
      
      console.log('Auto-saving draft:', postData);
      setSaveStatus("saved");
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // Manual save draft
  const handleSaveDraft = async () => {
    if (!editor) return;
    
    setSaveStatus("saving");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save only text data, no images
      const postData = {
        title: title.trim() || 'Untitled Draft',
        content: editor.getHTML(),
        authorName: authorName.trim(),
        status: 'draft',
        savedAt: new Date().toISOString()
      };
      
      console.log('Saving draft:', postData);
      setSaveStatus("saved");
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // Publish post - NO IMAGE STORAGE
  const handlePublish = async () => {
    if (!editor || !title.trim()) {
      alert('Please add a title and content for your blog post');
      return;
    }

    try {
      setPublishStatus("publishing");

      // Only save text data - no images
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        authorName: authorName.trim() || 'Anonymous',
        // authorImage: removed - not saving to Firestore
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'published',
        readTime: Math.ceil(editor.getText().split(' ').length / 200)
      };

      const docRef = await addDoc(collection(db, "posts"), postData);
      
      console.log("Post published with ID: ", docRef.id);
      setPublishStatus("published");
      
      // Clear status and redirect after 2 seconds
      setTimeout(() => {
        setPublishStatus("");
        router.push('/blog');
      }, 2000);

    } catch (error) {
      console.error("Error publishing post: ", error);
      setPublishStatus("error");
      setTimeout(() => setPublishStatus(""), 3000);
    }
  };

  // Save post to Firestore - NO IMAGE STORAGE
  const handleSavePost = async () => {
    try {
      if (!editor || !title.trim()) {
        alert('Please add title and content');
        return;
      }

      setSaveStatus('saving');

      // Only save text data - no images
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        authorName: authorName.trim() || 'Anonymous',
        // authorImage: removed - not saving to Firestore
        createdAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving post with data:', postData);

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // Update the handleAuthorImageUpload handler - for preview only
  const handleAuthorImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl === 'string') {
        // Only set for local preview, not saved to Firestore
        setAuthorImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add this function near your other handlers
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (window.autoSaveTimeout) {
        clearTimeout(window.autoSaveTimeout);
      }
    };
  }, []);

  return (
    <div className="w-full relative pb-20 md:pb-0">
      
      {/* Title Input */}
      <div className="mb-4 md:mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog post title..."
          className="w-full text-xl md:text-2xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none pb-2 md:pb-3 placeholder:text-gray-400 transition-colors duration-200"
        />
      </div>

      {/* Author Section */}
      <AuthorSection
        authorName={authorName}
        setAuthorName={setAuthorName}
        authorImage={authorImage}
        fileInputRef={fileInputRef}
        handleAuthorImageUpload={handleAuthorImageUpload}
      />

   
      {/* Desktop MenuBar */}
      <div className="hidden md:block relative z-50 mb-4">
        <MenuBar editor={editor} onImageUpload={handleImageUpload} />
      </div>
      
      {/* Editor Container */}
      <div className="relative z-10 bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
        <EditorContent 
          editor={editor} 
          className="min-h-[300px] md:min-h-[400px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-300 transition-all duration-200"
        />
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <MenuBar 
          editor={editor} 
          isMobile={true}
          onImageUpload={handleImageUpload}
        />
      </div>
      
      {/* Status Messages */}
      {(saveStatus || publishStatus) && (
        <div className="mt-4 flex items-center gap-2 relative z-10">
          {saveStatus === "saving" && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Saving draft...</span>
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Draft saved successfully</span>
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Failed to save draft</span>
            </div>
          )}
          
          {publishStatus === "publishing" && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Publishing post...</span>
            </div>
          )}
          {publishStatus === "published" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Post published successfully!</span>
            </div>
          )}
          {publishStatus === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Failed to publish post</span>
            </div>
          )}
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4 relative z-10">
        <button 
          onClick={handleSaveDraft}
          disabled={saveStatus === "saving"}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
        >
          <Save className="w-4 h-4" />
          {saveStatus === "saving" ? "Saving..." : "Save as Draft"}
        </button>
        
        <div className="flex gap-2 order-1 sm:order-2">
          {/* Show Preview button only on desktop */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="hidden sm:flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          
          <button 
            onClick={handlePublish}
            disabled={publishStatus === "publishing" || !title.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Send className="w-4 h-4" />
            {publishStatus === "publishing" ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>

      {/* Preview Modal - Only for mobile */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        content={editor?.getHTML() || ''}
        authorName={authorName}
        authorImage={authorImage}
        editor={editor}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobile={true}
      />
    </div>
  );
}