'use client'
import { NodeViewWrapper } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useImageDelete } from '@/hooks/useImageDelete';

export default function CustomImageNode(props) {
  const { node, deleteNode } = props;
  const imageId = node.attrs['data-id'];
  const src = node.attrs.src;
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  const { deleteImage, isDeleting, deleteError } = useImageDelete();

  const handleDelete = async () => {
    if (!imageId) return alert('No image ID found!');
    
    const success = await deleteImage({ imageId, deleteNode });
    if (!success && deleteError) {
      alert(deleteError);
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
        disabled={isDeleting}
        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white border border-gray-200 
                 rounded-full cursor-pointer shadow-sm opacity-0 group-hover:opacity-100 
                 transition-opacity duration-200 hover:border-red-300 hover:text-red-500
                 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete image"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </NodeViewWrapper>
  );
} 