"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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

export default function SignupForm({
  classes,
  locale,
  fName,
  lName,
  email,
  password,
  confirmPassword,
  signup,
  alreadyHaveAccount,
  login,
  or,
  fNamePlaceholder,
  lNamePlaceholder,
  emailPlaceholder,
  passwordPlaceholder,
  confirmPasswordPlaceholder,
  passwordNotMatch,
  invalidEmail,
  invalidPassword,
  phone,
  phonePlaceholder,
  invalidPhone,
  invalidFName,
  invalidLName,
  code,
  codePlaceholder,
  confirm,
  invalidCode,
}: {
  classes?: string;
  locale: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  signup: string;
  alreadyHaveAccount: string;
  login: string;
  or: string;
  fNamePlaceholder: string;
  lNamePlaceholder: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  passwordNotMatch: string;
  invalidEmail: string;
  invalidPassword: string;
  invalidFName: string;
  invalidLName: string;
  phone: string;
  phonePlaceholder: string;
  invalidPhone: string;
  code: string;
  confirm: string;
  codePlaceholder: string;
  invalidCode: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasUpperCase: false,
    hasSpecialChar: false,
    isMinLength: false,
  });
  const [signedUpEmail, setSignedUpEmail] = useState("");
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const [conditionsIsVisible, setConditionsIsVisible] = useState(false);
  const [currWindow, setCurrWindow] = useState("signup");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConditionsIsVisible(true);
    const password = e.target.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );
    const isMinLength = password.length >= 8;

    setPasswordStrength({
      hasUpperCase,
      hasSpecialChar,
      isMinLength,
    });
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  const formSchema = z
    .object({
      firstName: z.string().min(2, invalidFName).max(100),
      lastName: z.string().min(2, invalidLName).max(100),
      email: z
        .string()
        .min(6, invalidEmail)
        .refine((email) => emailRegex.test(email), {
          message: invalidEmail,
        }),
      phone: z.string().min(1, invalidPhone).max(100),
      password: z
        .string()
        .min(8, " ")
        .refine((password: string): password is string => {
          setConditionsIsVisible(true);
          return passwordRegex.test(password);
        }),
      passwordConfirmation: z.string().min(8, " "),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: passwordNotMatch,
      path: ["passwordConfirmation"],
    });
  const codeSchema = z.object({
    code: z.string().min(2, invalidCode).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });
  const codeSubmitHandler = async (data: z.infer<typeof codeSchema>) => {
    console.log(data);
    console.log(signedUpEmail);

    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        email: signedUpEmail,
      }),
    });
    if (resp.ok) {
      let responseData = await resp.json();
      let {planName , subscriptionStart ,            subscriptionExpiry,
        subscriptionOrdersLimit,
        subscriptionProductsLimit,totalOrdersLimit,totalProductsLimit} =  responseData.data.user
        dispatch(
          userActions.login({
            token: responseData.data.accessToken,
            id: responseData.data.user._id,
            name: responseData.data.user.name,
            storeName: responseData.data.user.storeName,
            storeLink: responseData.data.user.storeLink,
            email: responseData.data.user.email,
            role: responseData.data.user.role,
            image: responseData.data.user.image,
            phone: responseData.data.user.phone,
            sallaToken: responseData.data.user.sallaToken,
            aliExpressToken: responseData.data.user.aliExpressToken,
            country: responseData.data.user.country,
            createdAt: responseData.data.user.createdAt,
            planName,
            subscriptionStart,
            subscriptionExpiry,
            subscriptionOrdersLimit,
            subscriptionProductsLimit,totalProductsLimit,totalOrdersLimit,
            isLoggedin: true,
          })
        );
      router.push(`/`);
    } else {
      const data = await resp.json();
      if (data.message) setErrorMsg(data.message);
      else setErrorMsg("Something went wrong");
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.data.user.active) {
          setSignedUpEmail(data.data.user.email);
          setCurrWindow("verify");
          return;
        }
      } else {
        const data = await res.json();
        if (data.message) setErrorMsg(data.message);
        else setErrorMsg("Something went wrong");
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignup = () => {
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {currWindow === "signup" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4 lg:w-3/4 w-full"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <div className="md:flex md:justify-between md:gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel className="shadow-sm text-sm md:text-base">
                      {fName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={fNamePlaceholder}
                        {...field}
                        id="firstName"
                        className="shadow-sm text-sm md:text-base"
                        onFocus={() => setErrorMsg(null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel className="text-sm md:text-base">
                      {lName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={lNamePlaceholder}
                        {...field}
                        id="lastName"
                        className="text-sm md:text-base"
                        onFocus={() => setErrorMsg(null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    {email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={emailPlaceholder}
                      {...field}
                      id="email"
                      className="text-sm md:text-base"
                      onFocus={() => setErrorMsg(null)}
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
                  <FormLabel className="text-sm md:text-base">
                    {phone}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      international
                      defaultCountry="SA"
                      placeholder={phonePlaceholder}
                      {...field}
                      id="phone"
                      className=" md:text-base flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border focus:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
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
                        onFocus={() => {
                          setErrorMsg(null);
                          setConditionsIsVisible(true);
                        }}
                        onInput={handlePasswordChange}
                        onBlur={() => setConditionsIsVisible(false)}
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
                  <AnimatePresence>
                    <motion.div
                      className="flex text-sm md:text-base flex-col gap-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {!passwordStrength.hasUpperCase && (
                        <span className="text-red-500 mx-2">
                          {locale === "en" ? "✗ Uppercase" : "✗ حرف كبير"}
                        </span>
                      )}
                      {passwordStrength.hasUpperCase && (
                        <span className="text-green-500 mx-2">
                          {locale === "en" ? "✓ Uppercase" : "✓ حرف كبير"}
                        </span>
                      )}
                      {!passwordStrength.hasSpecialChar && (
                        <span className="text-red-500 mx-2">
                          {locale === "en"
                            ? "✗ Special Char ($-%-&-...)"
                            : "✗ رمز خاص" + " ($-%-&-...)"}
                        </span>
                      )}
                      {passwordStrength.hasSpecialChar && (
                        <span className="text-green-500 mx-2">
                          {locale === "en"
                            ? "✓ Special Char ($-%-&-...)"
                            : "✓ رمز خاص" + " ($-%-&-...)"}
                        </span>
                      )}
                      {!passwordStrength.isMinLength && (
                        <span className="text-red-500 mx-2">
                          {locale === "en"
                            ? "✗ Min 8 characters"
                            : "✗ 8 أحرف على الأقل"}
                        </span>
                      )}
                      {passwordStrength.isMinLength && (
                        <span className="text-green-500 mx-2">
                          {locale === "en"
                            ? "✓ Min 8 characters"
                            : "✓ 8 أحرف على الأقل"}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">
                    {confirmPassword}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={confirmPasswordPlaceholder}
                        {...field}
                        className="text-sm md:text-base"
                        id="passwordConfirmation"
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
              {isLoading ? <Loader2 className=" animate-spin" /> : signup}
            </Button>
            {errorMsg && (
              <div className="text-center text-red-400">{errorMsg}</div>
            )}
            <div className="text-center">
              <span className="opacity-70 text-sm md:text-base">
                {alreadyHaveAccount}
              </span>{" "}
              <Link
                href={`/${locale}/login`}
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
      ) : (
        <Form {...codeForm}>
          <form
            onSubmit={codeForm.handleSubmit(codeSubmitHandler)}
            className="bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4 lg:w-3/4 lg:max-h-[14rem] w-full"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">{code}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={codePlaceholder}
                      {...field}
                      id="code"
                      className="text-sm md:text-base"
                      onFocus={() => setErrorMsg(null)}
                    />
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
              {isLoading ? <Loader2 className=" animate-spin" /> : confirm}
            </Button>
            {errorMsg && (
              <div className="text-center text-red-400">{errorMsg}</div>
            )}
          </form>
        </Form>
      )}
    </motion.div>
  );
}
