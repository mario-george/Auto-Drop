"use client";

import { motion } from "framer-motion";
export default function MotionWrapperExit({
  children,
  locale,
  mdClasses,
}: {
  children: React.ReactNode;
  locale?: string;
  mdClasses?: string;
}) {
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: {
      opacity: 0,
      x: locale === "ar" ? -50 : 50,
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`${mdClasses && mdClasses}`}
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
