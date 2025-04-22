import React from 'react';

import { type Post, usePosts } from '@/features/use-suspense-query';

export const SearchResult = ({ searchQuery }: { searchQuery: string }) => {
  const { data: posts } = usePosts(searchQuery);

  return (
    <div className="space-y-4">
      {posts.map((post: Post) => (
        <div key={post.id} className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="mt-2 text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
};
