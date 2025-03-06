import { cookies } from 'next/headers';

import { useSupabaseServerClient } from '@/shared/hooks/useSupabaseServerClient';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { ValidLocale, getDictionary } from '@/shared/lib/i18n';
import { useGetSearchImages } from '@/widgets/infinite-scroll/api/quries';
import Images from '@/widgets/infinite-scroll/ui/Images';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from 'node_modules/@tanstack/react-query/build/modern/HydrationBoundary';

const InfiniteScrollPage = async ({ params: { lang } }: { params: { lang: ValidLocale } }) => {
  const queryClient = getQueryClient();

  const cookieStore = cookies();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useSupabaseServerClient(cookieStore);

  queryClient.prefetchInfiniteQuery({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ...useGetSearchImages({ client, search: '', page: 1, pageSize: 20 }),
    initialPageParam: 1,
  });

  const dict = await getDictionary(lang);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="w-full p-4">
        <Images dict={dict} />
      </main>
    </HydrationBoundary>
  );
};

export default InfiniteScrollPage;
