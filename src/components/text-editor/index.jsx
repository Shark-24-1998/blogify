'use client'
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CustomImageNode from './CustomImageNode';
import MenuBar from "./menu-bar";
import PreviewModal from './preview-modal';
import AuthorSection from './AuthorSection';
import StatusMessages from './StatusMessages';
import ActionButtons from './ActionButtons';
import EditorContainer from './EditorContainer';
import { useTextEditor } from '@/hooks/useTextEditor';

export default function TextEditor({ content = "", onChange = () => {} }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const fileInputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // e.g., 'en', 'es', etc.
  const searchParams = useSearchParams();
  const initialPostid = searchParams.get('postid');

  // Use the MVC-based text editor hook
  const {
    title,
    authorName,
    authorImage,
    saveStatus,
    publishStatus,
    imageUploading,
    uploadError,
    setTitle,
    setAuthorName,
    setAuthorImage,
    saveDraft,
    loadDraft,
    publishPost,
    uploadImages,
    autoSave
  } = useTextEditor(initialPostid);

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
      const content = editor.getHTML();
      onChange(content);
      // Trigger auto-save when content changes
      autoSave(content, router);
    },
  });

  // Handle author image upload for preview only
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

  // Load draft on mount if postid exists
  useEffect(() => {
    const fetchDraft = async () => {
      if (initialPostid) {
        const draftData = await loadDraft();
        if (draftData && editor) {
          editor.commands.setContent(draftData.content || '');
        }
      }
    };
    fetchDraft();
  }, [initialPostid, editor, loadDraft]);

  // Handle image upload
  const handleImageUpload = (files) => {
    uploadImages(files, locale, ({ url, id }) => {
      if (editor) {
        editor.chain().focus().setTextSelection(editor.state.doc.content.size).run();
        editor.chain().focus().setImage({
          src: url,
          'data-id': id
        }).run();
      }
    });
  };

  // Handle save draft
  const handleSaveDraft = async () => {
    const content = editor ? editor.getHTML() : '';
    await saveDraft(router);
  };

  // Handle publish
  const handlePublish = () => {
    const content = editor ? editor.getHTML() : '';
    publishPost(router);
  };

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
      <EditorContainer editor={editor} imageUploading={imageUploading} />

      {/* Mobile Bottom Toolbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <MenuBar 
          editor={editor} 
          isMobile={true}
          onImageUpload={handleImageUpload}
        />
      </div>
      
      {/* Status Messages */}
      <StatusMessages saveStatus={saveStatus} publishStatus={publishStatus} />
      
      {/* Action Buttons */}
      <ActionButtons
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onPreview={() => setIsPreviewOpen(true)}
        saveStatus={saveStatus}
        publishStatus={publishStatus}
        title={title}
      />

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