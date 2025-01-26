'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabaseServer';

export const searchFiles = async (search: string = '') => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).list('', {
    search,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
