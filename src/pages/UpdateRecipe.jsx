import Spinner from "@/components/Spinner";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import photoUploader from "@/utils/photoUploader";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import cuisines from "./AddRecipe/data/cuisines.json";
import categories from "./AddRecipe/data/categories.json";

import { cn } from "@/utils/utils";
import { Slider } from "@/components/ui/slider";
import minutesToHoursAndMinutes from "@/utils/minutesToHoursAndMinutes";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import Ingredien from "./AddRecipe/Ingredien";
import { recipeUpdateSchema } from "@/schemas/recipeUpdate.schema";

const allergicIngredients = [
  {
    id: "milk",
    label: "Milk (Dairy Productucs)",
  },
  {
    id: "egg",
    label: "Egg",
  },
  {
    id: "peanut",
    label: "Peanut",
  },
  {
    id: "meat",
    label: "Meat",
  },
];

const UpdateRecipe = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState(false);

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["recipes", `_id=${_id}`],
    enabled: !!_id,
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/recipes?_id=${_id}`);
        return result.data[0];
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(recipeUpdateSchema),
    defaultValues: {
      name: "",
      cookTime: 5,
      author: "",
      ingredients: [
        {
          name: "",
          measure: "",
        },
        {
          name: "",
          measure: "",
        },
        {
          name: "",
          measure: "",
        },
      ],
      allergicIngredients: [],
      video: "",
    },
  });

  const { handleSubmit, watch, setValue, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.name);
      form.setValue("category", data?.category);
      form.setValue("image", data?.image);
      form.setValue("cuisine", data?.cuisine);
      form.setValue("video", data?.video);
      form.setValue("cookTime", data?.cookTime);
      form.setValue("instructions", data?.instructions);
      form.setValue("ingredients", data?.ingredients);
      form.setValue("allergicIngredients", data?.allergicIngredients);
    }
  }, [data, form]);

  const processForm = async (data) => {
    const { image, ...updateFields } = data;

    if (typeof data.image === "object") {
      const uploadUrl = await photoUploader(image);
      updateFields.image = uploadUrl;
    }

    toast.promise(axiosPublic.put(`/recipes/${_id}`, updateFields), {
      loading: "Updating recipe, Please wait ...",
      success: () => {
        refetch();
        navigate("/my-recipes")
        return "Recipe updated successfully";
      },
      error: (err) => {
        toast.error("Failed to update recipe");
        return err.message;
      },
    });
  };

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="flex flex-col justify-between gap-10">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(processForm)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Your {`Recipe's`} Image</FormLabel>
                        <FormControl>
                          <AvatarUpload
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              photoUploader(value)
                                .then((url) => field.onChange(url))
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            rounded={false}
                            icon={<Camera className="size-16" />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator
                  className="hidden md:block ml-[90%]"
                  orientation="vertical"
                />

                <div className="space-y-6 md:col-span-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of Your Recipe</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Your Recipe's Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cuisine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What kind of recipe you would like to add?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Select a cuisine" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cuisines.map((cuisine) => (
                              <SelectItem
                                key={cuisine}
                                value={cuisine}
                                className="capitalize"
                              >
                                {cuisine}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          What category the recipe belongs to?
                        </FormLabel>
                        <Popover
                          open={openCategories}
                          onOpenChange={setOpenCategories}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between capitalize",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? categories.find(
                                      (categorie) =>
                                        categorie.name === field.value
                                    )?.name
                                  : "Select a category"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search category..." />
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-72 w-full rounded-md border">
                                  {categories.map((categorie) => (
                                    <CommandItem
                                      value={categorie.name}
                                      key={categorie.name}
                                      onSelect={() => {
                                        form.setValue(
                                          "category",
                                          categorie.name
                                        );
                                        setOpenCategories(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          categorie.name === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {categorie.name}
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cookTime"
                    render={({ fields }) => (
                      <FormItem>
                        <FormLabel>
                          How long does it take to perpare the recipe?
                        </FormLabel>
                        <FormControl>
                          <Slider
                            min={1}
                            max={200}
                            step={1}
                            {...fields}
                            value={[watch("cookTime")]}
                            onValueChange={(value) =>
                              setValue("cookTime", value[0])
                            }
                            className="w-full"
                          />
                        </FormControl>
                        <FormDescription>
                          Use the slider adjust time:{" "}
                          {minutesToHoursAndMinutes(watch("cookTime"))}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write how to perpare the recipe ... "
                        rows={40}
                        className="rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormItem>Ingredients</FormItem>
              <div className="space-y-4 mt-2">
                {fields.map((field, idx) => {
                  return (
                    <Card key={field.id} className="w-full">
                      <CardHeader className="relative">
                        <CardTitle>Ingredient</CardTitle>
                        <CardDescription>
                          Select the Name and Measure
                        </CardDescription>
                        <Button
                          className="absolute right-6 top-5"
                          variant="ghost"
                          onClick={() => remove(idx)}
                        >
                          Cancel
                        </Button>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Ingredien form={form} idx={idx} />
                        <FormField
                          control={form.control}
                          name={`ingredients.${idx}.measure`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Measure</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ingredient's measure .."
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Button
                onClick={() => append({ name: "", measure: "" })}
                type="button"
                size="sm"
                className="flex mx-auto mt-4 gap-4"
              >
                <PlusCircle className="size-4" />{" "}
                <span>Add More Ingredient</span>
              </Button>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="allergicIngredients"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Are there any of the following ingredients in your
                        recipe?
                      </FormLabel>
                      <FormDescription>
                        Select carefully, many people are allergic to some of
                        this ingredients.
                      </FormDescription>
                      <FormDescription>
                        No need to select if {`don't`}
                      </FormDescription>
                    </div>
                    {allergicIngredients.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="allergicIngredients"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VideoURL</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-96"
                        placeholder="Please, provide your video url ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="block mx-auto">
            Update Recipe
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UpdateRecipe;
