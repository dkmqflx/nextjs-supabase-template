import { cookies } from 'next/headers';

import { useGetFileMetadata } from '@/entities/storage';
import { FileUpload } from '@/features/storage';
import FileSearch from '@/features/storage/ui/FileSearch';
import { useSupabaseServerClient } from '@/shared/hooks/useSupabaseServerClient';
import { Files } from '@/widgets/storage';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

const StoragePage = () => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();

  const client = useSupabaseServerClient(cookieStore);

  queryClient.prefetchQuery(useGetFileMetadata({ client, search: '' }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full bg-gray-100 p-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="p-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">File Management</h1>
            <FileUpload />

            <FileSearch />

            <Files />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default StoragePage;
