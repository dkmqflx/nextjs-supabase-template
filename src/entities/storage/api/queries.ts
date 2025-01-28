import type { TypedSupabaseClient } from '@/shared/lib/utils';

import { getFileMetadata } from './actions';

export const useGetFileMetadata = ({ client, search = '' }: { client: TypedSupabaseClient; search: string }) => {
  const queryKey = ['files'];

  const queryFn = async () => {
    const data = await getFileMetadata(client, search);
    return data;
  };

  return {
    queryKey,
    queryFn,
  };
};
