"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress"
import HoverCardWrapper from './HoverCardWrapper'
import React from 'react'
export default function Annually({
  locale,tryForFree,

  PackagePro,
  PackagePlus,
  BasicPackage,
  remainingProducts,
  remainingOrders,
  subscriptionDate,
  subscriptionExpirationDate,

  subscribtion,

  monthly,

  SAR,
  plansTitle,
  productsNumber,
  ordersNumber,
}: {
  locale: string;
  remainingProducts: string;
  remainingOrders: string;
  subscriptionDate: string;
  subscriptionExpirationDate: string;
  PackagePro: string;
  PackagePlus: string;
  BasicPackage: string;
  tryForFree: string;
  
  subscribtion: string;
  monthly: string;
  SAR: string;
  plansTitle:string
productsNumber:string
ordersNumber:string
}) {
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <div
        className="pb-14 flex flex-col container "
        dir={`${locale == "ar" ? "ltr" : "rtl"}`}
      >
        <span>{plansTitle}</span>
        <HoverCard className="min-w-[44.3125rem]">
          <HoverCardTrigger>Hover</HoverCardTrigger>
          <HoverCardContent dir={`${locale == "ar" ? "rtl" : "ltr"}`}
          >
            <div className="flex flex-col min-w-[44.3125rem]">
            {PackagePlus}

              <div className="flex items-center space-x-2">
<span>{remainingProducts}</span>
<Progress dir={`${locale == "ar" ? "rtl" : "ltr"}`}value={33} className="w-[60%]"/>
              </div>
              <div className="flex">
<span>{remainingOrders}</span>
bar
              </div>
              <div className=""></div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className="flex flex-row  mt-16 flex-wrap gap-y-4 max-[662px]:gap-x-0 max-[426px]:gap-4 md:gap-x-0 mx-auto w-full px-0">
          <HoverCardWrapper title={PackagePro} remainingProducts={remainingProducts} remainingOrders={remainingOrders} locale={locale}>
          <div className="relative flex flex-col flex-wrap bg-white rounded-xl shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] py-2 md:py-7 md:pt-11">
            <Image
              src="/client/planStar.svg"
              alt="star"
              width={30}
              height={30}
              className="absolute top-3 left-4 hidden md:block"
            ></Image>
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-3 lg:pt-2 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.9rem] md:px-8">
                {PackagePro}{" "}
              </div>
              <div
                className="flex flex-wrap justify-center px-0 md:px-8"
                dir="ltr"
              >
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                  249.0
                </div>
                <div
                  className={`pt-1 px-1 text-gray-800 ${
                    locale == "ar" ? "text-[10px]" : "text-[12px]"
                  } font-bold`}
                >
                  {SAR}
                </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                  {" "}
                  349.00
                </div>
              </div>
              <div className="h-[70%] lg:h-[75%]">
                <div className="text-center text-gray-800 text-sm md:text-base mt-5 font-bold px-8">
                  {monthly}
                </div>
                <div className="text-center text-gray-950 text-sm md:text-base w-full font-medium px-8 pt-[1rem] md:pt-[2rem]">
                  {" "}
                  {productsNumber} 99999
                </div>
                <div
                  className={`text-center text-gray-950 text-sm md:text-base ${
                    locale == "en" ? "w-[82%]" : "w-[85%]"
                  } mt-3 md:mt-5 font-medium px-6 mx-auto`}
                >
                  {productsNumber} 99999
                </div>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] mt-2 ">
              <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-[#b29e84] rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>

          </div>


          </HoverCardWrapper>
          <div className="relative flex flex-col flex-wrap bg-white rounded-xl shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] py-2 md:py-7 md:pt-11">
            <Image
              src="/client/planStar.svg"
              alt="star"
              width={30}
              height={30}
              className="absolute top-3 left-4 hidden md:block"
            ></Image>
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-3 lg:pt-2 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.9rem] md:px-8">
                {PackagePro}{" "}
              </div>
              <div
                className="flex flex-wrap justify-center px-0 md:px-8"
                dir="ltr"
              >
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                  249.0
                </div>
                <div
                  className={`pt-1 px-1 text-gray-800 ${
                    locale == "ar" ? "text-[10px]" : "text-[12px]"
                  } font-bold`}
                >
                  {SAR}
                </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                  {" "}
                  349.00
                </div>
              </div>
              <div className="h-[70%] lg:h-[75%]">
                <div className="text-center text-gray-800 text-sm md:text-base mt-5 font-bold px-8">
                  {monthly}
                </div>
                <div className="text-center text-gray-950 text-sm md:text-base w-full font-medium px-8 pt-[1rem] md:pt-[2rem]">
                  {" "}
                  {productsNumber} 99999
                </div>
                <div
                  className={`text-center text-gray-950 text-sm md:text-base ${
                    locale == "en" ? "w-[82%]" : "w-[85%]"
                  } mt-3 md:mt-5 font-medium px-6 mx-auto`}
                >
                  {productsNumber} 99999
                </div>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] mt-2 ">
            <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-[#b29e84] rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
        
          </div>

          <div className="relative flex flex-col flex-wrap bg-white rounded-xl shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] py-2 md:py-7 md:pt-11">
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-1 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.62rem] md:px-8">
                {" "}
                {PackagePlus}{" "}
              </div>
              <div
                className="flex flex-wrap justify-center px-0 md:px-8"
                dir="ltr"
              >
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                  249.0
                </div>
                <div
                  className={`pt-1 px-1 text-gray-800 ${
                    locale == "ar" ? "text-[10px]" : "text-[12px]"
                  } font-bold`}
                >
                  {SAR}
                </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                  {" "}
                  349.00
                </div>
              </div>
              <div className="h-[70%] lg:h-[75%]">
                <div className="text-center text-gray-800 text-sm md:text-base mt-5 font-bold px-8">
                  {monthly}
                </div>
                <div className="text-center text-gray-950 text-sm md:text-base w-full font-medium px-8 pt-[1rem] md:pt-[2rem]">
                  {" "}
                  {productsNumber} 99999
                </div>
                <div
                  className={`text-center text-gray-950 text-sm md:text-base ${
                    locale == "en" ? "w-[82%]" : "w-[85%]"
                  } mt-3 md:mt-5 font-medium px-6 mx-auto`}
                >
                  {ordersNumber} 99999
                </div>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] mt-2 md:mt-2 ">
            <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-[#b29e84] rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
          
          </div>

          <div className="relative flex flex-col flex-wrap bg-white rounded-xl shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] py-2 md:py-7 md:pt-11">
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-1 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.62rem] md:px-8">
                {" "}
                {BasicPackage}{" "}
              </div>
              <div className="flex flex-wrap justify-center px-8 mb-10 ">
                <div className=" text-center text-gray-800 text-base font-bold mt-4">
                  {tryForFree}
                </div>
              </div>

              <div className="text-center text-gray-950 text-sm md:text-base font-medium px-8 pt-[0rem] md:pt-[1.5rem]">
                {productsNumber} 1
              </div>
              <div className="text-center text-gray-950 text-sm md:text-base mt-4 md:mt-5 font-medium px-8">
                {productsNumber} 1
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] md:mt-2 mt-2 ">
            <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-[#b29e84] rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
       
          </div>
        </div>
      </div>
    </motion.div>
  );
}
