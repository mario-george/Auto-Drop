import { Link } from "@/navigation";
import Image from "next/image";

export default function Footer({
  locale,
  footer1,
  footerLink1,
  footerLink2,
  footerLink3,
  autoDrop,
  contactUs,
  aboutUs,
}: {
  locale: string;
  footer1: string;
  footerLink1: string;
  footerLink2: string;
  footerLink3: string;
  autoDrop: string;
  contactUs: string;
  aboutUs: string;
}) {
  return (
    <div className={`bg-[#253439] py-14 `} dir={locale == "ar" ? "rtl" : "ltr"}>
      <div className="flex justify-center items-center mb-5">
        <Image
          src="/autodrop.svg"
          alt="autodrop"
          className="h-32 w-32"
          width={100}
          height={100}
        />
      </div>
      <div className="container flex flex-wrap justify-between">
        <div className="flex flex-col lg:basis-1/3">
          <div
            className={` text-white lg:text-2xl md:text-xl text-lg font-bold mb-14 translate-y-5`}
          >
            {aboutUs}
          </div>
          <div
            className={`md:w-64  w-36 leading-loose text-white lg:text-xl md:text-lg text-sm`}
          >
            {footer1}
          </div>
        </div>

        <div className="flex flex-col lg:basis-1/3">
          <div
            className={` text-white lg:text-2xl md:text-xl text-lg font-bold mb-14 translate-y-5`}
          >
            {autoDrop}
          </div>
          <div
            className={`text-white  lg:text-xl md:text-lg  hover:underline mb-3 cursor-pointer text-sm`}
          >
            {footerLink1}
          </div>
          <div
            className={`text-white  lg:text-xl md:text-lg  hover:underline mb-3  cursor-pointer text-sm`}
          >
            {footerLink2}
          </div>
          <div
            className={`text-white lg:text-xl md:text-lg  hover:underline mb-3  cursor-pointer text-sm`}
          >
            <Link href={"/faq"}> {footerLink3} </Link>
          </div>
        </div>

        <div className="flex flex-col lg:basis-1/3 xl:mx-0 mx-auto">
          <div className="text-center md:text-start text-white lg:text-2xl md:text-xl text-lg font-bold mb-14 translate-y-5">
            {contactUs}
          </div>
          <div className="flex flex-row gap-3">
            <Image
              src="/facebook.svg"
              alt="facebook"
              className="cursor-pointer md:w-10 md:h-10 w-10 h-10"
              width={100}
              height={100}
            />
            <Image
              src="/twee.svg"
              alt="tweeter"
              className="cursor-pointer md:w-10 md:h-10 w-10 h-10"
              width={100}
              height={100}
            />
            <Image
              src="/yout.svg"
              alt="youtube"
              className="cursor-pointer md:w-10 md:h-10 w-10 h-10"
              width={100}
              height={100}
            />
            <Image
              src="/linked.svg"
              alt="linkedin"
              className="cursor-pointer md:w-10 md:h-10 w-10 h-10"
              width={100}
              height={100}
            />
            <Image
              src="/whats.svg"
              alt="whatsapp"
              className="cursor-pointer md:w-10 md:h-10 w-10 h-10"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
