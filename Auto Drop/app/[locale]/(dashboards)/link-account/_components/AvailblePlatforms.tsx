import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function AvailablePlatforms({
  soon,
  linkButton,
}: {
  soon: string;
  linkButton: string;
}) {
  const cards = [
    { image: "/salla.svg", alt: "salla", circleLink: true },
    { image: "/shopify.svg", alt: "shopify" },
    { image: "/wix.svg", alt: "wix" },
    { image: "/twilio.svg", alt: "twilio" },
  ];
  return (
    <>
      <div
        className={`flex flex-row !flex-1 gap-4 md:gap-0 justify-between lg:px-0 px-8 !mx-16  min-w-full`}
      >
        <div className="flex w-full">
          <div className="flex flex-wrap flex-1 w-full gap-8 mx-24">
            {cards.map((card) => {
              return (
                <div className="bg-white rounded-lg  flex flex-col justify-center items-center flex-1 py-6">
                  <Image
                    width={100}
                    height={100}
                    src={card.image}
                    alt={card.alt}
                    className="w-36 h-24"
                  />
                  {card.circleLink ? (
                    <Button className="w-[100%]  border border-gray-500 bg-[#253439] flex-1 p-1 rounded-lg">
                      <div className="flex justify-center items-center cursor-pointer px-4 space-s-2 ">
                        <Image
                          width={100}
                          height={100}
                          src="/circleLink.svg"
                          alt="circleLink"
                          className="w-4 h-4 text-white bg-white"
                        />
                        <button className="text-white">{linkButton}</button>
                      </div>
                    </Button>
                  ) : (
                    <div className="w-[100%] bg-neutral-200 h-fit p-1 rounded-lg">
                      <div className="flex justify-center">
                        <button className="mr-2 text-neutral-400">
                          {soon}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
