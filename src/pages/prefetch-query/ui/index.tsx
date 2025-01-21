import { PrefetchQuery } from "@/entities/prefetch-query";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const PrefetchQueryPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      const data = await response.json();

      return data;
    },
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

export default PrefetchQueryPage;
