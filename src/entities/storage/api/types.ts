import { Database } from 'database.types';

export type FilesType = Database['public']['Tables']['file_metadata']['Row'];
export type insertFilesType = Database['public']['Tables']['file_metadata']['Insert'];
export type uploadFilesType = Database['public']['Tables']['file_metadata']['Update'];
