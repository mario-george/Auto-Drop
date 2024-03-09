import MotionWrapperExit from "../../_components/shared/MotionWrapperExit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import CustomHttp from "@/components/helpers/CustomHttp";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface SettingsPassword {
  settings: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  saveChanges: string;
  changePassword: string;
  changeAccountDetails: string;
  merchantID: string;
  name: string;
  marketName: string;
  marketLink: string;
  email: string;
  phone: string;
  country: string;
  locale?: string;
  currentPasswordPlaceholder?: string;
  passwordPlaceholder?: string;
  confirmPasswordPlaceholder?: string;
  passwordNotMatch?: string;
}

export default function SettingsPassword(props: SettingsPassword) {
  const {
    locale,
    newPassword,
    currentPassword,
    confirmPassword,
    saveChanges,
    currentPasswordPlaceholder,
    confirmPasswordPlaceholder,
    passwordPlaceholder,
    passwordNotMatch,
  } = props;
  const token = useSelector((state: RootState) => state.user.token);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, " ")
        .refine((password: string) => {
          return passwordRegex.test(password);
        }),
      passwordConfirmation: z.string().min(8, " "),
      currentPassword: z.string().max(100),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: passwordNotMatch,
      path: ["passwordConfirmation"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let http = await CustomHttp(
      "handler/change-password",
      token,
      JSON.stringify({
        newPassword: data.password,
        confirmPassword: data.passwordConfirmation,
        currentPassword: data.currentPassword,
      }),
      {
        method: "POST",
      }
    );
    console.log(http.responseData);
    console.log(http.responseData.message);
    if (!http.responseIsOk) {
      setErrorMsg(http.responseData.message);
    } else {
      setSuccessMessage("Password changed successfully");
    }
    /* let respData = http.data;

    let isLoading = http.isLoading;
    let error = http.error; */
    /* 
    if (respData.message) setErrorMsg(respData.message);
    else setErrorMsg("Something went wrong"); */
  };
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMessage] = useState<string | null>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleToggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible((prev) => !prev);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const [passwordStrength, setPasswordStrength] = useState({
    hasUpperCase: false,
    hasSpecialChar: false,
    isMinLength: false,
  });

  return (
    <>
      <MotionWrapperExit locale={locale}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-[#F7F5F2] rounded-lg p-2 lap:p-8 space-y-4 lg:w-3/4 w-full dark:bg-[#2e464f]"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <div className="ms:text-sm flex flex-col space-y-3 tab:space-y-6 mt-3">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="FormItemWrapper">
                    <FormLabel className="FormLabel">
                      {currentPassword}
                    </FormLabel>
                    <FormControl>
                      <div className="relative ">
                        <Input
                          type={isCurrentPasswordVisible ? "text" : "password"}
                          placeholder={currentPasswordPlaceholder}
                          {...field}
                          className="changePwLabel"
                          id="passwordConfirmation"
                          autoComplete="password"
                          onFocus={() => setErrorMsg(null)}
                        />
                        {isCurrentPasswordVisible ? (
                          <EyeOff
                            onClick={handleToggleCurrentPasswordVisibility}
                            className={cn(
                              "absolute text-gray-400 top-2 cursor-pointer",
                              locale === "en" ? "right-5" : "left-5"
                            )}
                          />
                        ) : (
                          <Eye
                            onClick={handleToggleCurrentPasswordVisibility}
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
                name="password"
                render={({ field }) => (
                  <FormItem className="FormItemWrapper">
                    <FormLabel className="FormLabel ">{newPassword} </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder={passwordPlaceholder}
                          {...field}
                          className="changePwLabel"
                          id="password"
                          autoComplete="password"
                          onFocus={() => {
                            setErrorMsg(null);
                          }}
                          onInput={handlePasswordChange}
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
              />{" "}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem className="FormItemWrapper ">
                    <FormLabel className="FormLabel">
                      {confirmPassword}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder={confirmPasswordPlaceholder}
                          {...field}
                          className="changePwLabel"
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
              <Button className="ms:max-w-[50%] ms:my-4  tab:max-w-[12rem] bg-[#253439] rounded-lg  hover:bg-[#253439] tab:mx-auto dark:bg-white dark:text-[#2E464F] ">
                {saveChanges}
              </Button>
            </div>{" "}
            {errorMsg && (
              <div className="text-center text-red-400">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="text-center text-green-400">{successMsg}</div>
            )}
          </form>
        </Form>
      </MotionWrapperExit>
    </>
  );
}
