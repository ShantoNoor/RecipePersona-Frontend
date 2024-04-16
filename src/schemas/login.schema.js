import { z } from "zod";
import { emailSchema, passwordSchema } from "./common.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
