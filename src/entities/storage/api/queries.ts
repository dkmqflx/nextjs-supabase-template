import type { TypedSupabaseClient } from '@/shared/lib/utils';
import { keepPreviousData } from '@tanstack/react-query';

import { getFileMetadata } from './actions';

export const useGetFileMetadata = ({ client, search = '' }: { client: TypedSupabaseClient; search: string }) => {
  const queryKey = ['files', search];

  const queryFn = async () => {
    const data = await getFileMetadata(client, search);
    return data;
  };

  return {
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
  };
};
