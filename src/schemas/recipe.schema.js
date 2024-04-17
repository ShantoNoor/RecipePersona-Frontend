import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(3),
  category: z.string(),
  image: z.any(),
  cuisine: z.string(),
  video: z.string().optional(),
  cookTime: z.number(),
  author: z.string(),

  instructions: z.string().min(10),

  ingredients: z.array(
    z.object({
      name: z.string(),
      measure: z.string().optional(),
    })
  ),

  allergicIngredients: z.array(z.string()),
});
