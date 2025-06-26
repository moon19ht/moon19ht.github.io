'use client';

import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchInput({ onSearch, placeholder = "검색..." }: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          🔍
        </div>
      </div>
    </form>
  );
}
