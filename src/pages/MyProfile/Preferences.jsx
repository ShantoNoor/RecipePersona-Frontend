import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import ProfileSection from "./ProfileSection";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import axiosPublic from "@/hooks/useAxios";
import { userPreferencesSchema } from "@/schemas/userPreferences.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const allergies = [
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
];

const favoriteCuisines = [
  {
    id: "italian",
    label: "Italian Cuisine",
  },
  {
    id: "chinese",
    label: "Chinese Cuisine",
  },
  {
    id: "indian",
    label: "Indian Cuisine",
  },
  {
    id: "mexican",
    label: "Mexican Cuisine",
  },
  {
    id: "japanese",
    label: "Japanese Cuisine",
  },
];

const dietaryPreferences = [
  {
    id: "nope",
    label: "Nope",
  },
  {
    id: "non-veg",
    label: "Non-Vegetarian (meat)",
  },
  {
    id: "veg-noMeat-noEgg",
    label: "Vegetarian (no meat, no eggs)",
  },
  {
    id: "veg-noMeat-noDairyProductucs",
    label: "Vegetarian (no meat, no dairy productucs)",
  },
  {
    id: "veg-noMeat-egg-dairyProductucs",
    label: "Vegetarian (no meat but with eggs and dairy productucs)",
  },
  {
    id: "vegan",
    label: "Vegan (no meat, no eggs, no dairy productucs)",
  },
];

const Preferences = () => {
  const { user, setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(userPreferencesSchema),
    defaultValues: {
      allergies: [],
      favoriteCuisines: [],
      dietaryPreferences: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("allergies", user?.allergies);
      form.setValue("favoriteCuisines", user?.favoriteCuisines);
      form.setValue("dietaryPreferences", user?.dietaryPreferences);
    }
  }, [user, form]);

  const onSubmit = (data) => {
    toast.promise(axiosPublic.put(`/users/${user._id}`, data), {
      loading: "Loading, Please wait ...",
      success: () => {
        setUser({
          ...user,
          ...data,
        });
        return "Preferences update successfull";
      },
      error: (err) => {
        toast.error("Failed to update preferences");
        return err.message;
      },
    });
  };

  return (
    <ProfileSection
      title="Personalization"
      subtitle="Update your preferences to get personalized recommendations."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="allergies"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Do you have any of these food allergies ?
                  </FormLabel>
                  <FormDescription>
                    No need to select if you {`don't`}
                  </FormDescription>
                </div>
                {allergies.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="allergies"
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
                                  ? field.onChange([...field.value, item.id])
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

          <FormField
            control={form.control}
            name="favoriteCuisines"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    What is your favorite cuisines ?
                  </FormLabel>
                  <FormDescription>
                    Select multiple if you like
                  </FormDescription>
                </div>
                {favoriteCuisines.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="favoriteCuisines"
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
                                  ? field.onChange([...field.value, item.id])
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

          <FormField
            control={form.control}
            name="dietaryPreferences"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="mb-4">
                  <FormLabel>Do you follow any of these diets ?</FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {dietaryPreferences.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} checked={field.value === item.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update preferences</Button>
        </form>
      </Form>
    </ProfileSection>
  );
};

export default Preferences;
