import React from 'react';

import { SearchContainer } from '@/features/use-query';

export const useQueryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">useQuery</h1>
      <SearchContainer />
    </div>
  );
};
