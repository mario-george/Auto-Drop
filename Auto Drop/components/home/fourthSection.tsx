import Image from "next/image";

export default function FourthSection({
  locale,
  serviceHeader,
  orders,
  products,
  order1,
  order2,
  order3,
  products1,
  products2,
  products3,
  products4,
}: {
  locale: string;
  serviceHeader: string;
  orders: string;
  products: string;
  order1: string;
  order2: string;
  order3: string;
  products1: string;
  products2: string;
  products3: string;
  products4: string;
}) {
  return (
    <div
      className="bg-white w-[100%] md:mt-40 md:mb-24 mb-16 pb-24 md:pb-20 relative"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-gray-800 text-lg xl:text-3xl lg:text-2xl font-bold lg:pt-24 pt-16 text-center ">
        {serviceHeader}
      </div>
      <div className="flex flex-col gap-y-10 md:flex-row flex-wrap justify-between mt-4 md:mt-20 container">
        <div className="flex flex-col w-[100%] md:w-[47%] pr-1 md:pr-10">
          <div
            className={`mt-5 mb-0 md:mb-5 md:pr-2 text-gray-800 lg:text-2xl md:text-xl text-base font-bold`}
          >
            {orders}
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {order1}{" "}
            </div>
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4 translate-y-3"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {order2}{" "}
            </div>
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4 translate-y-3"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {order3}{" "}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[100%] md:w-[47%] pr-1 md:pr-10">
          <div
            className={`mt-5 mb-0 md:mb-5 md:pr-2 text-gray-800 lg:text-2xl md:text-xl text-base font-bold`}
          >
            {products}
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4 translate-y-4"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {products1}{" "}
            </div>
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4 translate-y-4"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {products2}{" "}
            </div>
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4 translate-y-4"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {products3}{" "}
            </div>
          </div>
          <div className={`flex items-center md:mt-5 mt-0 gap-5`}>
            <Image
              src="/Ellipse.svg"
              className="w-4 h-4 translate-y-4"
              alt="Ellipse"
              width={50}
              height={50}
            />
            <div
              className={`pt-6 leading-loose text-gray-800 lg:text-2xl md:text-xl text-base font-semibold`}
            >
              {products4}{" "}
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/image.svg"
        alt="image"
        className={`absolute -bottom-10 ${
          locale == "ar" ? "left-1/2" : "left-1/4"
        } md:block hidden w-64 h-64`}
        width={100}
        height={100}
      />
    </div>
  );
}
