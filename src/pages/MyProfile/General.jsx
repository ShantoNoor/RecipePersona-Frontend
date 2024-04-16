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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ProfileSection from "./ProfileSection";
import AvatarUpload from "@/components/AvatarUpload";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import photoUploader from "@/utils/photoUploader";
import axiosPublic from "@/hooks/useAxios";
import { userGeneralSchema } from "@/schemas/userGeneral.schema";

const General = () => {
  const { user, setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(userGeneralSchema),
    defaultValues: {
      name: "",
      photo: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user?.name);
      form.setValue("email", user?.email);
      form.setValue("photo", user?.photo);
    }
  }, [user, form]);

  async function onSubmit(data) {
    const { name, photo } = data;
    const updateFields = { name };

    if (typeof data.photo === "object") {
      const uploadUrl = await photoUploader(photo);
      updateFields.photo = uploadUrl;
    }

    toast.promise(axiosPublic.put(`/users/${user._id}`, updateFields), {
      loading: "Loading, Please wait ...",
      success: () => {
        setUser({
          ...user,
          name: updateFields.name,
          photo: updateFields?.photo ? updateFields.photo : user.photo,
        });
        return "Profile update successfull";
      },
      error: (err) => {
        toast.error("Failed to update profile");
        return err.message;
      },
    });
  }

  return (
    <ProfileSection title="Account" subtitle="Update your account settings.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
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
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update account</Button>
        </form>
      </Form>
    </ProfileSection>
  );
};

export default General;
