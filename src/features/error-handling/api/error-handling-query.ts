import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { getClientError, requestClientError, requestServerError } from './error-handling';

export const useGetClientError = () => {
  return useSuspenseQuery({
    queryKey: ['error'],
    queryFn: getClientError,
  });
};

export const useRequestClientError = () => {
  return useMutation({
    mutationFn: requestClientError,
  });
};

export const useRequestServerError = () => {
  return useMutation({
    mutationFn: requestServerError,
  });
};
