'use client';

import React, { ChangeEvent } from 'react';

import { Input } from '@/shared/ui/input';
import { Search } from 'lucide-react';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pl-10 ${className}`}
      />
    </div>
  );
};
