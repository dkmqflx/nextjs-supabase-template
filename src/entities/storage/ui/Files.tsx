'use client';

import { VIEW_MODE, useStorageStore } from '@/features/storage/model/store';

import { useGetFiles } from '../api/queries';
import Grid from './Grid';
import Table from './Table';

const Files = () => {
  const { data: files } = useGetFiles();
  const { viewMode } = useStorageStore();

  return (
    <div className="flex flex-col">
      {viewMode === VIEW_MODE.LIST ? <Table files={files} /> : <Grid files={files} />}
    </div>
  );
};

export default Files;
