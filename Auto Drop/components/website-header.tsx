"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import DropMenu from "./dropdown-menu";
import { cn } from "@/lib/utils";

export default function WebsiteHeader({
  lang,
  login,
  links,
}: {
  lang: string;
  login: string;
  links: string[];
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);

  const navLinks = [
    {
      name: links[0],
      href: "/home",
    },
    {
      name: links[1],
      href: "/about",
    },
    {
      name: links[2],
      href: "/packages/monthly",
    },
    {
      name: links[3],
      href: "/faq",
    },
    {
      name: links[4],
      href: "/contact-us",
    },
  ];

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
        "pt-8 container text-xs lg:text-base mb-14 sticky top-0 z-[100000]",
        scrolling ? "opacity-90 transition-opacity duration-300" : ""
      )}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <nav
        className="bg-[#F8F6F4] rounded-xl shadow-md flex flex-row-reverse 
      justify-between items-center lg:px-14 px-8 py-2 min-h-[50px]"
      >
        <div>
          <Link
            locale={locale === "ar" ? "en" : "ar"}
            href={pathname}
            className="links"
          >
            {lang}
          </Link>
        </div>
        <div className="flex items-center gap-x-1">
          <Link
            href={`/login`}
            className={cn(
              "links",
              `${pathname}` === `/login` ? "before:block" : ""
            )}
          >
            {login}
          </Link>
          <Image
            src={"/login.svg"}
            alt="login logo"
            width={24}
            height={24}
            className="w-4 lg:w-5"
          />
        </div>
        <ul className="hidden md:flex items-center gap-x-4 lg:gap-6 basis-1/2 justify-center ">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={cn(
                "links",
                `${pathname}` === `${link.href}` ||
                  `${pathname}` === `${link.href}/monthly` ||
                  `${pathname}` === `${link.href}/yearly`
                  ? "before:block "
                  : ""
              )}
            >
              <Link href={`${link.href}`}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <DropMenu links={links} classes="md:hidden block order-3 md:order-2" />
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
