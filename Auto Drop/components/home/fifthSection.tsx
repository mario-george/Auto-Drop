import { cn } from "@/lib/utils";
import Image from "next/image";

export default function FifthSection({
  locale,
  linkHeader,
  subLink1,
  subLink2,
  linkButton,
  soon,
}: {
  locale: string;
  linkHeader: string;
  subLink1: string;
  subLink2: string;
  linkButton: string;
  soon: string;
}) {
  return (
    <div
      className="w-[100%] overflow-hidden md:mt-24 md:mb-24 mb-16"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div
        className={cn(
          "flex justify-center",
          locale === "ar" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Image
          src="/rightArrow.svg"
          alt="leftArrow"
          className=" lg:w-32 lg:h-32 w-20 h-20 lg:ml-12 lg:-mt-3 ml-4"
          width={100}
          height={100}
        />
        <div className="text-center text-gray-800 text-xl xl:text-3xl lg:text-2xl font-bold">
          {linkHeader}{" "}
        </div>
        <Image
          src="/leftArrow.svg"
          alt="arrow"
          className=" lg:w-32 lg:h-32 w-20 h-20 lg:mr-12 lg:-mt-3 mr-4"
          width={100}
          height={100}
        />
      </div>
      <div
        className={`flex flex-row gap-4 md:gap-0 justify-between flex-nowrap lg:px-0 px-8`}
      >
        <div className="flex flex-col lg:w-[54%] w-1/2 max-[425px]:w-[50%]">
          <div
            className={`text-center text-gray-800 lg:text-3xl md:text-xl text-sm font-bold mb-6 mt-6 lg:mb-10 lg:mt-12 m-auto`}
          >
            {subLink1}{" "}
          </div>
          <div className="grid grid-rows-5 m-auto lg:grid-rows-3 grid-flow-col gap-4">
            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/shopify.svg"
                alt="shopify"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                <div className="flex justify-center">
                  <button className="mr-2 text-neutral-400">{soon}</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/wix.svg"
                alt="wix"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                <div className="flex justify-center">
                  <button className="mr-2 text-neutral-400">{soon}</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/zid.svg"
                alt="zid"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                <div className="flex justify-center">
                  <button className="mr-2 text-neutral-400">{soon}</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/twilio.svg"
                alt="twilio"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                <div className="flex justify-center">
                  <button className="mr-2 text-neutral-400">{soon}</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/salla.svg"
                alt="salla"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-white border border-gray-500 h-fit p-1 rounded-lg">
                <div className="flex justify-center items-center cursor-pointer px-4">
                  <Image
                    width={100}
                    height={100}
                    src="/circleLink.svg"
                    alt="circleLink"
                    className="w-4 h-4"
                  />
                  <button className="text-black">{linkButton}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:pl-[6rem] max-[425px]:w-[50%] w-1/2 lg:w-[46%]">
          <div
            className={`text-center text-gray-800 lg:text-3xl md:text-xl text-sm font-bold mb-6 mt-6 lg:mb-10 lg:mt-12 m-auto`}
          >
            {subLink2}{" "}
          </div>
          <div
            className={`grid grid-rows-3 mx-auto lg:grid-rows-2 grid-flow-col gap-4`}
          >
            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/amazon.svg"
                alt="amazon"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                <div className="flex justify-center">
                  <button className="mr-2 text-neutral-400">{soon}</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/aliexpress.svg"
                alt="aliexpress"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-white border border-gray-500 h-fit p-1 rounded-lg">
                <div className="flex justify-center items-center cursor-pointer px-4">
                  <Image
                    width={100}
                    height={100}
                    src="/circleLink.svg"
                    alt="circleLink"
                    className="w-4 h-4"
                  />
                  <button className=" text-black">{linkButton}</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center max-[425px]:w-auto">
              <Image
                width={100}
                height={100}
                src="/cj.svg"
                alt="cj"
                className="w-36 h-24"
              />
              <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                <div className="flex justify-center">
                  <button className="mr-2 text-neutral-400">{soon}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
