'use client';

import { Input } from '@/shared/ui/input';
import debounce from 'lodash.debounce';
import { Search as SearchIcon } from 'lucide-react';

type SearchProps = {
  onSearch: (value: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 800);

  return (
    <div className="relative mb-8 w-full max-w-sm">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search images..." className="pl-8" onChange={(e) => debouncedSearch(e.target.value)} />
    </div>
  );
};
