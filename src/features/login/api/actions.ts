import { TypedSupabaseClient } from '@/shared/lib/utils';

export const signInWithKakao = async (client: TypedSupabaseClient) => {
  const { error } = await client.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
        : 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    throw error;
  }
};
