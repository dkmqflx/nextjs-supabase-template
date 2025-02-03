'use client';

import { useSupabaseBrowserClient } from '@/shared/hooks/useSupabaseBrowserClient';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useGetSearchImages } from '../api/quries';
import Image from './Image';

const Images = () => {
  const client = useSupabaseBrowserClient();

  const {
    data: images,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    ...useGetSearchImages({ client, search: '', page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  const prefetchNextPage = async () => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <MasonryInfiniteGrid
      placeholder={<div className="placeholder"></div>}
      className="container"
      gap={10}
      threshold={0.7}
      onRequestPrepend={prefetchNextPage}
      onRequestAppend={prefetchNextPage}
    >
      {images?.pages.map((page, pageIndex) =>
        page.data.map((image) => (
          <Image
            key={image.photo_id}
            groupKey={pageIndex}
            ai_description={image.ai_description}
            photo_image_url={image.photo_image_url}
          />
        )),
      )}
    </MasonryInfiniteGrid>
  );
};

export default Images;
