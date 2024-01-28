"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import HoverCardWrapper from "./HoverCardWrapper";
import React from "react";
export default function Monthly({
  locale,
  tryForFree,

  PackagePro,
  PackagePlus,
  BasicPackage,
  remainingProducts,
  remainingOrders,
  subscriptionDate,
  subscriptionExpirationDate,

  subscribtion,
  free,
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
  free: string;
  subscribtion: string;
  monthly: string;
  SAR: string;
  plansTitle: string;
  productsNumber: string;
  ordersNumber: string;
}) {
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <div
        className=" flex flex-col container "
        dir={`${locale == "ar" ? "ltr" : "rtl"}`}
      >
        <span
          dir={`${locale == "ar" ? "rtl" : "ltr"}`}
          className="text-md py-2 lap:text-3xl  mb-5 mt-3"
        >
          {plansTitle}
        </span>

        <div className="flex flex-row lap:mt-16 flex-wrap gap-y-4 max-[662px]:gap-x-0 max-[426px]:gap-4 !tab:gap-x-0 tab:px- md:gap-x-0 mx-auto w-full px-0">
          <HoverCardWrapper
            title={PackagePro}
            remainingProducts={remainingProducts}
            remainingOrders={remainingOrders}
            locale={locale}
            subscriptionDate={subscriptionDate}
            subscriptionExpirationDate={subscriptionExpirationDate}
          >
            <div>
              <Image
                src="/client/planStar.svg"
                alt="star"
                width={30}
                height={30}
                className="absolute top-3 left-4 hidden md:block"
              ></Image>
              <div className={`max-[350px]:h-48  h-60`}>
                <div className="packageTitle">{PackagePro} </div>
                <div
                  className="flex flex-wrap justify-center px-0 md:px-8   "
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
                <div className="h-[70%] lg:h-[75%]  ">
                  <div className="monthly">{monthly}</div>
                  <div className="productsInfoWrapper">
                    {" "}
                    <div className="whitespace-nowrap">{productsNumber}</div>
                    <div className="whitespace-nowrap">99999</div>
                  </div>
                  <div
                    className={`ordersInfoWrapper ${
                      locale == "en" ? "w-[82%]" : "w-[85%]"
                    } `}
                  >
                    <div className="whitespace-nowrap">{ordersNumber}</div>
                    <div className="whitespace-nowrap">99999</div>
                  </div>
                </div>
              </div>
              <div className="subscriptionButton ">
                <p className="package ">{subscribtion}</p>
              </div>
            </div>
          </HoverCardWrapper>

          <HoverCardWrapper
            subscriptionDate={subscriptionDate}
            subscriptionExpirationDate={subscriptionExpirationDate}
            title={PackagePro}
            remainingProducts={remainingProducts}
            remainingOrders={remainingOrders}
            locale={locale}
          >
            <div>
              <Image
                src="/client/planStar.svg"
                alt="star"
                width={30}
                height={30}
                className="absolute top-3 left-4 hidden md:block"
              ></Image>
              <div className={`max-[350px]:h-48  h-60`}>
                <div className="packageTitle">{PackagePro} </div>
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
                  <div className="monthly">{monthly}</div>
                  <div className="productsInfoWrapper">
                    {" "}
                    <div className="whitespace-nowrap">{productsNumber}</div>
                    <div className="whitespace-nowrap">99999</div>
                  </div>
                  <div
                    className={`ordersInfoWrapper ${
                      locale == "en" ? "w-[82%]" : "w-[85%]"
                    } `}
                  >
                    <div className="whitespace-nowrap">{ordersNumber}</div>
                    <div className="whitespace-nowrap">99999</div>
                  </div>
                </div>
              </div>
              <div className="subscriptionButton">
                <p className="package">{subscribtion}</p>
              </div>
            </div>
          </HoverCardWrapper>

          <HoverCardWrapper
            title={PackagePlus}
            remainingProducts={remainingProducts}
            remainingOrders={remainingOrders}
            locale={locale}
            subscriptionDate={subscriptionDate}
            subscriptionExpirationDate={subscriptionExpirationDate}
          >
            <div>
              <div className={`max-[350px]:h-48  h-60`}>
                <div className="packageTitle"> {PackagePlus} </div>
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
                  <div className="monthly">{monthly}</div>
                  <div className="productsInfoWrapper">
                    {" "}
                    <div className="whitespace-nowrap">{productsNumber}</div>
                    <div className="whitespace-nowrap">99999</div>{" "}
                  </div>
                  <div
                    className={`ordersInfoWrapper ${
                      locale == "en" ? "w-[82%]" : "w-[85%]"
                    } `}
                  >
                    <div className="whitespace-nowrap">{ordersNumber}</div>
                    <div className="whitespace-nowrap">99999</div>
                  </div>
                </div>
              </div>
              <div className="subscriptionButton ">
                <p className="package">{subscribtion}</p>
              </div>
            </div>
          </HoverCardWrapper>

          <HoverCardWrapper
            title={BasicPackage}
            remainingProducts={remainingProducts}
            remainingOrders={remainingOrders}
            locale={locale}
            subscriptionDate={subscriptionDate}
            subscriptionExpirationDate={subscriptionExpirationDate}
          >
            <div>
              <div className={`max-[350px]:h-48  h-60`}>
                <div className="text-center text-gray-800 pt-1 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.62rem] md:px-8">
                  {" "}
                  {BasicPackage}{" "}
                </div>
                <div className="flex flex-wrap justify-center px-8 my-9  ">
                  <div
                    className={`${
                      locale == "ar" ? `lap:!mt-[26px]` : ``
                    } text-center text-gray-800 text-base font-bold tab:mt-6 lap:mt-0`}
                  >
                    {free}
                  </div>
                </div>

                <div className="flex flex-col text-center text-gray-950 text-sm md:text-base font-medium px-8 mb-3 whitespace-nowrap   ">
                  {productsNumber}

                  <div>1</div>
                </div>
                <div className="ordersInfoWrapper">
                  <div className="whitespace-nowrap">{ordersNumber}</div>
                  <div className="whitespace-nowrap">1</div>
                </div>
              </div>
              <div className="subscriptionButton ">
                <p className="package">{tryForFree}</p>
              </div>
            </div>
          </HoverCardWrapper>
        </div>
      </div>
    </motion.div>
  );
}
