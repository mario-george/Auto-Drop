"use client";
import { iconData } from "@/app/[locale]/(dashboards)/_components/constants/itemData";
import { motion } from "framer-motion";
import NavBarSVG from "@/components/icons/ClientSVGs/NavBarSVG";
import { Link, usePathname } from "@/navigation";
import "@/components/icons/ClientSVGs/strokeOpacityActive.css";
import Image from "next/image";
import LogoutHandler from "./LogoutHandler";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1025px)" });
  let marginDirection = locale === "ar" ? "mr-3" : "ml-3";
  let marginDirection2 = locale === "ar" ? "mr-4" : "ml-3";
  let marginDirection3 = locale === "ar" ? "mr-2" : "ml-1";
  let whatsappTranslate =
    locale === "ar" ? "translate-x-[5px]" : "-translate-x-1";
  const path = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(isSmallScreen ? true : false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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
        className={`group transition-all duration-200 flex flex-col min-h-full text-[#25343980] text-black bg-white border overflow-hidden rounded-md ${navClass} `}
      >
        <button className={`${isAr ? `mr-5` : `ml-5`} mt-5`}>
          {" "}
          <motion.svg
            initial="closed"
            animate={isNavOpen ? "open" : "closed"}
            onClick={() => setIsNavOpen(!isNavOpen)}
            viewBox="0 0 100 80"
            width="25"
            height="25"
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
        <div className="flex items-center justify-center h-16">
          <h1 className={`flex space-x-2 ${isAr ? `mr-[5rem]` : `mr-[4.8rem]`}`}>
            <div className="">
              <div className="relative">
                <div className="absolute z-30  left-0 right-12 top-0 bottom-0 group-hover:bg-transparent transition-all duration-300" />
                <NavBarSVG />
              </div>
            </div>
          </h1>
        </div>

        <nav className="flex flex-col justify-between ">
          <ul className="flex flex-col mx-2 space-y-2 !mb-auto">
            {iconData.map((link, index) => {
              let isActive = link.route == path;
              return (
                <motion.li
                  className={`group icon-path flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-opacity-50  ${
                    isActive
                      ? "bg-[#F0F3F4] !icon-path-active shadow-md !text-opacity-100 icon "
                      : ""
                  } text-[#253439] hover:text-opacity-100 hover:bg-[#f0f3f4] rounded-lg hover:shadow-md`}
                  key={index}
                >
                  <Link href={link.route} className="flex items-center">
                    <link.icon />
                    <motion.span
                      className={`${marginDirection} whitespace-nowrap`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {iconInfo[index]}
                    </motion.span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          <div className="flex flex-col  mx-2 space-y-6  border-t h-full mt-[100%]">
            <LogoutHandler
              logoutMsg={logoutMsg}
              marginDirection={marginDirection2}
            />
            <motion.li
              className={`flex items-center py-2 px-1 ${
                locale == "en" ? "ml-1" : "mr-1"
              } text-[#253439] hover:text-black  rounded-lg hover:shadow-md border border-[#00A859]`}
            >
              <Link href={"/"} className="flex items-center">
                <Image
                  width={42}
                  height={30}
                  src={"/client/whatsapp.svg"}
                  alt="whatsapp"
                  className={`transform ${whatsappTranslate}`}
                />
                <motion.span
                  className={`${marginDirection3} whitespace-nowrap`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {whatsappMsg}
                </motion.span>
              </Link>
            </motion.li>
          </div>
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
