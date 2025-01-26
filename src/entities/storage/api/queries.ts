import { useSuspenseQuery } from '@tanstack/react-query';

import { searchFiles } from './actions';

export const useGetFiles = (search: string = '') => {
  return useSuspenseQuery({
    queryKey: ['files', search],
    queryFn: () => searchFiles(search),
  });
};
