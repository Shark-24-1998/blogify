'use client'
import { NodeViewWrapper } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function CustomImageNode(props) {
  const { node, deleteNode } = props;
  const imageId = node.attrs['data-id'];
  const src = node.attrs.src;
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const handleDelete = async () => {
    if (!imageId) return alert('No image ID found!');
    try {
      const res = await fetch(`/${locale}/api/upload?id=${imageId}`, { 
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.success) {
        deleteNode();
      } else {
        alert('Failed to delete image: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  return (
    <NodeViewWrapper className="relative group">
      <img 
        src={src} 
        alt="" 
        className="max-w-full rounded-lg transition-transform duration-200 hover:scale-[1.02]"
      />
      <button
        type="button"
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white border border-gray-200 
                 rounded-full cursor-pointer shadow-sm opacity-0 group-hover:opacity-100 
                 transition-opacity duration-200 hover:border-red-300 hover:text-red-500"
        title="Delete image"
      >
        <Trash2 size={16} />
      </button>
    </NodeViewWrapper>
  );
} 