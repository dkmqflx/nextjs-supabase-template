import { cookies } from 'next/headers';

import { useSupabaseServerClient } from '@/shared/hooks/useSupabaseServerClient';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { useGetSearchImages } from '@/widgets/infinite-scroll/api/quries';
import Images from '@/widgets/infinite-scroll/ui/Images';
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
      <main className="w-full p-4">
        <Images />
      </main>
    </HydrationBoundary>
  );
};

export default InfiniteScrollPage;
