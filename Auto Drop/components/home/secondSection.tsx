"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
};

export default function SecondSection({
  locale,
  how,
  howDetails,
}: {
  locale: string;
  how: string;
  howDetails: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white w-[100%] mt-28 md:mb-24 mb-10 relative"
    >
      <div className="w-[100%] md:w-[95%] flex flex-col py-10 px-10 items-center mx-auto">
        <motion.div
          className="text-gray-800 text-lg xl:text-3xl lg:text-2xl font-bold mb-8 text-center"
          variants={imageVariants}
        >
          {how}
        </motion.div>
        <motion.div
          className="w-[100%] md:w-[65%] m-auto text-center mb-4 text-gray-800 md:text-xl text-base font-medium"
          variants={imageVariants}
        >
          {howDetails}
        </motion.div>
      </div>
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute md:w-52 md:h-52 w-44 h-44 -top-[60%] md:left-[35%] left-1/2 max-[320px]:hidden max-[375px]:left-[44%]"
      >
        <Image
          src="/map.svg"
          alt="map"
          width={100}
          height={100}
          className={cn(
            "w-52 h-52 md:mt-0",
            locale === "ar" ? "mt-2" : "mt-10"
          )}
        />
      </motion.div>
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[-100px] md:right-[26%] lg:right-[23%] lg:left-[70%] md:block hidden"
      >
        <Image
          src="/bag.png"
          alt="bag"
          width={100}
          height={100}
          className="lg:mt-7 xl:mt-0"
        />
      </motion.div>
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[-100px] md:right-[10%] lg:left-[76%] "
      >
        <Image src="/box.png" alt="box" width={150} height={150} />
      </motion.div>
    </motion.div>
  );
}
