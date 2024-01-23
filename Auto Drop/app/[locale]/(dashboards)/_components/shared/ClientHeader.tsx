"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";

export default function WebsiteHeader({
  lang,
  planTitle,
  planValue,locale
}: {
  lang: string;
  planTitle: string;
  planValue: string;
  locale: string;
  
}) {
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
let splittedButtonsClasses=locale === "ar"? "rotate-45 right-0 left-[10%]": "-rotate-45 right-[20%] bottom-0 top-0 left-0"
  return (
    <main
      className={cn(
        "pt-2 left-4 text-xs lg:text-base   top-0 z-[100000]  max-w-[100%] flex-1",
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

        <div className="flex items-center border-4 rounded-md border-[#B29E84] relative overflow-hidden">
          <button className="bg-white text-black py-[6px] px-4   ">
            <span className="relative z-30">{planTitle}</span>
          </button>
          <button className="bg-[#B29E84] text-white py-[6px] px-11  ">
            <span className=" relative z-30 text-white mr-4">{planValue}</span>{" "}
          </button>
          <div className={`absolute  bottom-0 top-0  bg-white transform ${splittedButtonsClasses}`}/>
        </div>

      </nav>
    </main>
  );
}
