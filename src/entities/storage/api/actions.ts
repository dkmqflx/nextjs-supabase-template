'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabaseServer';

export const getFileMetadata = async (search: string = '') => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('file_metadata')
    .select('*')
    .like('originalName', `%${search}%`)
    .order('lastModified', { ascending: true });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
