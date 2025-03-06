'use client';

import '@/entities/storage';
import { VIEW_MODE, useStorageStore } from '@/entities/storage';
import { Grid, Table } from '@/entities/storage';
import { useGetFileMetadata } from '@/entities/storage/api/queries';
import { useDeleteFile } from '@/features/storage/api/queries';
import { useSupabaseBrowserClient } from '@/shared/hooks/useSupabaseBrowserClient';
import { useSuspenseQuery } from '@tanstack/react-query';

type FilesProps = {
  dict: {
    name: string;
    size: string;
    type: string;
    lastModified: string;
    actions: string;
    delete: string;
    download: string;
    noFiles: string;
  };
};

const Files = ({ dict }: FilesProps) => {
  const client = useSupabaseBrowserClient();
  const { viewMode, debouncedSearch } = useStorageStore();

  const { data: files } = useSuspenseQuery(useGetFileMetadata({ client, search: debouncedSearch }));
  const { mutate: deleteFile } = useDeleteFile({ client });

  return (
    <div className="flex flex-col">
      {viewMode === VIEW_MODE.LIST ? (
        <Table files={files} onDelete={deleteFile} dict={dict} />
      ) : (
        <Grid files={files} onDelete={deleteFile} dict={dict} />
      )}
    </div>
  );
};

export default Files;
