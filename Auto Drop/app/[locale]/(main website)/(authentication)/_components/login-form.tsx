"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { userActions } from "@/store/user-slice";
import { useRouter } from "@/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Philosopher } from "next/font/google";

export default function LoginForm({
  classes,
  locale,
  email,
  password,
  login,
  dontHaveAccount,
  signup,
  or,
  emailPlaceholder,
  passwordPlaceholder,
  invalidEmail,
  forgetPassword,
  invalidPassword,
}: {
  classes?: string;
  locale: string;
  email: string;
  password: string;
  login: string;
  dontHaveAccount: string;
  signup: string;
  or: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  invalidEmail: string;
  forgetPassword: string;
  invalidPassword: string;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formSchema = z.object({
    email: z
      .string()
      .min(6, invalidEmail)
      .refine((email) => emailRegex.test(email), {
        message: invalidEmail,
      }),
    password: z.string().min(8, invalidPassword).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signin`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        dispatch(
          userActions.login({
            token: responseData.data.accessToken,
            id: responseData.data.user._id,
            name: responseData.data.user.name,
            email: responseData.data.user.email,
            role: responseData.data.user.role,
            image: responseData.data.user.image,
            Phone: responseData.data.user.Phone,
            sallaToken: responseData.data.user.sallaToken,
            aliExpressToken: responseData.data.user.aliExpressToken,
            country: responseData.data.user.country,
            isLoggedin: true,
          })
        );
        router.push(`/`);
      } else {
        if (responseData.message) setErrorMsg(responseData.message);
        else setErrorMsg("Something went wrong");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}auth/google`);
    } catch (error) {
      console.log(error);
    }
  };

  // const appleSignup = () => {
  //   console.log("apple signup");
  // };

  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn("flex justify-center", classes)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4 lg:w-3/4 w-full"
          dir={locale === "ar" ? "rtl" : "ltr"}
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">{email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={emailPlaceholder}
                    {...field}
                    className="text-sm md:text-base"
                    id="email"
                    onFocus={() => setErrorMsg(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">
                  {password}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder={passwordPlaceholder}
                      {...field}
                      className="text-sm md:text-base"
                      id="password"
                      autoComplete="password"
                      onFocus={() => setErrorMsg(null)}
                    />
                    {isPasswordVisible ? (
                      <EyeOff
                        onClick={handleTogglePasswordVisibility}
                        className={cn(
                          "absolute text-gray-400 top-2 cursor-pointer",
                          locale === "en" ? "right-5" : "left-5"
                        )}
                      />
                    ) : (
                      <Eye
                        onClick={handleTogglePasswordVisibility}
                        className={cn(
                          "absolute text-gray-400 top-2 cursor-pointer",
                          locale === "en" ? "right-5" : "left-5"
                        )}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Link
              href={`/${locale}/forgetPassword`}
              className="hover:underline text-sm md:text-base"
            >
              {forgetPassword}
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#2E3C41] hover:text-[#2E3C41]
         hover:bg-transparent hover:border hover:border-[#2E3C41] text-sm md:text-base"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className=" animate-spin" /> : signup}
          </Button>
          {errorMsg && (
            <div className="text-center text-red-400">{errorMsg}</div>
          )}
          <div className="text-center">
            <span className="opacity-70 text-sm md:text-base">
              {dontHaveAccount}
            </span>{" "}
            <Link
              href={`/${locale}/signup`}
              className="hover:underline text-sm md:text-base"
            >
              {login}
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 w-1/2" />
            <span className="mx-2 text-gray-500 text-sm md:text-base">
              {or}
            </span>
            <div className="border-t border-gray-300 w-1/2" />
          </div>
          <div className="flex gap-5 justify-center">
            <button
              className="bg-[#FDFDFC] rounded-[50%] p-2 md:w-[60px] md:h-[60px] w-[40px] h-[40px] shadow-md 
          hover:shadow-none flex justify-center items-center"
              onClick={googleSignup}
              type="button"
            >
              <Image
                src={"/google.svg"}
                alt="google icon"
                width={100}
                height={100}
                className="w-8 h-8"
              />
            </button>
            {/* <button
              className="bg-[#FDFDFC] rounded-[50%] p-2 md:w-[60px] md:h-[60px] w-[40px] h-[40px] shadow-md 
          hover:shadow-none flex justify-center items-center"
              onClick={appleSignup}
              type="button"
            >
              <Image
                src={"/apple.svg"}
                alt="facebook icon"
                width={100}
                height={100}
                className="w-8 h-8"
              />
            </button> */}
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
