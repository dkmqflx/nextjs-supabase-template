import apiClient from '@/shared/api/apiClient';

import { Post } from '../model/types';

export const getPosts = async (query: string) => {
  const { data } = await apiClient.get<Post[]>('/posts', { search: query });

  return data;
};
