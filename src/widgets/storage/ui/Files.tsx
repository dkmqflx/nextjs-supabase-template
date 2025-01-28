'use client';

import '@/entities/storage';
import { VIEW_MODE, useStorageStore } from '@/entities/storage';
import { Grid, Table } from '@/entities/storage';
import { useGetFileMetadata } from '@/entities/storage/api/queries';
import { useDeleteFile } from '@/features/storage/api/queries';
import { useSupabaseBrowserClient } from '@/shared/hooks/useSupabaseBrowserClient';
import { useSuspenseQuery } from '@tanstack/react-query';

const Files = () => {
  const client = useSupabaseBrowserClient();

  const { data: files } = useSuspenseQuery(useGetFileMetadata({ client, search: '' }));

  const { mutate: deleteFile } = useDeleteFile({ client });

  const { viewMode } = useStorageStore();

  return (
    <div className="flex flex-col">
      {viewMode === VIEW_MODE.LIST ? (
        <Table files={files} onDelete={deleteFile} />
      ) : (
        <Grid files={files} onDelete={deleteFile} />
      )}
    </div>
  );
};

export default Files;
