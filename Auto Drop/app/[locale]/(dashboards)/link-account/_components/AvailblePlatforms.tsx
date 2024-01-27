import Image from "next/image";
export default function AvailablePlatforms({
  soon,
  linkButton,
}: {
  soon: string;
  linkButton: string;
}) {
  return (
    <>
      <div
        className={`flex flex-row !flex-1 gap-4 md:gap-0 justify-between lg:px-0 px-8 !mx-16  min-w-full`}
      >
        <div className="flex w-full">
          <div className="flex flex-wrap flex-1 w-full gap-4 mx-24">
            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center flex-1">
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

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center flex-1 ">
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

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center flex-1 ">
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

            <div className="bg-white rounded-lg shadow-lg px-10 max-[425px]:px-5 pb-4 flex flex-col justify-center items-center flex-1">
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
      </div>
    </>
  );
}
