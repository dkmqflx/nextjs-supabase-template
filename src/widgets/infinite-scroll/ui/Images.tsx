'use client';

import { useState } from 'react';

import { Search } from '@/features/infinite-scroll/ui/Search';
import { useSupabaseBrowserClient } from '@/shared/hooks/useSupabaseBrowserClient';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useGetSearchImages } from '../api/quries';
import ImageCard from './ImageCard';

const Images = () => {
  const client = useSupabaseBrowserClient();
  const [search, setSearch] = useState('');

  const {
    data: images,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    ...useGetSearchImages({ client, search, page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  const prefetchNextPage = async () => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <div className="flex-start flex flex-col">
      <Search onSearch={setSearch} />
      <MasonryInfiniteGrid
        className="container"
        gap={10}
        threshold={0.7}
        onRequestPrepend={prefetchNextPage}
        onRequestAppend={prefetchNextPage}
      >
        {images?.pages.map((page, pageIndex) =>
          page.data.map((image) => (
            <ImageCard
              key={image.photo_id}
              groupKey={pageIndex}
              ai_description={image.ai_description}
              photo_image_url={image.photo_image_url}
            />
          )),
        )}
      </MasonryInfiniteGrid>
    </div>
  );
};

export default Images;
