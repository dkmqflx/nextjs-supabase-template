import { useSupabaseBrowserClient } from '@/shared/hooks/useSupabaseBrowserClient';
import { useMutation } from '@tanstack/react-query';

import { signInWithGoogle, signInWithKakao } from './actions';

export const useSignInWithKakao = () => {
  const client = useSupabaseBrowserClient();

  return useMutation({
    mutationFn: () => signInWithKakao(client),
  });
};

export const useSignInWithGoogle = () => {
  const client = useSupabaseBrowserClient();

  return useMutation({
    mutationFn: () => signInWithGoogle(client),
  });
};
