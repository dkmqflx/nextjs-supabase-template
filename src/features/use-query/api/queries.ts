import { type UseQueryOptions, keepPreviousData, useQuery } from '@tanstack/react-query';

import { type Post } from '../model/types';
import { getPosts } from './posts';

export const usePosts = (
  query: string,
  options?: Omit<UseQueryOptions<Post[] | undefined, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['posts', query],
    queryFn: () => getPosts(query),
    enabled: !!query,
    ...options,
    placeholderData: keepPreviousData,
  });
};
