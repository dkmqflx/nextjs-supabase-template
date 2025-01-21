import { PrefetchQuery } from "@/entities/prefetch";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { getUsers } from "@/entities/prefetch/api/prefetch";

const PrefetchPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <h1>PrefetchPage</h1>
        <PrefetchQuery />
      </div>
    </HydrationBoundary>
  );
};

export default PrefetchPage;
