import { z } from "zod";
import { RoleSchema } from "./role.schema"; // <-- assuming you put RoleSchema in a separate file

export const IUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  name: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  roles: z.array(RoleSchema).nullable().optional(),
});

// Type inference
export type IUserType = z.infer<typeof IUserSchema>;
