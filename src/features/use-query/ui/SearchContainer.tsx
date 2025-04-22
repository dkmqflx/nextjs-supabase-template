'use client';

import React, { useState } from 'react';

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

      <SearchResult searchQuery={searchQuery} />
    </div>
  );
};
