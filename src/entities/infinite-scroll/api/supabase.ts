import type { TypedSupabaseClient } from '@/shared/lib/utils';

export async function getSearchImages(
  client: TypedSupabaseClient,
  {
    search,
    page,
    pageSize,
  }: {
    search: string;
    page: number;
    pageSize: number;
  },
) {
  const { data, count, error } = await client
    .from('images')
    .select('*', { count: 'exact' })
    .like('photo_description', `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count ? count > page * pageSize : false;

  if (error) {
    console.error(error);

    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return {
    data,
    page,
    pageSize,
    hasNextPage,
  };
}
