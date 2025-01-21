import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
});

export const userArraySchema = z.array(userSchema);
