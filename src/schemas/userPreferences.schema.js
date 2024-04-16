import { z } from "zod";

export const userPreferencesSchema = z.object({
  allergies: z.array(z.string()),
  favoriteCuisines: z.array(z.string()),
  dietaryPreferences: z.string(),
});
