"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "@/navigation";
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
import { cn } from "@/lib/utils";

export default function ForgetPasswordForm({
  locale,
  emailPlaceholder,
  invalidEmail,
  tip,
  send,
  email,
  toastMessage,
  back,
}: {
  locale: string;
  emailPlaceholder: string;
  invalidEmail: string;
  tip: string;
  send: string;
  email: string;
  toastMessage: string;
  back: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formSchema = z.object({
    email: z
      .string()
      .min(6, invalidEmail)
      .refine((email) => emailRegex.test(email), {
        message: invalidEmail,
        path: ["email"],
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/sendmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            locale,
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
        style: { fontSize: "12px" },
      });
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base flex justify-between flex-wrap">
                <div>{email}</div>
                <Link
                  href="/login"
                  className="text-xs md:text-base block opacity-70 hover:underline"
                >
                  {back}{" "}
                  <LogOut
                    className={cn(
                      "inline-block",
                      locale === "ar" ? "mr-2 rotate-180" : "ml-2"
                    )}
                  />
                </Link>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={emailPlaceholder}
                  {...field}
                  className="text-xs md:text-base"
                  id="email"
                  onFocus={() => setErrorMsg(null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm opacity-70">{tip}</p>
        <Button
          type="submit"
          className="w-full bg-[#2E3C41] hover:text-[#2E3C41]
         hover:bg-transparent hover:border hover:border-[#2E3C41] text-xs md:text-base"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className=" animate-spin" /> : send}
        </Button>
        {errorMsg && <div className="text-center text-red-400">{errorMsg}</div>}
      </motion.form>
    </Form>
  );
}
