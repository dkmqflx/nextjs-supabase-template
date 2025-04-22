import { type UseSuspenseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { type Post } from '../model/types';
import { getPosts } from './posts';

export const usePosts = (
  query: string,
  options?: Omit<UseSuspenseQueryOptions<Post[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useSuspenseQuery({
    queryKey: ['posts', query],
    queryFn: () => getPosts(query),
    ...options,
  });
};
