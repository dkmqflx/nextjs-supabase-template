'use client';

import NextImage from 'next/image';

import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

import type { ImageType } from '../api/types';

type ImageProps = Pick<ImageType, 'ai_description' | 'photo_image_url'> & { groupKey: number };

const Image = ({ ai_description, photo_image_url, groupKey }: ImageProps) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(photo_image_url);
      toast.success('Image URL copied to clipboard');
    } catch (error) {
      console.warn(error);
      toast.error('Failed to copy URL');
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await fetch(photo_image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ai_description || 'image'}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.warn(error);
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="item mb-4 w-full cursor-pointer sm:mb-0 sm:max-w-[280px]" data-grid-groupkey={groupKey}>
      <div className="group relative w-full">
        <NextImage
          src={`${photo_image_url}?w=500&q=60&auto=format&fit=crop&fm=webp`}
          alt={ai_description || ''}
          width={800}
          height={0}
          sizes="(max-width: 768px) 100vw, 800px"
          className="h-auto w-full rounded-lg"
          priority
        />
        <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-2 flex-1 p-4 text-sm text-white">{ai_description}</p>
          <div className="absolute right-2 top-2 flex gap-2">
            <button onClick={handleDownload} className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <Download className="h-5 w-5" />
            </button>
            <button onClick={handleShare} className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
