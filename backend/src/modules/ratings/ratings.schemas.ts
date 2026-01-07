import { z } from "zod";

export const submitRatingSchema = z.object({
  body: z.object({
    storeId: z.number().int().positive(),
    score: z.number().int().min(1).max(5)
  })
});
