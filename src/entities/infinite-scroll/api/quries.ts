import type { TypedSupabaseClient } from '@/shared/lib/utils';
import { keepPreviousData } from '@tanstack/react-query';

import { getSearchImages } from './supabase';

type SearchResult = Awaited<ReturnType<typeof getSearchImages>>;

export const useGetSearchImages = ({
  client,
  search = '',
  page = 1,
  pageSize = 10,
}: {
  client: TypedSupabaseClient;
  search: string;
  page: number;
  pageSize: number;
}) => {
  const queryKey = ['images', search, page, pageSize];

  const queryFn = async ({ pageParam }: { pageParam: number }) => {
    const data = await getSearchImages(client, { search, page: pageParam, pageSize });
    return data;
  };

  const getNextPageParam = (lastPage: SearchResult) => (lastPage.page ? lastPage.page + 1 : null);

  return {
    queryKey,
    queryFn,
    getNextPageParam,
    placeholderData: keepPreviousData,
  };
};
