"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function ClientHeader({
  lang,
  planTitle,
  planValue,
  locale,
}: {
  lang: string;
  planTitle: string;
  planValue: string;
  locale: string;
}) {
  const image = useSelector((state: RootState) => state.user.image);
  const name = useSelector((state: RootState) => state.user.name);

  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);
  const isAr = locale === "ar";
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
  let splittedButtonsClasses =
    locale === "ar"
      ? "rotate-45 right-0 left-[10%]"
      : "-rotate-45 right-[20%] bottom-0 top-0 left-0";
  return (
    <main
      className={cn(
        "pt-2 left-4 text-xs lg:text-base  tab:mx-3 top-0 z-[30]  max-w-[100%]",
        scrolling ? "opacity-90 transition-opacity duration-300" : "",
        `${isAr ? `ml-3` : `mr-3`}`
      )}
      dir={locale === "ar" ? "ltr" : "rtl"}
    >
      <nav
        className="bg-[#F8F6F4] rounded-md shadow flex flex-row 
      justify-between items-center lg:px-14 px-1 py-2 min-h-[50px]"
      >
        <div className="flex flex-row space-s-3 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src={image} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <Link
            locale={locale === "ar" ? "en" : "ar"}
            href={pathname}
            className="text-sm md:text-[16px] font-medium border-l-2 px-2 py-2"
          >
            {lang}
          </Link>
        </div>
        <div></div>

        {locale == "ar" ? (
          <>
            <div className="relative hidden tab:flex space-s-1 border-4 rounded-md border-[#B29E84]">
              <div
                className=" lap:w-[7rem] tab:w-[6rem] h-6 bg-[#B29E84]"
                style={{ clipPath: "polygon(0 0, 57% 0, 100% 100%, 0% 100%)" }}
              ></div>
              <div
                className="lap:w-[6rem]  tab:w-[5rem] h-6 bg-white"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <div className="absolute text-black right-3 top-[3px] lap:top-[1px]   text-xs tab:text-sm lap:text-md">
                {planTitle}
              </div>
              <div className="absolute text-white top-[3px] text-xs lap:top-[1px]  lap:left-[6px]  tab:text-sm lap:text-md">
                {planValue}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative hidden tab:flex space-s-1 border-4 rounded-md border-[#B29E84]">
              <div
                className="lap:w-[6rem]  tab:w-[5rem] h-6 bg-white"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <div
                className=" lap:w-[7rem] tab:w-[6rem] h-6 bg-[#B29E84]"
                style={{ clipPath: "polygon(0 0, 57% 0, 100% 100%, 0% 100%)" }}
              ></div>
              <div className="absolute text-black right-3 top-[3px] tab:top-[5px]   text-xs  lap:text-md">
                {planTitle}
              </div>
              <div className="absolute text-white top-[3px] text-xs  tab:top-[5px] tab:left-[6px] lap:text-md">
                {planValue}
              </div>
            </div>
          </>
        )}

        {/*      <button className="cursor-default bg-white text-black  ">
            <span className="relative z-30">{planTitle}</span>
          </button>
          <button className="bg-[#B29E84] cursor-default text-white py-[6px] px-2 ms:px-3 mm:px-4 tap:px-11 lap:px-11 ">
            <span className=" relative z-30 text-white mr-4">{planValue}</span>{" "}
          </button> */}

        {/*   <div
            className={`absolute  bottom-0 top-0  bg-white transform ${splittedButtonsClasses}`}
          /> */}
      </nav>
    </main>
  );
}
