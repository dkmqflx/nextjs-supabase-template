import { z } from "zod";
import { userSchema } from "../model/schema";

export type userResponse = z.infer<typeof userSchema>;
