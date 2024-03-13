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
import useAddCard from "./hooks/useAddCard";

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
    
  } = props;
  const {value,AddCardComponent} = useAddCard({chargeWallet})
  const isAr = locale === "ar";
  let WalletUserCardProps = {
    name: user.name,
    chargeWallet,
  };
  return (
    <MotionWrapper locale={locale}>
      <HeaderText isAr={isAr} title={wallet} />

      <div
        className={`relative  text-[#253439]   rounded-lg  !px-0 mt-4 overflow-hidden ${
          isAr ? `ml-3 tab:ml-3 tab:mr-3` : `mr-3 tab:mr-3 tab:ml-3`
        }  `}
        dir={locale === "en" ? "ltr" : "rtl"}
      >
   <div className="bg-white dark:bg-[#2e464f]  rounded-lg p-4 my-4">


        <WalletUserCard {...WalletUserCardProps} />
   </div>

 {/*        <div className={` tab:px-6 py-2 my-12 tab:mx-3`}>
      
        </div> */}
      <HeaderText isAr={isAr} title={myCards} />
      <div className="bg-white dark:bg-[#2e464f] rounded-lg p-4 my-4">

{AddCardComponent}
      </div>
   </div>
      <HeaderText isAr={isAr} title={addCard} />
    </MotionWrapper>
  );
}
