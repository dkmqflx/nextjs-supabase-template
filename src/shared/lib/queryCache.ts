"use client";

import { MutationCache, QueryCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const mutationCache = new MutationCache({
  onError: (error) => {
    console.error(error);
    toast.error(error.message);
  },
});

export const queryCache = new QueryCache({
  onError: (error) => {
    console.error(error);
    toast.error(error.message);
  },
});
