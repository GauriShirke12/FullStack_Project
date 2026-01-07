import { z } from "zod";

export const createStoreSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(120),
    email: z.string().email().optional(),
    address: z.string().max(400),
    ownerId: z.number().int().positive().optional()
  })
});

export const updateStoreSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(120).optional(),
    email: z.string().email().optional(),
    address: z.string().max(400).optional(),
    ownerId: z.number().int().positive().nullable().optional()
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/)
  })
});
