"use client";

import { useGetTodos } from "../api/prefetch-query";

export const PrefetchQuery = () => {
  const { data } = useGetTodos();

  return (
    <div>
      {data.map(({ id, name, email }) => (
        <div key={id}>
          <div>{id}</div>
          <div>{name}</div>
          <div>{email}</div>
        </div>
      ))}
    </div>
  );
};
