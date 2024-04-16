import { z } from "zod";
import { emailSchema, nameSchema } from "./common.schema";

export const userGeneralSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  photo: z.any(),
});