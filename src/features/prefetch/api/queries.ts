import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getPosts } from './posts';

export const postQueries = {
  all: () => ['posts'] as const,
  search: (query: string) =>
    queryOptions({
      queryKey: [...postQueries.all(), 'search', query],
      queryFn: () => getPosts(query),
      placeholderData: keepPreviousData,
    }),
};
