"use client";

import { store } from "@/store";
import { userActions } from "@/store/user-slice";
import { motion } from "framer-motion";
import LogoutSVG from "@/components/icons/ClientSVGs/LogoutSVG";

export default function LogoutHandler({logoutMsg,marginDirection}:{logoutMsg:string,marginDirection:string}) {
  // dir={locale === "ar" ? "rtl" : "ltr"}
  return (
    <>
      <div className="">
      
        <motion.li className="cursor-pointer group icon-path flex items-center py-2  px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md"
          onClick={() => store.dispatch(userActions.logout())}
          >
            <div className="flex items-center">
              <LogoutSVG />
              <motion.span
                className={`${marginDirection} whitespace-nowrap`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {logoutMsg}
              </motion.span>
            </div>
          </motion.li>

      </div>
    </>
  );
}
