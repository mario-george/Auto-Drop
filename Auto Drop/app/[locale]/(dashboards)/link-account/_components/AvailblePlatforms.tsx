import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function AvailablePlatforms({
  soon,
  linkButton,
  Cards,
  className,
  cardClassName,
  soonButtonClasses,
  connectButtonClasses,store
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
  /*   const cards = [
    {
      image: "/salla.svg",
      alt: "salla",
      circleLink: true,
      imageW: 222,
      imageH: 125,
    },
    { image: "/shopify.svg", alt: "shopify", imageW: 240, imageH: 131 },
    { image: "/client/wix.svg", alt: "wix", imageW: 240, imageH: 131 },
    { image: "/client/twilio.svg", alt: "twilio", imageW: 240, imageH: 131 },
  ]; */
  return (
    <>
      <div className={``}>
        <div
          className={`flex flex-wrap  max-w-[90%] w-full tab:space-s-8 space-y-6 tab:space-y-0 flex-col tab:flex-row tab:mx-24 justify-center items-stretch ${className}`}
        >
          {Cards.map((card: any, index: string) => {
            return (
              <div
                key={index}
                className={`bg-white rounded-lg  flex flex-col justify-center items-center flex-1 pt-6 ${cardClassName}`}
              >
                <div className={`${card.circleLink &&store&& `pb-6 mm:pb-10 lap:pt-6`}`}>
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
                    className={` hover:bg-neutral-200  min-w-full !rounded-t-none  bg-neutral-200 cursor-auto !py-[1.2rem] ${soonButtonClasses}`}
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
