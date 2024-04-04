import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AvatarUpload from "@/components/AvatarUpload";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import photoUploader from "@/utils/photoUploader";
import axiosPublic from "@/hooks/useAxios";
import { Textarea } from "@/components/ui/textarea";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";

const recipeSchema = z.object({
  strMeal: z.string(),
  strCategory: z.string().optional(),
  strMealThumb: z.string().optional(),
  strArea: z.string().optional(),
  strTags: z.string().optional(),
  strYoutube: z.string().optional(),
  strInstructions: z.string().optional(),
  createdBy: z.string().optional(),
  strIngredient1: z.string().optional(),
  strMeasure1: z.string().optional(),
  strIngredient2: z.string().optional(),
  strMeasure2: z.string().optional(),
  strIngredient3: z.string().optional(),
  strMeasure3: z.string().optional(),
  strIngredient4: z.string().optional(),
  strMeasure4: z.string().optional(),
  strIngredient5: z.string().optional(),
  strMeasure5: z.string().optional(),
  strIngredient6: z.string().optional(),
  strMeasure6: z.string().optional(),
  strIngredient7: z.string().optional(),
  strMeasure7: z.string().optional(),
  strIngredient8: z.string().optional(),
  strMeasure8: z.string().optional(),
  strIngredient9: z.string().optional(),
  strMeasure9: z.string().optional(),
  strIngredient10: z.string().optional(),
  strMeasure10: z.string().optional(),
  strIngredient11: z.string().optional(),
  strMeasure11: z.string().optional(),
  strIngredient12: z.string().optional(),
  strMeasure12: z.string().optional(),
  strIngredient13: z.string().optional(),
  strMeasure13: z.string().optional(),
  strIngredient14: z.string().optional(),
  strMeasure14: z.string().optional(),
  strIngredient15: z.string().optional(),
  strMeasure15: z.string().optional(),
  strIngredient16: z.string().optional(),
  strMeasure16: z.string().optional(),
  strIngredient17: z.string().optional(),
  strMeasure17: z.string().optional(),
  strIngredient18: z.string().optional(),
  strMeasure18: z.string().optional(),
  strIngredient19: z.string().optional(),
  strMeasure19: z.string().optional(),
  strIngredient20: z.string().optional(),
  strMeasure20: z.string().optional(),
});

const AddRecipe = () => {
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      strMeal: "",
      strCategory: "",
      strMealThumb: "",
      strArea: "",
      strTags: "",
      strYoutube: "",
      strInstructions: "",
      createdBy: "",
      strIngredient1: "",
      strMeasure1: "",
      strIngredient2: "",
      strMeasure2: "",
      strIngredient3: "",
      strMeasure3: "",
      strIngredient4: "",
      strMeasure4: "",
      strIngredient5: "",
      strMeasure5: "",
      strIngredient6: "",
      strMeasure6: "",
      strIngredient7: "",
      strMeasure7: "",
      strIngredient8: "",
      strMeasure8: "",
      strIngredient9: "",
      strMeasure9: "",
      strIngredient10: "",
      strMeasure10: "",
      strIngredient11: "",
      strMeasure11: "",
      strIngredient12: "",
      strMeasure12: "",
      strIngredient13: "",
      strMeasure13: "",
      strIngredient14: "",
      strMeasure14: "",
      strIngredient15: "",
      strMeasure15: "",
      strIngredient16: "",
      strMeasure16: "",
      strIngredient17: "",
      strMeasure17: "",
      strIngredient18: "",
      strMeasure18: "",
      strIngredient19: "",
      strMeasure19: "",
      strIngredient20: "",
      strMeasure20: "",
    },
  });

  async function onSubmit(data) {
    data.createdBy = user._id;

    // if (typeof data.photo === "object") {
    //   const uploadUrl = await photoUploader(photo);
    //   updateFields.photo = uploadUrl;
    // }

    toast.promise(axiosPublic.post(`/recipes`, data), {
      loading: "Adding recipe, Please wait ...",
      success: () => "Recipe added successfully",
      error: (err) => {
        toast.error("Failed to add recipe");
        return err.message;
      },
    });
  }

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Add Your Recipe</PageHeaderHeading>
        <PageHeaderDescription>
          Fill the form below to add your recipe!!!
        </PageHeaderDescription>
      </PageHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Change Your Profile Picture</FormLabel>
                <FormControl>
                  <AvatarUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="strMeal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Recipe Name" {...field} />
                </FormControl>
                <FormDescription>Name of the Recipe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="strCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Type the Category which this recipe belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="strInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea rows="5" {...field} />
                </FormControl>
                <FormDescription>
                  Describe in details about the recipe
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Recipe</Button>
        </form>
      </Form>
    </>
  );
};

export default AddRecipe;
