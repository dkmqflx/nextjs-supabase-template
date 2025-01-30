import { cookies } from 'next/headers';

import { useGetSearchImages } from '@/entities/infinite-scroll/api/quries';
import Images from '@/entities/infinite-scroll/ui/Images';
import { useSupabaseServerClient } from '@/shared/hooks/useSupabaseServerClient';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from 'node_modules/@tanstack/react-query/build/modern/HydrationBoundary';

const InfiniteScrollPage = () => {
  const queryClient = getQueryClient();

  const cookieStore = cookies();

  const client = useSupabaseServerClient(cookieStore);

  queryClient.prefetchInfiniteQuery({
    ...useGetSearchImages({ client, search: '', page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Images />
    </HydrationBoundary>
  );
};

export default InfiniteScrollPage;
