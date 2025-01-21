import { useSuspenseQuery } from "@tanstack/react-query";
import { getUsers } from "./prefetch";

export const useGetTodos = () => {
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: getUsers,
  });
};
