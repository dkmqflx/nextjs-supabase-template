import React from 'react';

import { SearchContainer } from '@/features/use-suspense-query';

export const useSuspenseQueryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">useSuspenseQueryPage</h1>
      <SearchContainer />
    </div>
  );
};
