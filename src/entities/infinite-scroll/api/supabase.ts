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
    .like('photo_description', `%${search}%`) // search 없으면 전체 영화가 검색된다.
    .range((page - 1) * pageSize, page * pageSize - 1);
  // range - 첫번째 인자: 시작하는 곳, 두번째 인자: 끝나는 곳
  // 예를들어 현재 page 2고, pageSize가 2라면
  // (page - 1) * pageSize = 12 부터
  // page * pageSize - 1 = 23 까지 데이터를 가져온다

  // 다음 페이지가 있는지 없는지 확인해줘야 한다.
  // count가 23인데 현재 2페이지라서 page * pageSize가 24이면 다음 페이지가 없다는 것
  const hasNextPage = count ? count > page * pageSize : false;

  if (error) {
    console.error(error);

    // 다음 페이지가 없다는 것을 알려주기 위해 page와 pageSize를 null로 주어야 한다
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
