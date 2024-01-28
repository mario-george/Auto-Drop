import Image from "next/image";

export default function CardsSection({
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
      <div className="flex  lg:pl-[6rem] max-[425px]:w-[50%] w-1/2 lg:w-[46%]">
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
  );
}
