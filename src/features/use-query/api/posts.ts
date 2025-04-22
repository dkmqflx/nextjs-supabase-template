import apiClient from '@/shared/api/apiClient';

import { Post } from '../model/types';

export const getPosts = async (query: string) => {
  try {
    const { data } = await apiClient.get<Post[]>('/posts', { search: query });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
