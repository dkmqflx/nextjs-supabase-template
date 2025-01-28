import type { TypedSupabaseClient } from '@/shared/lib/utils';

export const getFileMetadata = async (client: TypedSupabaseClient, search: string = '') => {
  const { data, error } = await client
    .from('file_metadata')
    .select('*')
    .like('originalName', `%${search}%`)
    .order('lastModified', { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  console.log('data', data);

  return data;
};
