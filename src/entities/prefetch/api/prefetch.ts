import apiClient from "@/shared/api/apiClient";
import { userResponse } from "./types";
import { userSchema } from "../model/schema";
import { z } from "zod";

export const getUsers = async () => {
  const { data } = await apiClient.get<userResponse[]>(
    "/api/user",
    z.array(userSchema)
  );

  return data;
};
