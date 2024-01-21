"use client";

import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

export default function DropMenu({
  classes,
  links,
}: {
  classes?: string;
  links: string[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();
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

  const handleOpenChange = useCallback((open: boolean) => {
    setIsMenuOpen(open);
  }, []);

  return (
    <div className={classes}>
      <DropdownMenu
        dir={locale === "ar" ? "rtl" : "ltr"}
        open={isMenuOpen}
        onOpenChange={handleOpenChange}
      >
        <DropdownMenuTrigger asChild>
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            `w-[14rem] mt-2.5 ${isMenuOpen ? "" : "hidden"}`,
            locale === "ar" ? "-translate-x-8" : "translate-x-8"
          )}
        >
          {navLinks.map((link) => (
            <Link
              href={`${link.href}`}
              className="block w-full"
              key={link.name}
            >
              <DropdownMenuItem>
                <DropdownMenuLabel className="font-normal text-base">
                  {link.name}
                </DropdownMenuLabel>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
