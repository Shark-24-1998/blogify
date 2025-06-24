'use client'

import { useState, useRef } from 'react';
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Heading as HeadingIcon, Image as ImageIcon, ChevronDown 
} from 'lucide-react';

// Toggle component
function Toggle({ pressed, onPressedChange, children, className, title, isMobile }) {
  return (
    <button
      type="button"
      onClick={onPressedChange}
      className={`${isMobile ? 'p-2.5 min-w-[44px]' : 'p-2'} rounded-md border border-gray-200 hover:bg-gray-100 transition ${
        pressed ? "bg-gray-200" : "bg-white"
      } ${className}`}
      title={title}
    >
      {children} 
    </button>
  );
}

export default function MenuBar({ editor, isMobile = false, onImageUpload }) {
  const fileInputRef = useRef(null);
  const [isHeadingOpen, setIsHeadingOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length && onImageUpload) {
      onImageUpload(files);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  if (!editor) return null;

  const textOptions = [
    { 
      icon: <Bold className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().toggleBold().run(), 
      active: editor.isActive("bold"),
      tooltip: "Bold"
    },
    { 
      icon: <Italic className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().toggleItalic().run(), 
      active: editor.isActive("italic"),
      tooltip: "Italic"
    },
    { 
      icon: <Strikethrough className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().toggleStrike().run(), 
      active: editor.isActive("strike"),
      tooltip: "Strikethrough"
    },
  ];

  const alignmentOptions = [
    { 
      icon: <AlignLeft className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().setTextAlign("left").run(), 
      active: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left"
    },
    { 
      icon: <AlignCenter className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().setTextAlign("center").run(), 
      active: editor.isActive({ textAlign: "center" }),
      tooltip: "Align Center"
    },
    { 
      icon: <AlignRight className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().setTextAlign("right").run(), 
      active: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right"
    },
  ];

  const listOptions = [
    { 
      icon: <List className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().toggleBulletList().run(), 
      active: editor.isActive("bulletList"),
      tooltip: "Bullet List"
    },
    { 
      icon: <ListOrdered className={isMobile ? "size-5" : "size-4"} />, 
      action: () => editor.chain().focus().toggleOrderedList().run(), 
      active: editor.isActive("orderedList"),
      tooltip: "Numbered List"
    },
  ];

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive('heading', { level: i })) return `H${i}`;
    }
    return 'P';
  };

  if (isMobile) {
    return (
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          
          {/* Heading Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsHeadingOpen(!isHeadingOpen)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-w-[60px] ${
                editor.isActive("heading") 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-700 bg-white border border-gray-200'
              }`}
            >
              <HeadingIcon className="size-4" />
              <span className="text-xs font-semibold">{getCurrentHeading()}</span>
              <ChevronDown className={`size-3 transition-transform ${isHeadingOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isHeadingOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div 
                  className="fixed inset-0 z-[60]" 
                  onClick={() => setIsHeadingOpen(false)}
                ></div>
                
                <div className="fixed bottom-20 left-4 bg-white rounded-lg border border-gray-200 shadow-2xl z-[70] min-w-[140px] max-h-[200px] overflow-y-auto">
                  <button
                    onClick={() => {
                      editor.chain().focus().setParagraph().run();
                      setIsHeadingOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 rounded-t-lg ${
                      !editor.isActive("heading") ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    Paragraph
                  </button>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        editor.chain().focus().toggleHeading({ level }).run();
                        setIsHeadingOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                        level === 6 ? 'rounded-b-lg' : ''
                      } ${editor.isActive('heading', { level }) ? 'bg-blue-50 text-blue-700' : ''}`}
                    >
                      Heading {level}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Text Formatting */}
          {textOptions.map((opt, i) => (
            <Toggle
              key={`text-${i}`}
              pressed={opt.active}
              onPressedChange={opt.action}
              className={`flex-shrink-0 rounded-lg transition-all duration-200 ${
                opt.active 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title={opt.tooltip}
              isMobile={true}
            >
              {opt.icon}
            </Toggle>
          ))}

          {/* Alignment */}
          {alignmentOptions.map((opt, i) => (
            <Toggle
              key={`align-${i}`}
              pressed={opt.active}
              onPressedChange={opt.action}
              className={`flex-shrink-0 rounded-lg transition-all duration-200 ${
                opt.active 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title={opt.tooltip}
              isMobile={true}
            >
              {opt.icon}
            </Toggle>
          ))}

          {/* Lists */}
          {listOptions.map((opt, i) => (
            <Toggle
              key={`list-${i}`}
              pressed={opt.active}
              onPressedChange={opt.action}
              className={`flex-shrink-0 rounded-lg transition-all duration-200 ${
                opt.active 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title={opt.tooltip}
              isMobile={true}
            >
              {opt.icon}
            </Toggle>
          ))}

          {/* Image Upload */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsImageOpen(!isImageOpen)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 text-gray-700 bg-white border border-gray-200 min-w-[50px]"
              title="Insert Image"
            >
              <ImageIcon className="size-4" />
              <ChevronDown className={`size-3 transition-transform ${isImageOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isImageOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div 
                  className="fixed inset-0 z-[60]" 
                  onClick={() => setIsImageOpen(false)}
                ></div>
                
                <div className="fixed bottom-20 right-4 bg-white rounded-lg border border-gray-200 shadow-2xl z-[70] min-w-[140px]">
                  <button
                    onClick={() => {
                      const url = window.prompt("Enter image URL");
                      if (url) editor.chain().focus().setImage({ src: url }).run();
                      setIsImageOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 rounded-t-lg"
                  >
                    From URL
                  </button>
                  <button
                    onClick={() => {
                      triggerImageUpload();
                      setIsImageOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 rounded-b-lg"
                  >
                    Upload from Computer
                  </button>
                </div>
              </>
            )}
            
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop version (original layout)
  return (
    <div className="flex flex-wrap items-center gap-1 p-4 mb-6 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg">
      
      {/* Heading Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsHeadingOpen(!isHeadingOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            editor.isActive("heading") 
              ? 'bg-blue-100 text-blue-700 shadow-sm' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <HeadingIcon className="size-4" />
          <span className="text-xs">{getCurrentHeading()}</span>
          <ChevronDown className={`size-3 transition-transform ${isHeadingOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isHeadingOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsHeadingOpen(false)}
            ></div>
            
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-60 min-w-[120px]">
              <button
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setIsHeadingOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-t-lg ${
                  !editor.isActive("heading") ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                Paragraph
              </button>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level }).run();
                    setIsHeadingOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                    level === 6 ? 'rounded-b-lg' : ''
                  } ${editor.isActive('heading', { level }) ? 'bg-blue-50 text-blue-700' : ''}`}
                >
                  Heading {level}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Text Formatting */}
      <div className="flex gap-1">
        {textOptions.map((opt, i) => (
          <Toggle
            key={i}
            pressed={opt.active}
            onPressedChange={opt.action}
            className={`p-2 rounded-lg transition-all duration-200 ${
              opt.active 
                ? 'bg-blue-100 text-blue-700 shadow-sm' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title={opt.tooltip}
          >
            {opt.icon}
          </Toggle>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Alignment */}
      <div className="flex gap-1">
        {alignmentOptions.map((opt, i) => (
          <Toggle
            key={i}
            pressed={opt.active}
            onPressedChange={opt.action}
            className={`p-2 rounded-lg transition-all duration-200 ${
              opt.active 
                ? 'bg-blue-100 text-blue-700 shadow-sm' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title={opt.tooltip}
          >
            {opt.icon}
          </Toggle>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Lists */}
      <div className="flex gap-1">
        {listOptions.map((opt, i) => (
          <Toggle
            key={i}
            pressed={opt.active}
            onPressedChange={opt.action}
            className={`p-2 rounded-lg transition-all duration-200 ${
              opt.active 
                ? 'bg-blue-100 text-blue-700 shadow-sm' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title={opt.tooltip}
          >
            {opt.icon}
          </Toggle>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Image Upload */}
      <div className="relative">
        <button
          onClick={() => setIsImageOpen(!isImageOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 text-gray-700"
          title="Insert Image"
        >
          <ImageIcon className="size-4" />
          <ChevronDown className={`size-3 transition-transform ${isImageOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isImageOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsImageOpen(false)}
            ></div>
            
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-60 min-w-[140px]">
              <button
                onClick={() => {
                  const url = window.prompt("Enter image URL");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                  setIsImageOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-t-lg"
              >
                From URL
              </button>
              <button
                onClick={() => {
                  triggerImageUpload();
                  setIsImageOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-b-lg"
              >
                Upload from Computer
              </button>
            </div>
          </>
        )}
        
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}