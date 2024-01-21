"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function InquirySection({
  classes,
  locale,
  inquiry1,
  inquiry2,
  address,
  addressContent,
  whats,
  mail,
  telegram,
}: {
  classes: string;
  locale: string;
  inquiry1: string;
  inquiry2: string;
  address: string;
  addressContent: string;
  whats: string;
  mail: string;
  telegram: string;
}) {
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn(
        "flex flex-col justify-center items-center gap-y-5",
        classes
      )}
    >
      <h2 className="text-2xl font-semibold w-[100%] text-center mb-10">
        {inquiry1} <br /> {inquiry2}
      </h2>
      <motion.ul
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-y-6"
      >
        <motion.li
          variants={listItemVariants}
          className="flex bg-[#FAF8F7] px-6 py-3 shadow-md rounded-xl gap-x-6"
        >
          <h6>{address}:</h6>
          <p className="text-xs md:text-base">{addressContent}</p>
        </motion.li>
        <motion.li
          variants={listItemVariants}
          className="flex bg-[#FAF8F7] px-6 py-3 shadow-md rounded-xl gap-x-6"
        >
          <h6>{whats}:</h6>
          <Image
            src={"/whatsapp.svg"}
            alt="whatsapp icon"
            width={100}
            height={100}
            className="w-7 h-7"
          />
          <p className="text-xs md:text-base">(303) 555-0105</p>
        </motion.li>
        <motion.li
          variants={listItemVariants}
          className="flex bg-[#FAF8F7] px-6 py-3 shadow-md rounded-xl gap-3 md:gap-x-6"
        >
          <h6>{mail}:</h6>
          <Image
            src={"/email.svg"}
            alt="email icon"
            width={100}
            height={100}
            className="w-7 h-7"
          />
          <p className="text-xs md:text-base">michelle@example.com</p>
        </motion.li>
        <motion.li
          variants={listItemVariants}
          className="flex bg-[#FAF8F7] px-6 py-3 shadow-md rounded-xl gap-x-6"
        >
          <h6>{telegram}:</h6>
          <Image
            src={"/telegram.svg"}
            alt="email icon"
            width={100}
            height={100}
            className="w-6 h-6"
          />
          <p className="text-xs md:text-base">@example.com</p>
        </motion.li>
      </motion.ul>
    </motion.section>
  );
}
