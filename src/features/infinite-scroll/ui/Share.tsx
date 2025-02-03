'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

type ShareProps = {
  url: string;
};

export const ShareButton = ({ url }: ShareProps) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Image URL copied to clipboard');
    } catch (error) {
      console.warn(error);
      toast.error('Failed to copy URL');
    }
  };

  return (
    <button onClick={handleShare} className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
      <Share2 className="h-5 w-5" />
    </button>
  );
};
