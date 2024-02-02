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
        <ul className="flex flex-col mx-2 space-y-2 ">
          {iconData.map((link: any, index: any) => {
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
        <div className="flex flex-col mx-2 space-y-6  border-t  mt-16">
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
      </div>
    </>
  );
}
