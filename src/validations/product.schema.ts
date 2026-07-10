import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3).max(200),
  shortDescription: z.string().min(10).max(300),
  description: z.string().min(20),
  priceInPaise: z.number().int().min(0),
  categoryId: z.string(),
  websiteUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || "")
    .refine((v) => v === "" || /^https?:\/\/.+/.test(v), {
      message: "Invalid URL",
    }),

  demoUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || "")
    .refine((v) => v === "" || /^https?:\/\/.+/.test(v), {
      message: "Invalid URL",
    }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
