"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";

export default function FirstSection({
  locale,
  header1,
  header2,
  subHeader,
  subHeader2,
  startButton,
}: {
  locale: string;
  header1: string;
  header2: string;
  subHeader: string;
  subHeader2: string;
  startButton: string;
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white w-[80%] md:w-[60%] mt-16 flex flex-col flex-wrap rounded-lg shadow-lg m-auto p-10 md:p-18 relative"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center text-gray-800 text-lg xl:text-3xl lg:text-2xl font-extrabold mb-3">
        <p className="mb-4">{header1}</p>
        <p>{header2}</p>
      </div>
      <div className="my-5 text-center text-gray-800 md:text-base text-sm opacity-80 font-semibold">
        {subHeader}
      </div>
      <div className="my-2 text-center text-gray-800 md:text-base text-sm opacity-80 font-semibold">
        {subHeader2}
      </div>
      <motion.div
        className="w-[100%] cursor-pointer h-fit px-3 py-4 lg:w-[40%] 
      m-auto mt-14 bg-gray-800 hover:bg-gray-700 rounded-xl shadow"
        variants={buttonVariants}
        whileHover="hover"
      >
        <button className=" pt-1 block m-auto text-center text-white md:text-lg text-base font-bold ">
          <Link href="/login">{startButton}</Link>
        </button>
      </motion.div>
      <Image
        src="/rotatedBox.png"
        alt="rotatedBox"
        width={100}
        height={100}
        className="absolute top-3 left-[-15%] lg:left-[-7%] md:left-[-11%] h-auto "
      />
      <Image
        src="/cart.svg"
        alt="cart"
        width={100}
        height={100}
        className="absolute xl:top-[50%] lg:top-[65%] left-[-18%] xl:w-[370px] xl:h-[370px] lg:w-[300px] lg:h-[300px]
         lg:left-[-16%] md:block hidden z-50 md:w-[250px] md:h-[250px] md:top-[75%] md:left-[-25%]"
      />
      <Image
        src="/rotatedBag.png"
        alt="rotatedBag"
        width={100}
        height={100}
        className="absolute h-auto top-3  right-[-11%]  xl:right-[-7%] lg:right-[-10%] w-20 md:w-24 max-[320px]:hidden"
      />
    </motion.div>
  );
}
