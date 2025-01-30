import type { TypedSupabaseClient } from '@/shared/lib/utils';

import type { FilesType } from './types';

type RawFileType = {
  id: number;
  originalname: string;
  size: number;
  storageid: string;
  lastmodified: string;
};

const transformToCamelCase = (file: RawFileType): FilesType => ({
  id: file.id,
  originalName: file.originalname,
  size: file.size,
  storageId: file.storageid,
  lastModified: file.lastmodified,
});

// Database Function
export const getFileMetadata = async (client: TypedSupabaseClient, search: string = ''): Promise<FilesType[]> => {
  const { data, error } = await client.rpc('search_file_metadata', {
    search_term: search,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return (data as RawFileType[]).map(transformToCamelCase);
};
