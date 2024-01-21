"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import "react-toastify/dist/ReactToastify.css";
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

export default function ResetPasswordForm({
  locale,
  password,
  passwordPlaceholder,
  invalidPassword,
  confirmPassword,
  confirmPasswordPlaceholder,
  passwordNotMatch,
  reset,
  toastMessage,
  otp,
  otpPlaceholder,
  code,
  invalidOtp,
  userId,
}: {
  locale: string;
  password: string;
  passwordPlaceholder: string;
  invalidPassword: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  passwordNotMatch: string;
  reset: string;
  toastMessage: string;
  otp: string;
  otpPlaceholder: string;
  code: string;
  invalidOtp: string;
  userId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const formSchema = z
    .object({
      password: z.string().min(8, invalidPassword).max(100),
      confirmPassword: z.string().min(8, invalidPassword).max(100),
    })
    .refine((data) => {
      return data.password === data.confirmPassword;
    }, passwordNotMatch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/forgetpassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            OTP: code,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.message);
        return;
      }
      toast.success(toastMessage, {
        position: "bottom-left",
      });
      router.push(`/login`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4 lg:w-1/2 w-full mx-auto pb-10"
        dir={locale === "ar" ? "rtl" : "ltr"}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">{password}</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">
                {confirmPassword}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder={passwordPlaceholder}
                    {...field}
                    className="text-sm md:text-base"
                    id="confirmPassword"
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
        <Button
          type="submit"
          className="w-full bg-[#2E3C41] hover:text-[#2E3C41]
         hover:bg-transparent hover:border hover:border-[#2E3C41] text-sm md:text-base"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className=" animate-spin" /> : reset}
        </Button>
        {errorMsg && <div className="text-center text-red-400">{errorMsg}</div>}
      </motion.form>
    </Form>
  );
}
