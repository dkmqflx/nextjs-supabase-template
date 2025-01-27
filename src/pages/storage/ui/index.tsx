import { Files } from '@/entities/storage';
import { getFileMetadata } from '@/entities/storage/api/actions';
import { FileUpload } from '@/features/storage';
import FileSearch from '@/features/storage/ui/FileSearch';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from 'node_modules/@tanstack/react-query/build/modern/HydrationBoundary';

const StoragePage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['files', ''],
    queryFn: () => getFileMetadata(''),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
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
