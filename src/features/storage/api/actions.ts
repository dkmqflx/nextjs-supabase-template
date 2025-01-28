// 'use server';
import { TypedSupabaseClient } from '@/shared/lib/utils';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (client: TypedSupabaseClient, formData: FormData) => {
  const files = Array.from(formData.entries()).map(([, file]) => file as File);

  const results = await Promise.all(
    files.map(async (file) => {
      const fileExtension = file.name.split('.').pop();
      const safeFileName = `${uuidv4()}.${fileExtension}`;

      // Upload file to storage
      const { data: storageData, error: storageError } = await client.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .upload(safeFileName, file, {
          upsert: true,
        });

      if (storageError) {
        console.error(storageError);
        throw storageError;
      }

      // Save metadata to database
      const { data: metadataData, error: metadataError } = await client.from('file_metadata').insert({
        storageId: storageData.path,
        originalName: decodeURIComponent(file.name),
        size: file.size,
        lastModified: new Date(file.lastModified).toISOString(),
      });

      if (metadataError) {
        // Rollback storage upload if metadata insert fails
        await client.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).remove([storageData.path]);
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

export const deleteFile = async (client: TypedSupabaseClient, storageId: string) => {
  // Delete from storage
  const { error: storageError } = await client.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove([storageId]);

  if (storageError) {
    console.error(storageError);
    throw storageError;
  }

  // Delete metadata
  const { error: metadataError } = await client.from('file_metadata').delete().eq('storageId', storageId);

  if (metadataError) {
    console.error(metadataError);
    throw metadataError;
  }

  return { success: true };
};
