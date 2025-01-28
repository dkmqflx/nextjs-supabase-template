import type { TypedSupabaseClient } from '@/shared/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFile, uploadFile } from './actions';

export const useUploadFile = ({ client }: { client: TypedSupabaseClient }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadFile(client, formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['files'],
        exact: false,
      });
    },
  });
};

export const useDeleteFile = ({ client }: { client: TypedSupabaseClient }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storageId: string) => deleteFile(client, storageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['files'],
        exact: false,
      });
    },
  });
};
