import React from 'react';

import { SearchContainer, postQueries } from '@/features/prefetch';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export const PrefetchPage = async () => {
  // Create a QueryClient instance for server-side use
  const queryClient = getQueryClient();

  // Prefetch initial data on the server and store it in the cache
  // Load initial data by searching with an empty string
  await queryClient.prefetchQuery(postQueries.search(''));

  // Serialize the QueryClient cache state
  // This state will be sent to the client and used for initial rendering
  const dehydratedState = dehydrate(queryClient);

  return (
    // HydrationBoundary: Rehydrates server-fetched data into the client's React Query cache
    // This allows the client to use the data immediately without additional API calls
    <HydrationBoundary state={dehydratedState}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Prefetch </h1>
        <SearchContainer />
      </div>
    </HydrationBoundary>
  );
};
