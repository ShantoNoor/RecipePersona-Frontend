import { z } from "zod";

export const recipeUpdateSchema = z.object({
  name: z.string().min(3),
  category: z.string(),
  image: z.any(),
  cuisine: z.string(),
  video: z.string().optional(),
  cookTime: z.number(),

  instructions: z.string().min(10),

  ingredients: z.array(
    z.object({
      name: z.string().min(1),
      measure: z.string().min(3),
    })
  ),

  allergicIngredients: z.array(z.string()),
});
