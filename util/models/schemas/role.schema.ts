import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  createdAt: z.string().datetime().optional(),
});

// Type inference
export type RoleType = z.infer<typeof RoleSchema>;
