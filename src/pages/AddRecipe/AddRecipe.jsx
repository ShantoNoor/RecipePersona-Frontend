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
import { useState } from "react";
import photoUploader from "@/utils/photoUploader";
import axiosPublic from "@/hooks/useAxios";
import { Textarea } from "@/components/ui/textarea";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import FormHeading from "./FormHeading";
import { recipeSchema } from "@/schemas/recipe.schema";
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

import cuisines from "./data/cuisines.json";
import categories from "./data/categories.json";
import { cn } from "@/utils/utils";
import { Slider } from "@/components/ui/slider";
import minutesToHoursAndMinutes from "@/utils/minutesToHoursAndMinutes";
import { ScrollArea } from "@/components/ui/scroll-area";

const steps = [
  {
    id: "Step 1",
    name: "General Information",
    details: "Please, provide informations about your recipe",
    fields: ["cuisine", "category", "cookTime"],
  },
  {
    id: "Step 2",
    name: "Write Recipe",
    details: "Please, write your recipe in details",
    fields: ["country", "state", "city", "street", "zip"],
  },
  {
    id: "Step 3",
    name: "Answer Questions",
    details: "Please, answer the following questions carefully.",
  },
  {
    id: "Step 4",
    name: "Complete",
    details: "Congratulations, you recipe in added",
  },
];

const AddRecipe = () => {
  const { user } = useAuth();

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const [openCategories, setOpenCategories] = useState(false);

  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      cookTime: 5,
    },
  });

  const { handleSubmit, reset, trigger, watch, setValue } = form;

  const processForm = (data) => {
    console.log(data);
    reset();
    setCurrentStep(0);
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    fields.forEach((f) => {
      console.log(watch(f));
    });

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  async function onSubmit(data) {
    console.log(data);
    // data.createdBy = user._id;

    // if (typeof data.photo === "object") {
    //   const uploadUrl = await photoUploader(photo);
    //   updateFields.photo = uploadUrl;
    // }

    // toast.promise(axiosPublic.post(`/recipes`, data), {
    //   loading: "Adding recipe, Please wait ...",
    //   success: () => "Recipe added successfully",
    //   error: (err) => {
    //     toast.error("Failed to add recipe");
    //     return err.message;
    //   },
    // });
  }

  return (
    <section className="flex flex-col justify-between gap-10">
      {/* page banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-[url(https://e0.pxfuel.com/wallpapers/461/160/desktop-wallpaper-recipe-book-recipe-book-stock.jpg)] bg-no-repeat bg-cover bg-center md:p-10 rounded-lg"
      >
        <PageHeader className="relative">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.75, height: "auto" }}
            className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg absolute inset-0 md:inset-4 lg:inset-12"
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="z-[1] flex flex-col gap-1 items-center justify-center"
          >
            <PageHeaderHeading className="text-white">
              Add Your Own Recipe
            </PageHeaderHeading>
            <PageHeaderDescription className="text-zinc-100">
              Please, fill the setps properly to add your recipe.
            </PageHeaderDescription>
          </motion.div>
        </PageHeader>
      </motion.div>

      {/* steps */}
      <div aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group text-primary flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex text-primary w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-muted-foreground text-muted-foreground py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormHeading step={steps[currentStep]} />

              <div className="mt-6 space-y-6">
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
                        defaultValue={field.value}
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
                    <FormItem className="flex flex-col">
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
                        <PopoverContent className="w-[200px] p-0">
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
                                      form.setValue("category", categorie.name);
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
                          max={1000}
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
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormHeading step={steps[currentStep]} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormHeading step={steps[currentStep]} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormHeading step={steps[currentStep]} />
            </motion.div>
          )}
        </form>
      </Form>

      {/* Navigation */}
      <div>
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            variant="outline"
          >
            <ArrowLeft />
          </Button>
          <Button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            variant="outline"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddRecipe;
