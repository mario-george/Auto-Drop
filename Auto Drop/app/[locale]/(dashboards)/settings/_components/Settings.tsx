"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderContainer from "../../_components/shared/HeaderContainer";
import SettingsSVG from "@/components/icons/ClientSVGs/SettingsSVG";
import { RootState } from "@/store";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import MotionWrapperExit from "../../_components/shared/MotionWrapperExit";
import { useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import AccountDetails from "./AccountDetails";
import SettingsPassword from "./SettingsPassword";
interface SettingsProps {
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
  currentPasswordPlaceholder: string;
  passwordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  passwordNotMatch?:string
}

export default function Settings(props: SettingsProps) {
  const user = useSelector((state: RootState) => state.user);
  const [currWindow, setCurrWindow] = useState("AccountInfo");
  console.log(user);
  const {
    locale,
    settings,
    changePassword,
    changeAccountDetails,
    newPassword,
    currentPassword,
    confirmPassword,
    saveChanges,
  } = props;
  const isAr = locale === "ar";
  return (
    <MotionWrapper locale={locale}>
      <div
        className={`relative bg-white  text-[#253439]   rounded-lg  !px-0 mt-4 overflow-hidden dark:bg-[#2e464f] dark:text-white ${
          isAr ? `ml-3 tab:ml-3 tab:mr-3` : `mr-3 tab:mr-3 tab:ml-3`
        }  `}
        dir={locale === "en" ? "ltr" : "rtl"}
      >
        <div className="absolute top-12 right-0 left-0">
          <svg
            width="1607"
            height="1"
            viewBox="0 0 1607 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1607"
              y1="0.5"
              x2="-4.37115e-08"
              y2="0.49986"
              stroke="#707070"
            />
          </svg>
        </div>

        <HeaderContainer
          title={settings}
          IconComponent={SettingsSVG}
          headerClasses={`absolute ${
            isAr ? `right-0 ` : `left-0`
          } -top-10   rounded-none border-none  px-0 `}
        />

        <div className={` tab:px-6 py-2 my-12 tab:mx-3`}>
          <div className="flex space-s-6 tab:space-s-0 flex-wrap tab:max-w-[60%] lap:max-w-[50%] tab:mb-4">
            <Button
              className="w-full ms:max-w-[60%] ms:mx-auto tab:mx-auto tab:max-w-[150px] bg-[#f0f3f4] rounded-lg text-[#253439] my-2 sm:my-0 hover:bg-[#f0f3f4] dark:bg-white dark:text-[#2E464F]"
              onClick={() => {
                setCurrWindow("ChangePassword");
              }}
            >
              {changePassword}
            </Button>
            <Button
              className="w-full ms:max-w-[60%] ms:!mx-auto tab:!mx-auto tab:max-w-[150px] bg-[#253439] rounded-lg my-2 sm:my-0 hover:bg-[#253439] dark:text-white dark:bg-[#253439]"
              onClick={() => {
                setCurrWindow("AccountInfo");
              }}
            >
              {changeAccountDetails}
            </Button>
          </div>
          <AnimatePresence>
            {currWindow == "AccountInfo" ? (
              <>
                <AccountDetails {...props} />
              </>
            ) : (
              <>
                <SettingsPassword {...props} />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionWrapper>
  );
}
