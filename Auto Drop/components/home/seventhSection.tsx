import Image from "next/image";

export default function SeventhSection({
  packageHeader,
  Package1,
  Package2,
  Package3,
  Package4,
  originalPrice3,
  PackagePrice3,
  PackageProducts1,
  PackageProducts2,
  PackageProducts3,
  PackageOrders1,
  PackageOrders2,
  PackageOrders3,
  subscribtion,
  PackageProducts4,
  PackageOrders4,
  monthly,
  free,
  locale,
  freeButton,
  SAR
}: {
  packageHeader: string;
  Package1: string;
  Package2: string;
  Package3: string;
  Package4: string;
  originalPrice1: string;
  originalPrice2: string;
  originalPrice3: string;
  PackagePrice1: string;
  PackagePrice2: string;
  PackagePrice3: string;
  PackagePrice4: string;
  PackageProducts1: string;
  PackageProducts2: string;
  PackageProducts3: string;
  PackageOrders1: string;
  PackageOrders2: string;
  PackageOrders3: string;
  subscribtion: string;
  PackageProducts4: string;
  PackageOrders4: string;
  monthly: string;
  free: string;
  locale: string;
  freeButton: string;
  SAR:string
}) {
  return (
    <div className="md:mb-24 mb-16" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="text-center text-gray-800 text-xl xl:text-3xl lg:text-2xl font-bold">
        {packageHeader}
      </div>
      <div
        className="flex md:flex-row-reverse mt-20 flex-wrap lg:gap-y-5
       justify-center lg:justify-end px-9 md:px-24 lg:px-24 xl:px-44 xl:gap-0 gap-4"
      >
        <div
          className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg
         m-auto basis-[47%] md:basis-[48%] xl:basis-[24%] max-[321px]:basis-[100%] p-3 px-0 md:px-5"
        >
          <Image
            src="/Star.svg"
            alt="star"
            width={30}
            height={30}
            className="absolute top-3 left-4 hidden md:block"
          />
          <div className="xl:h-64 h-60">
            <div className="text-center text-gray-800 md:text-lg text-base font-bold mb-5 md:px-8 px-0 ">
              {Package1}{" "}
            </div>
            <div className="flex flex-nowrap justify-center items-center md:md:px-8 px-0 " dir="ltr">
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                249.0
              </div>
              <div className="pt-1 px-1 text-gray-800 text-[10px] font-bold">
                {SAR}
              </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                {" "}
                349.00
              </div>
            </div>
            <div className="text-center text-gray-800 md:text-lg text-base mt-5 font-bold md:px-8 px-0">
              {monthly}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageProducts1}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageOrders1}
            </div>
          </div>

          <div
            className="mx-auto px-8 border-2 cursor-pointer w-[90%] 
            h-[38px] md:h-[55px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800
            hover:to-gray-600 hover:via-gray-700 rounded-xl shadow text-center
             text-white text-sm font-bold flex justify-center items-center"
          >
            <button>{subscribtion}</button>
          </div>
        </div>

        <div
          className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg 
        m-auto basis-[47%] md:basis-[48%] xl:basis-[24%] max-[321px]:basis-[100%] p-3 px-0 md:px-5"
        >
          <Image
            src="/Star.svg"
            alt="star"
            width={30}
            height={30}
            className="absolute top-3 left-4 hidden md:block"
          />
          <div className="xl:h-64 h-60">
            <div className="text-center text-gray-800 md:text-lg text-base font-bold mb-5 md:px-8 px-0">
              {Package2}{" "}
            </div>
            <div className="flex flex-nowrap justify-center items-center md:px-8 px-0" dir="ltr">
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                249.0
              </div>
              <div className="pt-1 px-1 text-gray-800 text-[10px] font-bold">
                {SAR}
              </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                {" "}
                349.00
              </div>
            </div>
            <div className="text-center text-gray-800 md:text-lg text-base mt-5 font-bold md:px-8 px-0">
              {monthly}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageProducts2}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageOrders2}
            </div>
          </div>

          <div
            className="mx-auto md:px-8 px-0 border-2 cursor-pointer w-[90%] 
             h-[38px] md:h-[55px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800
            hover:to-gray-600 hover:via-gray-700 rounded-xl shadow text-center
             text-white text-sm font-bold flex justify-center items-center"
          >
            <button>{subscribtion}</button>
          </div>
        </div>

        <div
          className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg m-auto 
          basis-[47%] md:basis-[48%] max-[321px]:basis-[100%] xl:basis-[24%] p-3 px-0 md:px-5"
        >
          <div className="xl:h-64 h-60">
            <div className="text-center text-gray-800 md:text-lg text-base font-bold mb-5 md:px-8 px-0">
              {Package3}{" "}
            </div>
            <div className="flex flex-nowrap justify-center items-center md:px-8 px-0" dir="ltr">
                <div className="text-gray-800 text-sm md:text-base font-bold ">
                249.0
              </div>
              <div className="pt-1 px-1 text-gray-800 text-[10px] font-bold">
                {SAR}
              </div>
                <div className="text-red-700 pt-[.08rem] text-xs font-bold line-through">
                {" "}
                349.00
              </div>
            </div>
            <div className="text-center text-gray-800 md:text-lg text-base mt-5 font-bold md:px-8 px-0">
              {monthly}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageProducts3}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageOrders2}
            </div>
          </div>

          <div
            className="mx-auto md:px-8 px-0 border-2 cursor-pointer w-[90%] 
           h-[38px] md:h-[55px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800
            hover:to-gray-600 hover:via-gray-700 rounded-xl shadow text-center
             text-white text-sm font-bold flex justify-center items-center"
          >
            <button>{subscribtion}</button>
          </div>
        </div>

        <div
          className="relative flex flex-col flex-wrap bg-white rounded-lg shadow-lg m-auto basis-[47%]
        md:basis-[48%] xl:basis-[24%] max-[321px]:basis-[100%] p-3 px-0 md:px-5"
        >
          <div className="xl:h-64 h-60">
            <div className="text-center text-gray-800 md:text-lg text-base font-bold mb-5 md:px-8 px-0">
              {Package4}{" "}
            </div>
            <div className="flex flex-wrap justify-center pt-8">
              <div className="text-gray-800 md:text-lg text-base font-bold translate-y-4">
                {free}
              </div>
            </div>

            <div className="text-center text-gray-950 md:text-lg text-base font-medium md:px-8 px-0 mt-8">
              {PackageProducts4}
            </div>
            <div className="text-center text-gray-950 md:text-lg text-base mt-5 font-medium md:px-8 px-0">
              {PackageOrders4}
            </div>
          </div>

          <div
            className="mx-auto md:px-8 px-0 border-2 cursor-pointer w-[90%] 
           h-[38px] md:h-[55px] bg-gradient-to-l from-gray-800 via-gray-800 to-gray-800
            hover:to-gray-600 hover:via-gray-700 rounded-xl shadow text-center
             text-white text-sm font-bold flex justify-center items-center"
          >
            <button>{freeButton}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
