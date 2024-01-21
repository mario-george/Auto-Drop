import Image from "next/image";

export default function SixthSection({
  locale,
  stepsHeader,
  step1,
  step2,
  step3,
  step4,
  step5,
}: {
  locale: string;
  stepsHeader: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
}) {
  return (
    <div
      className="bg-white w-[100%] md:mt-40 md:mb-24 mb-16 flex flex-col  pb-24 md:pb-20"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center text-gray-800 lg:text-3xl md:text-xl text-xl font-bold lg:pt-20 pt-16">
        {stepsHeader}{" "}
      </div>
      <div className="flex flex-col m-auto lg:flex-row flex-wrap lg:flex-nowrap mt-20 justify-center lg:px-16">
        <div className="flex flex-row justify-center m-auto mb-10 lg:m-0 w-[50%]">
          <div className="flex flex-col self-start items-center justify-center">
            <div className="w-[5rem] h-[5rem] bg-[#B3A086] rounded-full shadow m-auto">
              <Image
                src="/downSign.svg"
                alt="downSign"
                className="m-auto pt-3 w-16 h-16"
                width={100}
                height={100}
              />
            </div>
            <div className="text-black font-normal text-center mt-10">
              {step1}{" "}
            </div>
          </div>
          <Image
            src={`${locale == "ar" ? "/downVector1.png" : "/RupVector.png"}`}
            alt="downVector"
            className={`h-[2rem] w-[auto] ${
              locale == "en" ? "mt-16" : "mt-0"
            } lg:block hidden`}
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-row justify-center m-auto mb-10 lg:m-0 w-[50%]">
          <div className="flex flex-col self-start items-center justify-center">
            <div className="w-[5rem] h-[5rem] bg-black  rounded-full shadow m-auto">
              <Image
                src="/Group1098.svg"
                alt="Group1098"
                className="m-auto pt-3 w-16 h-16"
                width={100}
                height={100}
              />
            </div>
            <div className="text-black font-normal text-center mt-10">
              {step2}{" "}
            </div>
          </div>
          <Image
            src={`${locale == "en" ? "/RdownVector.png" : "/upVector.svg"}`}
            alt="upVector"
            className={`h-[2rem] w-[auto] ${
              locale == "ar" ? "mt-16" : "mt-0"
            } lg:block hidden`}
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-row justify-center m-auto mb-10 lg:m-0 w-[50%]">
          <div className="flex flex-col self-start items-center justify-center">
            <div className="w-[5rem] h-[5rem] bg-[#B3A086] rounded-full shadow m-auto">
              <Image
                src="/Buy.svg"
                alt="Buy"
                className="m-auto pt-3 w-16 h-16"
                width={100}
                height={100}
              />
            </div>
            <div className="text-black font-normal text-center mt-10">
              {step3}{" "}
            </div>
          </div>
          <Image
            src={`${locale == "ar" ? "/downVector1.png" : "/RupVector.png"}`}
            alt="downVector"
            className={`h-[2rem] w-[auto] ${
              locale == "en" ? "mt-16" : "mt-0"
            } lg:block hidden`}
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-row justify-center m-auto mb-10 lg:m-0 w-[50%]">
          <div className="flex flex-col self-start items-center justify-center">
            <div className="w-[5rem] h-[5rem] bg-black  rounded-full shadow m-auto">
              <Image
                src="/Group1098.svg"
                alt="Group1098"
                className="m-auto pt-3 w-16 h-16"
                width={100}
                height={100}
              />
            </div>
            <div className="text-black font-normal text-center mt-10">
              {step4}{" "}
            </div>
          </div>
          <Image
            src={`${locale == "en" ? "/RdownVector.png" : "/upVector.svg"}`}
            alt="upVector"
            className={`h-[2rem] w-[auto] ${
              locale == "ar" ? "mt-16" : "mt-0"
            } lg:block hidden`}
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-row-reverse justify-center m-auto lg:m-0 w-[50%] lg:w-[15%]">
          <div className="flex flex-col ">
            <div className="w-[5rem] h-[5rem] bg-[#B3A086] rounded-full shadow mx-auto flex justify-center items-center">
              <Image
                src="/up.svg"
                alt="up"
                className="m-auto pt-3 w-14 h-14"
                width={100}
                height={100}
              />
            </div>
            <div className="text-black font-normal text-center mt-10">
              {step5}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
