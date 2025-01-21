import apiClient from "@/shared/api/apiClient";

import { userResponse } from "./types";

export const getUsers = async () => {
  const { data } = await apiClient.get<userResponse[]>("/api/user");

  return data;
};
