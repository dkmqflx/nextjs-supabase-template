import { User } from '@/entities/user';
import { getUserActions } from '@/entities/user/api/user-actions';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const UserPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', ''],
    queryFn: () => getUserActions({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <h1>User Page</h1>
        <User />
      </div>
    </HydrationBoundary>
  );
};

export default UserPage;
