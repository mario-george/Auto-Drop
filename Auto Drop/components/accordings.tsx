"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const MotionAccordionItem = motion(AccordionItem);

export default function Accordings({
  firstAccordingTitle,
  firstAccordingContent,
  secondAccordingTitle,
  secondAccordingContent,
  thirdAccordingTitle,
  thirdAccordingContent,
  fourthAccordingTitle,
  fourthAccordingContent,
  locale,
}: {
  firstAccordingTitle: string;
  firstAccordingContent: string;
  secondAccordingTitle: string;
  secondAccordingContent: string;
  thirdAccordingTitle: string;
  thirdAccordingContent: string;
  fourthAccordingTitle: string;
  fourthAccordingContent: string;
  locale: string;
}) {
  const controls = useAnimation();

  useEffect(() => {
    const animateAccordionItems = () => {
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
    };
    animateAccordionItems();
  }, [controls]);

  return (
    <Accordion
      type="single"
      collapsible
      className="lg:w-2/3 mx-auto space-y-8 w-full"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <MotionAccordionItem
        value="item-1"
        initial={{ opacity: 0, x: -100 }}
        animate={controls}
        className="bg-[#FCFBFA] rounded-lg text-center relative py-10 md:py-10 shadow-md"
      >
        <Image
          src={"/firstAccording.svg"}
          alt="firstAccording"
          width={100}
          height={100}
          className="absolute left-0 md:w-32 md:h-32 w-[4.5rem] h-20 bottom-1"
        />
        <AccordionTrigger className="text-center font-bold flex-col gap-y-3 hover:no-underline text-sm lg:text-base">
          {firstAccordingTitle}
        </AccordionTrigger>
        <AccordionContent className="text-center w-2/3 mx-auto mb-10 text-xs md:text-base">
          {firstAccordingContent}
        </AccordionContent>
      </MotionAccordionItem>
      <MotionAccordionItem
        value="item-2"
        initial={{ opacity: 0, x: 100 }}
        animate={controls}
        className="bg-[#FCFBFA] rounded-lg text-center relative py-10 shadow-md"
      >
        <Image
          src={"/secondAccording.svg"}
          alt="firstAccording"
          width={100}
          height={100}
          className="absolute right-2 md:w-28 md:h-28 w-[2.8rem] h-16  bottom-1"
        />
        <AccordionTrigger className="text-center font-bold flex-col gap-y-3 hover:no-underline text-sm lg:text-base">
          {secondAccordingTitle}
        </AccordionTrigger>
        <AccordionContent className="text-center w-2/3 mx-auto text-xs md:text-base">
          {secondAccordingContent}
        </AccordionContent>
      </MotionAccordionItem>
      <MotionAccordionItem
        value="item-3"
        initial={{ opacity: 0, x: -100 }}
        animate={controls}
        className="bg-[#FCFBFA] rounded-lg text-center relative py-10 shadow-md"
      >
        <Image
          src={"/thirdAccording.svg"}
          alt="firstAccording"
          width={100}
          height={100}
          className="absolute left-4 md:w-28 md:h-28 w-[3.5rem] h-16 bottom-1"
        />
        <AccordionTrigger className="text-center font-bold flex-col gap-y-3 hover:no-underline text-sm lg:text-base">
          {thirdAccordingTitle}
        </AccordionTrigger>
        <AccordionContent className="text-center w-2/3 mx-auto text-xs md:text-base">
          {thirdAccordingContent}
        </AccordionContent>
      </MotionAccordionItem>
      <MotionAccordionItem
        value="item-4"
        initial={{ opacity: 0, x: 100 }}
        animate={controls}
        className="bg-[#FCFBFA] rounded-lg text-center relative py-10 shadow-md"
      >
        <Image
          src={"/fourthAccording.svg"}
          alt="firstAccording"
          width={100}
          height={100}
          className="absolute right-2 md:w-28 md:h-28 w-[3.5rem] h-16 bottom-1"
        />
        <AccordionTrigger className="text-center font-bold flex-col gap-y-3 hover:no-underline text-sm lg:text-base">
          {fourthAccordingTitle}
        </AccordionTrigger>
        <AccordionContent className="text-center w-2/3 mx-auto text-xs md:text-base">
          {fourthAccordingContent}
        </AccordionContent>
      </MotionAccordionItem>
    </Accordion>
  );
}
