import { getQueryClient } from '@/shared/lib/get-query-client';
import { useMutation } from '@tanstack/react-query';

import { deleteFile, uploadFile } from './action';

export const useUploadFile = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
        exact: false,
      });
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (fileName: string) => deleteFile(fileName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
        exact: false,
      });
    },
  });
};
