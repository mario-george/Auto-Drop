"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ContactForm({
  classes,
  locale,
  name,
  email,
  message,
  phone,
  send,
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  invalidEmail,
  invalidMessage,
  invalidName,
  invalidPhone,
}: {
  classes?: string;
  locale: string;
  name: string;
  email: string;
  message: string;
  phone: string;
  send: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  invalidEmail: string;
  invalidMessage: string;
  invalidName: string;
  invalidPhone: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formSchema = z.object({
    name: z.string().min(2, invalidName).max(100),
    message: z.string().max(400, invalidMessage),
    email: z
      .string()
      .min(6, invalidEmail)
      .refine((email) => emailRegex.test(email), {
        message: invalidEmail,
      }),
    phone: z.string().min(5, invalidPhone),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        toast.success("Your message has been sent!", {
          position: "bottom-left",
        });
      } else {
        toast.error("Something went wrong.", { position: "bottom-left" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

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
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel className="shadow-sm text-xs md:text-base">
                  {name}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={namePlaceholder}
                    {...field}
                    id="name"
                    className="shadow-sm text-xs md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-base">{email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={emailPlaceholder}
                    {...field}
                    id="email"
                    className="text-xs md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-base">{phone}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={phonePlaceholder}
                    {...field}
                    id="phone"
                    className="text-xs md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-base">
                  {message}
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder={messagePlaceholder}
                    {...field}
                    id="message"
                    className="text-xs md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ReCAPTCHA
            sitekey={process.env.RECAPATCHA_SITE_KEY || ""}
            onChange={() => setCheck(!check)}
            style={{overflow:"auto"}}
          />
          <Button
            type="submit"
            className="w-full bg-[#2E3C41] hover:text-[#2E3C41] 
         hover:bg-transparent hover:border hover:border-[#2E3C41] text-xs md:text-base"
            disabled={isLoading || !check}
          >
            {isLoading ? <Loader2 className=" animate-spin" /> : send}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
