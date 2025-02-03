import NextImage from 'next/image';

import type { ImageType } from '../api/types';

type ImageProps = Pick<ImageType, 'ai_description' | 'photo_image_url'> & { groupKey: number };

const Image = ({ ai_description, photo_image_url, groupKey }: ImageProps) => (
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
        <p className="line-clamp-2 p-4 text-sm text-white">{ai_description}</p>
      </div>
    </div>
  </div>
);

export default Image;
