'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabaseServer';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (formData: FormData) => {
  const supabase = await createSupabaseServerClient();
  const files = Array.from(formData.entries()).map(([, file]) => file as File);

  const results = await Promise.all(
    files.map(async (file) => {
      const fileExtension = file.name.split('.').pop();
      const safeFileName = `${uuidv4()}.${fileExtension}`;

      // Upload file to storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .upload(safeFileName, file, {
          upsert: true,
        });

      if (storageError) {
        console.error(storageError);
        throw storageError;
      }

      // Save metadata to database
      const { data: metadataData, error: metadataError } = await supabase.from('file_metadata').insert({
        storageId: storageData.path,
        originalName: decodeURIComponent(file.name),
        size: file.size,
        lastModified: new Date(file.lastModified),
      });

      if (metadataError) {
        // Rollback storage upload if metadata insert fails
        await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).remove([storageData.path]);
        throw metadataError;
      }

      return {
        ...storageData,
        metadata: metadataData,
      };
    }),
  );
  return results;
};

export const deleteFile = async (fileName: string) => {
  const supabase = await createSupabaseServerClient();

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove([fileName]);

  if (storageError) {
    console.error(storageError);
    throw storageError;
  }

  // Delete metadata
  const { error: metadataError } = await supabase.from('file_metadata').delete().eq('storage_id', fileName);

  if (metadataError) {
    console.error(metadataError);
    throw metadataError;
  }

  return { success: true };
};
