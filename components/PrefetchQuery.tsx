"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const PrefetchQuery = () => {
  const { data } = useSuspenseQuery({
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

  return (
    <div>
      <div>{data.id}</div>
      <div>{data.title}</div>
    </div>
  );
};

export default PrefetchQuery;
