'use client';

import { useState } from 'react';

import { VIEW_MODE, useStorageStore } from '@/entities/storage/model/store';
import { Grid, List, Search } from 'lucide-react';

type FileSearchProps = {
  dict: {
    placeholder: string;
    listView: string;
    gridView: string;
  };
};

const FileSearch = ({ dict }: FileSearchProps) => {
  const { viewMode, toggleViewMode, debouncedSearch, setDebouncedSearch } = useStorageStore();

  const [search, setSearch] = useState(debouncedSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    setDebouncedSearch(value);
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="relative">
        <input
          type="text"
          placeholder={dict.placeholder}
          value={search}
          onChange={handleSearch}
          className="rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={toggleViewMode}
          className={`rounded-md p-2 ${viewMode === VIEW_MODE.LIST ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title={dict.listView}
          aria-label={dict.listView}
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={toggleViewMode}
          className={`rounded-md p-2 ${viewMode === VIEW_MODE.GRID ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title={dict.gridView}
          aria-label={dict.gridView}
        >
          <Grid className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FileSearch;
