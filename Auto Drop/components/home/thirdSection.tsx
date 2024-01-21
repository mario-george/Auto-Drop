import Image from "next/image";

export default function ThirdSection({
  featuresHeader,
  firstFeature,
  firstDetails,
  secondFeature,
  secondDetails,
  thirdFeature,
  thirdDetails,
  fourthFeature,
  fourthDetails,
  locale,
}: {
  featuresHeader: string;
  firstFeature: string;
  firstDetails: string;
  secondFeature: string;
  secondDetails: string;
  thirdFeature: string;
  thirdDetails: string;
  fourthFeature: string;
  fourthDetails: string;
  locale: string;
}) {
  return (
    <div
      className=" h-fit md:mb-24 mb-16 flex flex-col "
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center text-gray-800 text-lg xl:text-3xl lg:text-2xl mt-4 md:mt-0 font-bold mb-10 lg:mb-16">
        {featuresHeader}{" "}
      </div>
      <div className="flex flex-row-reverse flex-wrap justify-center items-center h-fit gap-5  ">
        <div
          className={`flex flex-col bg-white items-center rounded-lg shadow-lg md:h-[20rem] p-3 md:p-4 w-[70%] md:w-[30%] lg:w-[18%] pb-5 lg:pb-3`}
        >
          <div className="p-5 mt-0 lg:mt-4 rounded-[50%] shadow-lg flex items-center justify-center border">
            <div className="p-2 bg-black rounded-[50%] shadow-xl">
              <Image
                src="/truckfast.svg"
                className="w-full rounded-[50%] m-auto "
                alt="truckfast"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="text-center text-gray-800 text-lg mt-8 lg:mt-10 font-bold">
            {fourthFeature}{" "}
          </div>
          <div className="mt-5 text-center text-gray-800 font-medium">
            {fourthDetails}
          </div>
        </div>

        <div
          className={`flex flex-col pb-5 lg:pb-3 bg-white items-center rounded-lg shadow-lg md:h-[20rem] p-3 md:p-4 w-[70%] md:w-[30%] lg:w-[18%]`}
        >
          <div className="p-5 mt-0 lg:mt-4 rounded-[50%] shadow-lg flex items-center justify-center border">
            <div className=" p-2 bg-black rounded-[50%] shadow-xl">
              <Image
                src="/linkcircle.svg"
                className="w-full h-[auto] rounded-[50%] m-auto "
                alt="linkcircle"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="text-center text-gray-800 text-lg mt-8 lg:mt-10 font-bold">
            {thirdFeature}{" "}
          </div>
          <div className="mt-5 text-center text-gray-800 font-medium">
            {thirdDetails}
          </div>
        </div>

        <div
          className={`flex flex-col bg-white items-center rounded-lg shadow-lg md:h-[20rem] p-3 md:p-4 w-[70%] md:w-[30%] lg:w-[18%] pb-5 lg:pb-3`}
        >
          <div className="p-5 mt-0 lg:mt-4 rounded-[50%] shadow-lg flex items-center justify-center border">
            <div className="p-2 bg-black rounded-[50%] shadow-xl">
              <Image
                src="/bag2.png"
                className="rounded-[50%] m-auto w-6 h-6"
                alt="bag2"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="text-center text-gray-800 text-lg mt-8 lg:mt-10 font-bold">
            {secondFeature}{" "}
          </div>
          <div className="mt-5 text-center text-gray-800 font-medium">
            {secondDetails}
          </div>
        </div>

        <div
          className={`flex flex-col bg-white items-center rounded-lg shadow-lg md:h-[20rem] p-3 md:p-4 w-[70%] md:w-[30%] lg:w-[18%] pb-5 lg:pb-3`}
        >
          <div className="p-5 mt-0 lg:mt-4 rounded-[50%] shadow-lg flex items-center justify-center border">
            <div className="p-2 bg-black rounded-[50%] shadow-xl">
              <Image
                src="/usdcoin.svg"
                className="w-full h-[auto] rounded-[50%] m-auto "
                alt="usdcoin"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="text-center text-gray-800 text-lg mt-8 lg:mt-10 font-bold">
            {firstFeature}{" "}
          </div>
          <div className="mt-5 text-center text-gray-800 font-medium">
            {firstDetails}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
