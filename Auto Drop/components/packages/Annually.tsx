"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Annually({
  locale,
  packages,
  priceHeader,
  example3,
  monthlyHeader,
  annual,
  free,
  PackagePro,
  PackagePlus,
  BasicPackage,
  Difference,
  Products,
  Orders,
  subscribtion,
  allowed,
  annually,
  note,
  SAR,
}: {
  locale: string;
  packages: string;
  priceHeader: string;
  example3: string;
  monthlyHeader: string;
  annual: string;
  PackagePro: string;
  PackagePlus: string;
  BasicPackage: string;
  Difference: string;
  free: string;
  Products: string;
  Orders: string;
  subscribtion: string;
  allowed: string;
  annually: string;
  note: string;
  SAR: string;
}) {
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <div
        className="pb-14 flex flex-col container"
        dir={`${locale == "ar" ? "ltr" : "rtl"}`}
      >
        <div className="flex flex-col ">
          <div className="bg-white shadow-xl  w-[100%] md:w-[50%] lg:w-[30%] m-auto flex flex-col rounded-lg p-4 ">
            <h1 className="text-gray-800 text-2xl font-bold text-center ">
              {packages}
            </h1>
            <div className="h-1 bg-[#B29E84] w-[30%] mx-auto rounded-lg my-4"></div>
            <div className="text-center text-black text-lg font-medium">
              {priceHeader}
            </div>
            <div className="flex flex-row-reverse mt-6 flex-wrap justify-around">
              <div className="flex flex-col cursor-pointer">
                <div className="text-gray-800 hover:text-gray-950 text-opacity-60 text-lg font-semibold">
                  <Link href={"/packages/monthly"}> {monthlyHeader}</Link>
                </div>
              </div>
              <div className="flex flex-col cursor-pointer">
                <div className="text-gray-800 text-lg font-semibold">
                  <Link href={"/packages/yearly"}> {annual}</Link>
                  <div className="h-1 bg-[#B29E84] w-[90%] mx-auto rounded-lg my-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row max-[426px]:mt-10 mt-16 flex-wrap gap-y-4 max-[662px]:gap-x-0 max-[426px]:gap-4 md:gap-x-0 mx-auto w-full px-0">
          <div className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] pt-1 md:pt-7">
            <Image
              src="/Star.svg"
              alt="star"
              width={30}
              height={30}
              className="absolute top-3 left-4 hidden md:block"
            ></Image>
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-3 lg:pt-2 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.9rem] md:px-8">
                {PackagePro}{" "}
              </div>
              <div className="flex flex-wrap justify-center px-0 md:px-8" dir= "ltr" >
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                  249.0
                </div>
                <div
                  className={`pt-1 px-1 text-gray-800 ${
                    locale == "ar" ? "text-[10px]" : "text-[12px]"
                  } font-bold`}
                >
                  {SAR}
                </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                  {" "}
                  349.00
                </div>
              </div>
              <div className="h-[70%] lg:h-[75%]">
                <div className="text-center text-gray-800 text-sm md:text-base mt-5 font-bold px-8">
                  {annually}
                </div>
                <div className="text-center text-gray-950 text-sm md:text-base w-full font-medium px-8 pt-[1rem] md:pt-[2rem]">
                  {" "}
                  {Products} 99999
                </div>
                <div className={`text-center text-gray-950 text-sm md:text-base ${locale == "en"?"w-[82%]":"w-[85%]"} mt-3 md:mt-5 font-medium px-6 mx-auto`}>
                  {Orders} 99999
                </div>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] mt-2 ">
              <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800 hover:to-gray-600 hover:via-gray-700  rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
            <div className="my-11 text-center text-black text-basetext-sm md:text-base font-bold hidden lg:block">
              99999
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="right sign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="right sign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="right sign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
          </div>

          <div className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] pt-1 md:pt-7">
            <Image
              src="/Star.svg"
              alt="star"
              width={30}
              height={30}
              className="absolute top-3 left-4 hidden md:block"
            ></Image>
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-3 lg:pt-2 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.9rem] md:px-8">
                {PackagePro}{" "}
              </div>
              <div className="flex flex-wrap justify-center px-0 md:px-8" dir= "ltr" >
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                  249.0
                </div>
                <div
                  className={`pt-1 px-1 text-gray-800 ${
                    locale == "ar" ? "text-[10px]" : "text-[12px]"
                  } font-bold`}
                >
                  {SAR}
                </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                  {" "}
                  349.00
                </div>
              </div>
              <div className="h-[70%] lg:h-[75%]">
                <div className="text-center text-gray-800 text-sm md:text-base mt-5 font-bold px-8">
                  {annually}
                </div>
                <div className="text-center text-gray-950 text-sm md:text-base w-full font-medium px-8 pt-[1rem] md:pt-[2rem]">
                  {" "}
                  {Products} 99999
                </div>
                <div className={`text-center text-gray-950 text-sm md:text-base ${locale == "en"?"w-[82%]":"w-[85%]"} mt-3 md:mt-5 font-medium px-6 mx-auto`}>
                  {Orders} 99999
                </div>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] mt-2 ">
              <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800 hover:to-gray-600 hover:via-gray-700  rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
            <div className="my-11 text-center text-black text-basetext-sm md:text-base font-bold hidden lg:block">
              99999
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="right sign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="right sign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="right sign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
          </div>

          <div className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] pt-1 md:pt-7">
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-1 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.62rem] md:px-8">
                {" "}
                {PackagePlus}{" "}
              </div>
              <div className="flex flex-wrap justify-center px-0 md:px-8" dir= "ltr" >
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                  249.0
                </div>
                <div
                  className={`pt-1 px-1 text-gray-800 ${
                    locale == "ar" ? "text-[10px]" : "text-[12px]"
                  }
                  font-bold`}
                >
                  {SAR}
                </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                  {" "}
                  349.00
                </div>
              </div>
              <div className="h-[70%] lg:h-[75%]">
                <div className="text-center text-gray-800 text-sm md:text-base mt-5 font-bold px-8">
                  {annually}
                </div>
                <div className="text-center text-gray-950 text-sm md:text-base w-full font-medium px-8 pt-[1rem] md:pt-[2rem]">
                  {" "}
                  {Products} 99999
                </div>
                <div className={`text-center text-gray-950 text-sm md:text-base ${locale == "en"?"w-[82%]":"w-[85%]"} mt-3 md:mt-5 font-medium px-6 mx-auto`}>
                  {Orders} 99999
                </div>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] mt-3 md:mt-2 ">
              <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800 hover:to-gray-600 hover:via-gray-700  rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
            <div className="my-11 text-center text-black text-sm md:text-base font-bold hidden lg:block">
              99999
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="rightSign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="rightSign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="Xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="Xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
          </div>

          <div className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] pt-1 md:pt-7">
            <div className={`max-[350px]:h-48  h-60`}>
              <div className="text-center text-gray-800 pt-1 md:pt-0 text-base md:text-lg font-bold mb-5 px-[.62rem] md:px-8">
                {" "}
                {BasicPackage}{" "}
              </div>
              <div className="flex flex-wrap justify-center px-8 mb-10 ">
                <div className=" text-center text-gray-800 text-base font-bold mt-4">
                  {free}
                </div>
              </div>

              <div className="text-center text-gray-950 text-sm md:text-base font-medium px-8 pt-[0rem] md:pt-[1.5rem]">
                {Products} 1
              </div>
              <div className="text-center text-gray-950 text-sm md:text-base mt-4 md:mt-5 font-medium px-8">
                {Orders} 1
              </div>
            </div>
            <div className="mb-5 lg:mb-0 cursor-pointer w-[100%] md:mt-2 mt-3 ">
              <p className="mx-auto w-[80%] pt-2 md:pt-3 md:w-[90%] h-[38px] md:h-[52px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800 hover:to-gray-600 hover:via-gray-700  rounded-xl shadow text-center text-white text-sm md:text-base font-bold">
                {subscribtion}
              </p>
            </div>
            <div className="my-11 text-center text-black text-base font-bold hidden lg:block">
              1
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/rightSign.svg"
                alt="rightSign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="Xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="Xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
            <div className="h-48 lg:flex hidden flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <Image
                src="/Xsign.svg"
                alt="Xsign"
                width={100}
                height={100}
                className="my-auto h-[40px] w-[100%]"
              />
            </div>
          </div>

          <div className="relative flex-col flex-wrap bg-white rounded-lg shadow-lg pt-2 m-auto w-[50%] lg:w-[17%] hidden lg:flex ">
            <div className=" max-h-60 h-60 my-auto ">
              <div className="text-center h-[100%] text-gray-800 text-lg font-bold">
                <p style={{ boxSizing: "border-box", marginTop: "75%" }}>
                  {Difference}
                </p>
              </div>
            </div>
            <div className=" container h-48 pt-20 lg:pt-[7.5rem] text-center text-black text-sm font-bold w-full">
              {allowed}
            </div>
            <div className="h-48 flex flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <div className="text-center text-gray-800 text-sm font-bold my-auto px-1">
                {example3}
              </div>
            </div>
            <div className="h-48 flex flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <div className="text-center text-gray-800 text-sm font-bold my-auto px-1">
                {example3}
              </div>
            </div>
            <div className="h-48 flex flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <div className="text-center text-gray-800 text-sm font-bold my-auto px-1">
                {example3}
              </div>
            </div>
            <div className="h-48 flex flex-col items-center">
              <div className="h-1 bg-[#DDD5C9] w-full mx-auto rounded-lg my-4"></div>
              <div className="text-center text-gray-800 text-sm font-bold my-auto px-1">
                {example3}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-6 bg-white mx-autocontainer rounded-lg shadow-lg mt-6 ${
            locale == "ar" ? "text-right" : "text-left"
          } flex flex-col flex-wrap`}
        >
          <span className=" text-red-700 text-base font-bold">{note}</span>
          <span className=" text-sm md:text-base font-medium mt-2 w-full">
            {example3} {example3} {example3} {example3} {example3} {example3}{" "}
            {example3} {example3} {example3}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
