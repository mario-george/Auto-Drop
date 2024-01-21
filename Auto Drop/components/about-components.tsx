"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutComponents({
  about,
  aboutContent,
  pros,
  firstBoxTitle,
  firstBoxContent,
  secondBoxTitle,
  secondBoxContent,
  thirdBoxTitle,
  thirdBoxContent,
  fourthBoxTitle,
  fourthBoxContent,
  fifthBoxTitle,
  fifthBoxContent,
  sixthBoxTitle,
  sixthBoxContent,
  goal,
  goalContent,
  locale,
}: {
  about: string;
  aboutContent: string;
  pros: string;
  firstBoxTitle: string;
  firstBoxContent: string;
  secondBoxTitle: string;
  secondBoxContent: string;
  thirdBoxTitle: string;
  thirdBoxContent: string;
  fourthBoxTitle: string;
  fourthBoxContent: string;
  fifthBoxTitle: string;
  fifthBoxContent: string;
  sixthBoxTitle: string;
  sixthBoxContent: string;
  goal: string;
  goalContent: string;
  locale: string;
}) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.main
      className="lg:w-2/3 w-full mx-auto pb-10"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <motion.div
        className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7"
        variants={fadeUp}
      >
        <h4 className="text-center font-bold">{about}</h4>
        <p className="text-center">{aboutContent}</p>
      </motion.div>
      <h2 className="font-bold text-center mt-12 mb-7 text-lg">{pros}</h2>
      <motion.div
        className="flex gap-5 flex-wrap md:flex-nowrap"
        variants={fadeUp}
      >
        <div className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full">
          <div className="flex justify-center  gap-x-3 relative">
            {locale === "en" && (
              <Image
                src={"/aboutTop.svg"}
                alt="aboutTop"
                width={100}
                height={100}
                className="absolute -top-48 -left-16 w-44 h-44 hidden md:block"
              />
            )}
            <h4 className="text-center font-bold">{secondBoxTitle}</h4>
            <Image
              src={"/secondAboutBox.svg"}
              alt="secondAboutBox"
              width={100}
              height={100}
              className="w-7 h-7"
            />
          </div>
          <p className="text-center">{secondBoxContent}</p>
        </div>
        <div className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full">
          <div className="flex justify-center  gap-x-3 relative">
            {locale === "ar" && (
              <Image
                src={"/aboutTop.svg"}
                alt="aboutTop"
                width={100}
                height={100}
                className="absolute -top-48 -left-16 w-44 h-44 hidden md:block"
              />
            )}
            <h4 className="text-center font-bold">{firstBoxTitle}</h4>
            <Image
              src={"/firstAboutBox.svg"}
              alt="firstAboutBox"
              width={100}
              height={100}
              className="w-7 h-7"
            />
          </div>
          <p className="text-center">{firstBoxContent}</p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeUp}
        className="flex gap-5 flex-wrap md:flex-nowrap mt-5"
      >
        <div className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full">
          <div className="flex justify-center  gap-x-3">
            <h4 className="text-center font-bold">{fourthBoxTitle}</h4>
            <Image
              src={"/fourthAboutBox.svg"}
              alt="fourthAboutBox"
              width={100}
              height={100}
              className="w-7 h-7"
            />
          </div>
          <p className="text-center">{fourthBoxContent}</p>
        </div>
        <div className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full">
          <div className="flex justify-center  gap-x-3">
            <h4 className="text-center font-bold">{thirdBoxTitle}</h4>
            <div className="w-6 h-6 text-white bg-[#303E34] rounded-[50%] flex justify-center items-center text-xs">
              24
            </div>
          </div>
          <p className="text-center">{thirdBoxContent}</p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeUp}
        className="flex gap-5 flex-wrap md:flex-nowrap mt-5"
      >
        <div className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full">
          <div className="flex justify-center  gap-x-3">
            <h4 className="text-center font-bold">{sixthBoxTitle}</h4>
            <Image
              src={"/sixthAboutBox.svg"}
              alt="sixthAboutBox"
              width={100}
              height={100}
              className="w-7 h-7"
            />
          </div>
          <p className="text-center">{sixthBoxContent}</p>
        </div>
        <div className="bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full">
          <div className="flex justify-center  gap-x-3">
            <h4 className="text-center font-bold">{fifthBoxTitle}</h4>
            <div className="w-6 h-6 text-white bg-[#303E34] rounded-[50%] flex justify-center items-center text-xs">
              <Image
                src={"/fifthAboutBox.svg"}
                alt="fifthAboutBox"
                width={100}
                height={100}
                className="w-3 h-3"
              />
            </div>
          </div>
          <p className="text-center">{fifthBoxContent}</p>
        </div>
      </motion.div>
      <h2 className="font-bold text-center mt-12 mb-7 text-lg">{goal}</h2>
      <motion.div
        variants={fadeUp}
        className="relative bg-[#FCFBFB] rounded-xl shadow-lg space-y-7 p-7 md:basis-1/2 basis-full"
      >
        <Image
          src={"/aboutBottom.svg"}
          alt="aboutBottom"
          width={100}
          height={100}
          className="absolute -right-10 bottom-0"
        />
        <p className="text-center w-3/4 mx-auto">{goalContent}</p>
      </motion.div>
    </motion.main>
  );
}
