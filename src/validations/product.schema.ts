import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3).max(200),
  shortDescription: z.string().min(10).max(300),
  description: z.string().min(20),
  priceInPaise: z.number().int().min(0),
  categoryId: z.string(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
