import { Button } from "@/components/ui/button";
import { Input as InputRaw } from "@/components/ui/input";
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

const MotionFormLabel = motion(FormLabel);
const MotionFormDescription = motion(FormDescription);
const MotionFormMessage = motion(FormMessage);
const Input = motion(InputRaw);
const MotionButton = motion(Button);

export default function Login() {
  const [signup, setSignup] = useState(false);

  const { googlePopUp, signUp, signIn, updateProfile } = useAuth();

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
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (data) => {
    if (data.name === "aaaa") {
      //login
      await signIn(data.email, data.password);
    } else {
      // sign-up
      const res = await signUp(data.email, data.password);
      if (res?.email) await updateProfile(data.name, "");
    }

    form.reset();
    redirect();
  };

  return (
    <MotionConfig transition={{ duration: 1, type: "spring", bounce: 0 }}>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div>
              <motion.div layout className="grid gap-2 text-center mb-4">
                <motion.h1 layout className="text-3xl font-bold">
                  {signup ? "Sign up" : "Login"}
                </motion.h1>
                <AnimatePresence mode="wait">
                  {!signup ? (
                    <motion.p
                      layout
                      key="test1"
                      className="text-balance text-muted-foreground"
                    >
                      Enter your email and password below to login to your
                      account
                    </motion.p>
                  ) : (
                    <motion.p
                      layout
                      key="test2"
                      className="text-balance text-muted-foreground"
                    >
                      Enter your info below to create to your account
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  <AnimatePresence initial="false" mode="popLayout">
                    {signup && (
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="grid gap-2"
                        key="name"
                        layout
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <MotionFormLabel layout>
                                Full name
                              </MotionFormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Bill Gates"
                                  type="text"
                                  layout
                                  {...field}
                                />
                              </FormControl>
                              <MotionFormDescription layout>
                                Type your public display name.
                              </MotionFormDescription>
                              <MotionFormMessage layout />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div layout className="grid gap-2">
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <MotionFormLabel>Email</MotionFormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="bill@example.com"
                              layout
                              {...field}
                            />
                          </FormControl>
                          <MotionFormDescription>
                            Type your email address
                          </MotionFormDescription>
                          <MotionFormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div layout className="grid gap-2">
                    <div className="flex items-center">
                      {/* <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link> */}
                    </div>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <MotionFormLabel layout>Password</MotionFormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              layout
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <MotionFormDescription layout>
                            Type your password
                          </MotionFormDescription>
                          <MotionFormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <MotionButton
                    layout
                    onClick={() => {
                      if (!signup) form.setValue("name", "aaaa");
                      form.handleSubmit(onSubmit);
                    }}
                    className="w-full"
                  >
                    {signup ? "Sign up" : "Login"}
                  </MotionButton>
                  <motion.div
                    layout
                    className="flex items-center pt-4 space-x-1"
                  >
                    <div className="flex-1 h-px sm:w-16 border-input border"></div>
                    <p className="px-3 text-sm text-balance text-muted-foreground">
                      Login with social accounts
                    </p>
                    <div className="flex-1 h-px sm:w-16 border-input border"></div>
                  </motion.div>
                  <MotionButton
                    layout
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
                  </MotionButton>
                </form>
              </Form>
              <motion.div layout className="mt-4 text-center text-sm">
                {signup
                  ? `Already have an account? `
                  : `Don't have an account? `}
                <Link
                  className="underline"
                  onClick={() => {
                    setSignup((prev) => !prev);
                    form.reset();
                  }}
                >
                  {!signup ? "Sign up" : "Login"}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
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
