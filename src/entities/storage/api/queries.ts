import { useSuspenseQuery } from '@tanstack/react-query';

import { getFileMetadata } from './actions';

export const useGetFileMetadata = (search: string = '') => {
  return useSuspenseQuery({
    queryKey: ['files', search],
    queryFn: () => getFileMetadata(search),
  });
};
