'use client';

import { useGetFileMetadata } from '../api/queries';
import { VIEW_MODE, useStorageStore } from '../model/store';
import Grid from './Grid';
import Table from './Table';

const Files = () => {
  const { data: files } = useGetFileMetadata();
  const { viewMode } = useStorageStore();

  return (
    <div className="flex flex-col">
      {viewMode === VIEW_MODE.LIST ? <Table files={files} /> : <Grid files={files} />}
    </div>
  );
};

export default Files;
