"use client";
import { iconData } from "@/app/[locale]/(dashboards)/_components/constants/itemData";
import { motion } from "framer-motion";
import NavBarSVG from "@/components/icons/ClientSVGs/NavBarSVG";
import DarkModeLogo from "@/components/icons/ClientSVGs/DarkModeLogo";

import { Link, usePathname } from "@/navigation";
import "@/components/icons/ClientSVGs/strokeOpacityActive.css";
import Image from "next/image";
import LogoutHandler from "./LogoutHandler";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavComponent from "./SideNavList";
import { ModeToggle } from "@/components/theme-providers-button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function SideNavRenderer({
  iconInfo,
  logoutMsg,
  whatsappMsg,
  locale,
}: {
  iconInfo: string[];
  logoutMsg: string;
  whatsappMsg: string;
  locale: string;
}) {
  const { theme } = useTheme();
  useEffect(() => {
    console.log(theme); // 'light' or 'dark'
  }, [theme]);

  const isMediumScreen = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1025px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  let marginDirection = locale === "ar" ? "mr-3" : "ml-3";
  let marginDirection2 = locale === "ar" ? "mr-4" : "ml-3";
  let marginDirection3 = locale === "ar" ? "mr-2" : "ml-1";
  let whatsappTranslate =
    locale === "ar" ? "translate-x-[5px]" : "-translate-x-1";
  const path = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(isSmallScreen ? true : false);

  const [navClass, setNavClass] = useState("");
  const [applyPadding, setApplyPadding] = useState(false);
  let isAr = locale === "ar";
  useEffect(() => {
    if (isSmallScreen) {
      if (!isNavOpen) {
        setNavClass(`fixed z-[33] ${isAr ? `` : ``}`);
        setApplyPadding(true);
      } else {
        // setNavClass("relative");

        setTimeout(() => {
          setApplyPadding(false);
          setNavClass("relative");
        }, 380); // Delay of 100ms
      }
    }
  }, [isNavOpen, isSmallScreen]);

  const dynamicWidth = () => {
    if (isLargeScreen || isMediumScreen) {
      return isNavOpen ? 63 : 250;
    }
    return isNavOpen ? 63 : 250;
  };
  const topVariants = {
    closed: {
      rotate: 45,
      translateY: 30,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    open: {
      rotate: 0,
      translateY: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const middleVariants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2 } },
  };

  const bottomVariants = {
    closed: {
      rotate: -45,
      translateY: -30,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    open: {
      rotate: 0,
      translateY: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <motion.div
        initial={{ x: 0, width: 63 }}
        animate={{ x: 0, width: dynamicWidth() }}
        // whileHover={{ width: 250 }}
        onHoverEnd={() => {}}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`group transition-all duration-200 flex flex-col min-h-full text-[#25343980] text-black bg-white border dark:text-white dark:bg-[#2e464f] overflow-hidden rounded-md ${navClass} `}
      >
        <button className={`${isAr ? `mr-[1.5rem]` : `ml-[1.5rem]`} mt-5`}>
          {" "}
          <motion.svg
            initial="closed"
            animate={isNavOpen ? "open" : "closed"}
            onClick={() => setIsNavOpen(!isNavOpen)}
            viewBox="0 0 100 80"
            width="25"
            height="25"
            className={theme === "dark" ? "text-white fill-white" : ""}
          >
            <motion.rect
              width="100"
              height="10"
              variants={topVariants}
            ></motion.rect>
            <motion.rect
              y="30"
              width="100"
              height="10"
              variants={middleVariants}
            ></motion.rect>
            <motion.rect
              y="60"
              width="100"
              height="10"
              variants={bottomVariants}
            ></motion.rect>
          </motion.svg>
        </button>
        <div
          className={cn(
            "flex items-center justify-between h-16 tab:pl-6 tab:pr-1",
            isAr ? `tab:pl-6 tab:pr-1` : `tab:pl-1 tab:pr-6`
          )}
        >
          <div
            className={`flex justify-between space-s-2 tab:space-s-8${
              isAr ? `mr-[.7rem]` : `ml-[.7rem]`
            }`}
          >
            <div className="flex">
              <div className="relative">
                <div className="absolute z-30 flex justify-between  left-0 right-12 top-0 bottom-0 group-hover:bg-transparent transition-all duration-300" />
                {theme === "dark" ? <DarkModeLogo /> : <NavBarSVG />}
              </div>
            </div>
          </div>
          <div className={`${isNavOpen ? `hidden` : ``}`}>
            <ModeToggle />
          </div>
        </div>

        <nav className="flex flex-col justify-between ">
          {isSmallScreen ? (
            <>
              <ScrollArea className="h-[170vw]">
                <div className="z-[9999999]" dir={isAr ? "rtl" : "ltr"}>
                  <NavComponent
                    iconData={iconData}
                    iconInfo={iconInfo}
                    logoutMsg={logoutMsg}
                    whatsappMsg={whatsappMsg}
                    locale={locale}
                    isNavOpen={isNavOpen}
                  />
                </div>
              </ScrollArea>
            </>
          ) : (
            <>
              <NavComponent
                iconData={iconData}
                iconInfo={iconInfo}
                logoutMsg={logoutMsg}
                whatsappMsg={whatsappMsg}
                locale={locale}
                isNavOpen={isNavOpen}
              />
            </>
          )}
        </nav>
      </motion.div>
      {isAr && (
        <div
          className={`${applyPadding ? ` min-h-full pl-[63px] ` : ``} `}
        ></div>
      )}
      {!isAr && (
        <div
          className={`${applyPadding ? ` min-h-full pr-[63px] ` : ``} `}
        ></div>
      )}
    </>
  );
}
