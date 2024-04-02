import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

const MotionButton = motion(Button);

export default function Login() {
  const [signup, setSignup] = useState(false);

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
              <div className="grid gap-4">
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
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        type="name"
                        placeholder="Bill Gates"
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div layout className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="bill@example.com"
                    required
                  />
                </motion.div>
                <motion.div layout className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link> */}
                  </div>
                  <Input id="password" type="password" required />
                </motion.div>
                <MotionButton layout type="submit" className="w-full">
                  {signup ? "Sign up" : "Login"}
                </MotionButton>
                <motion.div layout className="flex items-center pt-4 space-x-1">
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
              </div>
              <motion.div layout className="mt-4 text-center text-sm">
                {signup
                  ? `Already have an account? `
                  : `Don't have an account? `}
                <Link
                  className="underline"
                  onClick={() => setSignup((prev) => !prev)}
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
