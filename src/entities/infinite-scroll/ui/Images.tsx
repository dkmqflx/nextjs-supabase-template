'use client';

import { useSupabaseBrowserClient } from '@/shared/hooks/useSupabaseBrowserClient';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useGetSearchImages } from '../api/quries';

const Images = () => {
  const client = useSupabaseBrowserClient();

  const { data } = useSuspenseInfiniteQuery({
    ...useGetSearchImages({ client, search: '', page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  // eslint-disable-next-line no-console
  console.log('data', data);

  return <div>Images</div>;
};

export default Images;
