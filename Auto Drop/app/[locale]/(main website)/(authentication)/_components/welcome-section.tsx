"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const WelcomeSection = ({
  text,
  classes,
  locale,
}: {
  text: string;
  classes?: string;
  locale: string;
}) => {
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn(
        "flex flex-col justify-center items-center gap-y-3",
        classes
      )}
    >
      <motion.div>
        <Image src={"/welcome.svg"} alt="welcome" height={100} width={100} />
      </motion.div>
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={variants}
        className="sm:text-3xl text-lg font-bold text-[#253439] mb-7"
      >
        {text}
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="md:w-72 md:h-72 w-48 h-48"
      >
        <Image
          src={"/store.svg"}
          alt="store"
          width={100}
          height={100}
          className="w-full"
        />
      </motion.div>
    </motion.section>
  );
};

export default WelcomeSection;
