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

import WalletUserCard from "./WalletUserCard";
import HeaderText from "./HeaderText";

interface WalletProps {
  locale?: string;
  wallet: string;
  myCards: string;
  addCard: string;
  chargeWallet: string;
}

export default function Settings(props: WalletProps) {
  const user = useSelector((state: RootState) => state.user);
  const {
    locale,
    wallet,
    myCards,
    addCard,
    chargeWallet,
    /*     settings,
    changePassword,
    changeAccountDetails,
    newPassword,
    currentPassword,
    confirmPassword,
    saveChanges, */
  } = props;
  const isAr = locale === "ar";
  let WalletUserCardProps = {
    name: user.name,
    chargeWallet,
  };
  return (
    <MotionWrapper locale={locale}>
      <HeaderText isAr={isAr} title={wallet} />

      <div
        className={`relative bg-white  text-[#253439]   rounded-lg  !px-0 mt-4 overflow-hidden ${
          isAr ? `ml-3 tab:ml-3 tab:mr-3` : `mr-3 tab:mr-3 tab:ml-3`
        }  `}
        dir={locale === "en" ? "ltr" : "rtl"}
      >
        {/*   <div className="absolute top-12 right-0 left-0">
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
 */}

        <WalletUserCard {...WalletUserCardProps} />
        <div className={` tab:px-6 py-2 my-12 tab:mx-3`}>
          {/*   <div className="flex space-s-6 tab:space-s-0 flex-wrap tab:max-w-[60%] lap:max-w-[50%] tab:mb-4">
            <Button
              className="w-full ms:max-w-[60%] ms:mx-auto tab:mx-auto tab:max-w-[150px] bg-[#f0f3f4] rounded-lg text-[#253439] my-2 sm:my-0 hover:bg-[#f0f3f4]"
              onClick={() => {
                // setCurrWindow("ChangePassword");
              }}
            >
              {"changePassword"}
            </Button>
            <Button
              className="w-full ms:max-w-[60%] ms:!mx-auto tab:!mx-auto tab:max-w-[150px] bg-[#253439] rounded-lg my-2 sm:my-0 hover:bg-[#253439]"
              onClick={() => {
                // setCurrWindow("AccountInfo");
              }}
            >
              {"changeAccountDetails"}
            </Button>
          </div> */}
        </div>
      </div>
      <HeaderText isAr={isAr} title={myCards} />
      <HeaderText isAr={isAr} title={addCard} />
    </MotionWrapper>
  );
}
