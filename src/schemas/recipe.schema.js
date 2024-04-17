import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string(),
  category: z.string(),
  image: z.string(),
  cuisine: z.string(),
  video: z.string().optional(),
  cookTime: z.number(),
  author: z.string(),

  instructions: z.string(),

  ingredients: z.array(
    z.object({
      name: z.string(),
      measure: z.string().optional(),
    })
  ),

  dairyProductucs: z.boolean(),
  eggs: z.boolean(),
  meats: z.boolean(),
  peanuts: z.boolean(),
});
