import { cookies } from 'next/headers';

import { useGetFileMetadata } from '@/entities/storage';
import { FileUpload } from '@/features/storage';
import FileSearch from '@/features/storage/ui/FileSearch';
import { useSupabaseServerClient } from '@/shared/hooks/useSupabaseServerClient';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { ValidLocale, getDictionary } from '@/shared/lib/i18n';
import { Files } from '@/widgets/storage';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const StoragePage = async ({ params: { lang } }: { params: { lang: ValidLocale } }) => {
  const queryClient = getQueryClient();
  const dict = await getDictionary(lang);

  const cookieStore = cookies();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useSupabaseServerClient(cookieStore);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  queryClient.prefetchQuery(useGetFileMetadata({ client, search: '' }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full bg-gray-100 p-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="p-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">File Management</h1>
            <FileUpload dict={dict.storage.upload} />

            <FileSearch dict={dict.storage.search} />

            <Files dict={dict.storage.fileList} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default StoragePage;
