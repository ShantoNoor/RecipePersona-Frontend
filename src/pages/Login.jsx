import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import useRedirect from "@/hooks/useRedirect";
import Image from "@/components/Image";
import axiosPublic from "@/hooks/useAxios";
import { cn } from "@/utils/utils";
import { UtensilsCrossed } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";

const variants = {
  initial: { opacity: 0, y: -30, height: 0 },
  exit: { opacity: 0, y: -30, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
};

export default function Login() {
  const [signup, setSignup] = useState(false);

  const { googlePopUp, signUp, signIn, updateProfile, setUser } = useAuth();

  const redirect = useRedirect();

  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, "This field is required")
      .min(3, "Name must be at least 3 characters long"),
    email: z.string().email({ message: "Enter a valid email address." }),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        }
      ),
    confirm_password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        }
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", name: "", confirm_password: "" },
  });

  const onSubmit = async (data) => {
    if (data.confirm_password === "12qw!@QW" && !signup) {
      //login
      await signIn(data.email, data.password);
    } else {
      // sign-up
      if (data.confirm_password !== data.password) {
        form.setError("confirm_password", {
          type: "custom",
          message: "Password doesn't match.",
        });
        return;
      }
      const res = await signUp(data.email, data.password);
      if (res?.email) {
        const results = await Promise.all([
          updateProfile(data.name, ""),
          axiosPublic.post("/users", data),
        ]);

        setUser(results[1].data)
      }
    }

    form.reset();
    redirect();
  };

  return (
    <MotionConfig transition={{ duration: 1, type: "linear" }}>
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center min-h-screen py-12 relative">
          <motion.span
            className="absolute left-4 top-4 md:left-8 md:top-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className={cn(buttonVariants({ variant: "ghost" }))}>
              Home
            </Link>
          </motion.span>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center mb-4">
              <AnimatePresence mode="wait">
                {!signup ? (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                      Enter your email and password below to login to your
                      account
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <h1 className="text-3xl font-bold">Sign up</h1>
                    <p className="text-balance text-muted-foreground">
                      Enter your info below to create to your account
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2"
              >
                <AnimatePresence>
                  {signup && (
                    <motion.div
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="grid gap-2"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Bill Gates"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Type your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="grid gap-2">
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="bill@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Type your email address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="password" {...field} />
                        </FormControl>
                        <FormDescription>Type your password</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <AnimatePresence>
                  {signup && (
                    <motion.div
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="grid gap-2"
                    >
                      <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                placeholder="confirm password"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Retype the password
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button
                  onClick={() => {
                    if (!signup) {
                      form.setValue("name", "aaaa");
                      form.setValue("confirm_password", "12qw!@QW");
                    }
                    form.handleSubmit(onSubmit);
                  }}
                  className="w-full"
                >
                  {signup ? "Sign up" : "Login"}
                </Button>
                <div className="flex items-center pt-4 space-x-1">
                  <div className="flex-1 h-px sm:w-16 border-input border"></div>
                  <p className="px-3 text-sm text-balance text-muted-foreground">
                    Login with social accounts
                  </p>
                  <div className="flex-1 h-px sm:w-16 border-input border"></div>
                </div>
                <Button
                  variant="outline"
                  className="w-full flex justify-center items-center gap-2"
                  onClick={async () => {
                    await googlePopUp();
                    redirect();
                  }}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-4 h-4 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                  Login with Google
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              {signup ? `Already have an account? ` : `Don't have an account? `}
              <Link
                className="underline"
                onClick={() => {
                  setSignup((prev) => !prev);
                  form.reset();
                }}
              >
                {!signup ? "Sign up" : "Login"}
              </Link>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute text-white right-4 top-4 md:right-8 md:top-8 z-20 p-2 flex items-center text-lg font-medium"
          >
            <UtensilsCrossed className="mr-2" />
            RecipePersona
            <div className="absolute inset-0 bg-zinc-900/75 rounded-[var(--radius)] -z-[1]" />
          </motion.div>
          <Image
            src="https://data.ipic.ai/images/8lodJaPQi04rGQw_1694737137.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </MotionConfig>
  );
}
