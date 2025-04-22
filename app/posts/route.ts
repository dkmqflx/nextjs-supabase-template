import { NextResponse } from 'next/server';

import type { BaseResponse } from '@/shared/api/types';

import postsData from './data.json';

type Post = (typeof postsData)[0];

export async function GET(request: Request) {
  // Artificial delay for async testing (1-2 seconds)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 1000));

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  let filteredPosts = [...postsData];

  if (search) {
    filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
  }

  const response: BaseResponse<Post[]> = {
    code: '200',
    message: 'Posts retrieved successfully',
    data: filteredPosts,
  };

  return NextResponse.json(response);
}
