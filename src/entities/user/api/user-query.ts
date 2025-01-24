'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { createUser, getUserActions, updateUser } from './user-actions';

export const useGetUser = (searchInput: string) => {
  return useSuspenseQuery({
    queryKey: ['user', searchInput],
    queryFn: () => getUserActions({ searchInput }),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      createUser({
        name,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      updateUser({
        name,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
