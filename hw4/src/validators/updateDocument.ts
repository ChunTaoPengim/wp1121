import { z } from "zod";

export const updateDocSchema = z.object({
  title: z.string().optional(),
});
