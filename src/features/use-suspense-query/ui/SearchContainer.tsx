'use client';

import React, { Suspense, useState } from 'react';

import { SearchInput } from './SearchInput';
import { SearchResult } from './SearchResult';

export const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="space-y-6">
      <SearchInput value={searchQuery} onChange={handleSearch} placeholder="Search posts..." />

      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
        <SearchResult searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
};
