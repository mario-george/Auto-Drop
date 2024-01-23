"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import DropMenu from "./ClientDropMenu";
import { cn } from "@/lib/utils";

export default function WebsiteHeader({
  lang,

}: {
  lang: string;

}) {
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);

 

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrolling = scrollPosition > 0;
      setScrolling(isScrolling);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      className={cn(
        "pt-2 left-4 text-xs lg:text-base  sticky top-0 z-[100000] max-w-[80%]",
        scrolling ? "opacity-90 transition-opacity duration-300" : ""
      )}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <nav
        className="bg-[#F8F6F4] rounded-md shadow flex flex-row-reverse 
      justify-between items-center lg:px-14 px-8 py-2 min-h-[50px]"
      >
        <div>
          <Link
            locale={locale === "ar" ? "en" : "ar"}
            href={pathname}
            className=" text-[16px] font-medium"
          >
            {lang}
          </Link>
        </div>
        <div className="flex items-center  ">
        <div className="flex border-4 rounded-md border-[#B29E84] relative overflow-hidden">
  <button className="bg-white text-black py-[6px] px-4   ">
    <span className="relative z-30">

    Part 1
    </span>
  </button>
  <button className="bg-[#B29E84] text-white py-[6px] px-9  ">
  <span className=" relative z-30 text-white mr-4">

Part 2
</span>  </button><div className="absolute left-[30%] bottom-0 top-0 right-0 bg-white transform rotate-45"></div>
</div>


       
        </div>
       
        <Link
          href={"/home"}
          className="w-9 h-9 lg:w-12 lg:h-12 order-2 md:order-3"
        >
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={60}
            height={60}
            className="w-full"
          />
        </Link>
      </nav>
    </main>
  );
}
