"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function AvailablePlatforms({
  soon,
  linkButton,
  Cards,
  className,
  cardClassName,
  soonButtonClasses,
  connectButtonClasses,
  store,
}: {
  soon: string;
  linkButton: string;
  Cards: any;
  className?: string;
  cardClassName?: string;
  soonButtonClasses?: string;
  connectButtonClasses?: string;
  store?: boolean;
}) {
  const authHandler = async (link: string) => {
    const url = process.env.NEXT_PUBLIC_BACK_URL + link;
    const response = await fetch(url, { credentials: "include" });
    console.log(await response.json());
  };
  return (
    <>
      <div className={``}>
        <div
          className={`flex flex-wrap mm:mx-3 ml:px-6 tab:max-w-full max-w-[90%] w-full tab:space-s-8 tab:mx-0 space-y-6 tab:space-y-0 flex-col tab:flex-row justify-center items-stretch ${className}`}
        >
          {Cards.map((card: any, index: string) => {
            return (
              <div
                key={index}
                className={`bg-white rounded-lg  flex flex-col justify-center items-center flex-1 pt-6 ${cardClassName}`}
              >
                <div
                  className={`${
                    card.circleLink &&
                    store &&
                    `pb-6 mm:pb-10 tab:!pb-[0rem] tab:pt-9 lap:pt-11 lapl:my-9 lapl:pb-9 lapl:mb-16 `
                  } ${card.alt == "amazon" ? `tab:pt-4` : ``}  ${
                    store && `lapl:pt-10`
                  } `}
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
                    className={`min-w-full  bg-[#253439] hover:bg-[#253439]  !rounded-t-none ${connectButtonClasses}`}
                    onClick={() => {
                      if (card.authLink) {
                        authHandler(card.authLink);
                      }
                    }}
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
                        {linkButton}
                      </button>
                    </div>
                  </Button>
                ) : (
                  <Button
                    className={` hover:bg-neutral-200  min-w-full !rounded-t-none  bg-neutral-200 cursor-auto !py-[1.2rem]  tab:!py-[1.3rem] ${soonButtonClasses}`}
                  >
                    <div className="flex justify-center items-center cursor-pointer space-s-2">
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
      </div>
    </>
  );
}
