"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";

export default function AvailablePlatforms({
  soon,
  linkButton,
  Cards,
  className,
  cardClassName,
  soonButtonClasses,
  connectButtonClasses,
  store,
  linkButtonConnected,
  locale,
  imageWrapperClasses,
}: {
  soon: string;
  linkButton: string;
  Cards: any;
  className?: string;
  cardClassName?: string;
  soonButtonClasses?: string;
  connectButtonClasses?: string;
  store?: boolean;
  linkButtonConnected?: string;
  locale?: string;
  imageWrapperClasses?: string;
}) {
  const sallaToken = useSelector((state: RootState) => state.user.sallaToken);
  const aliExpressToken = useSelector(
    (state: RootState) => state.user.aliExpressToken
  );
  console.log(sallaToken);
  console.log(aliExpressToken);

  const authHandler = async (link: string) => {
    const url = process.env.NEXT_PUBLIC_BACK_URL + link;
    window.location.href = url;
  };
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };
  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div
          className={`flex flex-wrap mm:mx-3 ml:px-6 tab:max-w-full max-w-[90%] w-full tab:space-s-8 tab:mx-0 space-y-6 tab:space-y-0 flex-col tab:flex-row justify-center items-stretch ${className}`}
        >
          {Cards.map((card: any, index: string) => {
            return (
              <div
                key={index}
                className={`bg-white rounded-lg  flex flex-col justify-center items-center flex-1 pt-6 shadow ${cardClassName}`}
              >
                <div
                  className={`${
                    card.circleLink &&
                    store &&
                    `!mb-12 ms:pb-12 ms:pt-4 tab:!pb-[0rem] tab:pt-9 lap:pt-11 lapl:my-9 lapl:pb-24 lapl:!pt-[25px]  lapl:mb-22  `
                  } ${card.alt == "amazon" ? `tab:pt-4` : ``}    ${
                    store && `lapl:pt-10`
                  } lapl:mb-auto ${imageWrapperClasses} `}
                >
                  <Image
                    width={card.imageW}
                    height={card.imageH}
                    src={card.image}
                    alt={card.alt}
                    className=""
                  />
                </div>
                {card.circleLink ? (
                  <Button
                    className={`min-w-full  bg-[#253439] hover:bg-[#253439]  !rounded-t-none ${connectButtonClasses} ${
                      card.alt == "salla" && sallaToken && `bg-green-700`
                    } ${
                      card.alt == "aliexpress" &&
                      aliExpressToken &&
                      `bg-green-700`
                    }`}
                    onClick={() => {
                      if (card.authLink) {
                        authHandler(card.authLink);
                      }
                    }}
                    // @ts-ignore
                    disabled={
                      (card.alt == "aliexpress" && aliExpressToken) ||
                      (card.alt == "salla" && sallaToken)
                    }
                  >
                    <div className="flex justify-center items-center cursor-pointer space-s-2  ">
                      <Image
                        width={24}
                        height={24}
                        src="/client/circleLink.svg"
                        alt="circleLink"
                        className=""
                      />
                      <button className="text-white text-[20px] font-bold">
                        {(card.alt == "salla" && sallaToken) ||
                        (card.alt == "aliexpress" && aliExpressToken)
                          ? linkButtonConnected
                          : linkButton}
                      </button>
                    </div>
                  </Button>
                ) : (
                  <Button
                    className={` hover:bg-neutral-200  min-w-full !rounded-t-none  bg-neutral-200 cursor-auto !py-[1.2rem]  tab:!py-[1.3rem] ${soonButtonClasses}`}
                  >
                    <div className="flex justify-center items-center space-s-2">
                      <div className=" text-neutral-400 text-[20px]">
                        {soon}
                      </div>
                    </div>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
