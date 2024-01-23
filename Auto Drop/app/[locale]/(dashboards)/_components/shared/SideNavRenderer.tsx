"use client";
import {iconData} from "@/app/[locale]/(dashboards)/_components/constants/itemData";
import { motion } from "framer-motion";
import NavBarSVG from "@/components/icons/ClientSVGs/NavBarSVG";
import Link from "next/link";
import "@/components/icons/ClientSVGs/strokeOpacityActive.css";
import LogoutSVG from "@/components/icons/ClientSVGs/LogoutSVG";
export default function SideNavRenderer({iconInfo}) {
  return (
    <motion.div
      initial={{ x: -250, width: 60 }}
      animate={{ x: 0, width: 60 }}
      whileHover={{ width: 250 }}
      onHoverEnd={() => {}}
      transition={{ duration: 0.1 }}
      className="group transition-all duration-300 flex flex-col h-screen text-[#25343980] text-black bg-white w-[1rem] border overflow-hidden"
    >
      <div className="flex items-center justify-center h-16">
        <h1 className="flex space-x-2 mr-[4rem] ">
          <div></div>
          <div className="">
            <div className="relative">
              <div className="absolute z-30 bg-white left-0 right-12 top-0 bottom-0 group-hover:bg-transparent transition-all duration-300" />
              <NavBarSVG />
            </div>
          </div>
        </h1>
      </div>
      <nav className="flex flex-col justify-between ">
        <ul className="flex flex-col mx-2 space-y-2">
          {iconData.map((link, index) => {
            return (
              <motion.li
                className="group icon-path flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md"
                key={index}
              >
                <Link href={link.route} className="flex items-center">
                  <link.icon />
                  <motion.span
                    className="ml-3 whitespace-nowrap"
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
        <div className="flex flex-col mt-24 mx-2 ">
        <motion.li
                className="group icon-path flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md"
              >
                <Link href={"/"} className="flex items-center">
                  <LogoutSVG />
                  <motion.span
                    className="ml-3 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Logout
                  </motion.span>
                </Link>
              </motion.li>
        </div>
      </nav>
    </motion.div>
  );
}
