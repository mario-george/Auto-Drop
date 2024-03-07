import React from "react";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/navigation";
import Image from "next/image";
import LogoutHandler from "./LogoutHandler";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NavComponent({
  iconData,
  iconInfo,
  logoutMsg,
  whatsappMsg,
  locale,
  isNavOpen,
}: any) {
  const path = usePathname();
  let marginDirection = locale === "ar" ? "mr-3" : "ml-3";
  let marginDirection2 = locale === "ar" ? "mr-4" : "ml-3";
  let marginDirection3 = locale === "ar" ? "mr-2" : "ml-1";
  let whatsappTranslate =
    locale === "ar" ? "translate-x-[5px]" : "-translate-x-1";

  return (
    <>
      <div className="h-full">
        <ul className="flex flex-col mx-2 space-y-2 overflow-hidden">
          {iconData.map((link: any, index: any) => {
            let isActive = link.route == path;
            return (
              <motion.li
                className={`group icon-path flex items-center py-2 px-1 hover:bg-[#F0F3F400] text-opacity-50 dark:text-white dark:hover:text-[#253439]   ${
                  isActive
                    ? "bg-[#F0F3F4]   !icon-path-active dark:icon-path-active-dark shadow-md !text-opacity-100 icon "
                    : ""
                } text-[#253439] hover:text-opacity-100 hover:bg-[#f0f3f4] rounded-lg ${
                  !isNavOpen && `${locale == "ar" && `!mr-0`}`
                }  hover:shadow-md ${
                  !isNavOpen &&
                  `!pr- ${locale == "ar" ? `mr-24` : `ml-3`} ${
                    isActive ? `dark:!text-[#2e464f] ` : ``
                  }`
                }`}
                key={index}
              >
                <Link
                  href={link.route}
                  className={`flex items-center transition-all duration-100 ${locale=="ar" && `mr-4 tab:mr-0`} `}
                >
                  <link.icon />
                  {!isNavOpen && (
                    <motion.span
                      className={`${marginDirection} whitespace-nowrap`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {iconInfo[index]}
                    </motion.span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <div
          className={`flex flex-col mx-2 space-y-6  border-t  mt-16 transition-all duration-100 overflow-hidden `}
        >
          <LogoutHandler
            isNavOpen={isNavOpen}
            logoutMsg={logoutMsg}
            marginDirection={marginDirection2}
            locale={locale}
          />
          <motion.li
            className={`flex transition-all dark:text-[#253439] duration-100 items-center py-2 px-1  dark:bg-white ${
              !isNavOpen && `${locale == "ar" && `!mr-0`}`
            } ${locale == "en" ? "ml-1" : "mr-1"} ${
              isNavOpen && ` mr-`
            } text-[#253439] hover:text-black  rounded-lg hover:shadow-md border border-[#00A859] w--fit ${
              isNavOpen && false && ``
            } 
              
            `}
          >
            <Link href={"/"} className="flex items-center">
              <Image
                width={42}
                height={30}
                src={"/client/whatsapp.svg"}
                alt="whatsapp"
                className={`transform ${whatsappTranslate} `}
              />
              {!isNavOpen && (
                <motion.span
                  className={`${marginDirection3} whitespace-nowrap`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {whatsappMsg}
                </motion.span>
              )}
            </Link>
          </motion.li>
        </div>
      </div>
    </>
  );
}
