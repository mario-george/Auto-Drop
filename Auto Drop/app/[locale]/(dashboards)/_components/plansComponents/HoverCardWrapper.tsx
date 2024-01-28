import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface HoverCardProps {
  title: string;
  remainingProducts: string;
  remainingOrders: string;
  children: React.ReactNode;
  locale: string;
  subscriptionDate: string;
  subscriptionExpirationDate: string;
}
export default function HoverCardWrapper({
  title,
  remainingProducts,
  remainingOrders,
  children,
  locale,
  subscriptionDate,
  subscriptionExpirationDate,
}: HoverCardProps) {
  let content = (
    <div className="hidden lap:flex flex-col font-bold text-[20px]  ">
      <span className="font-bold text-[32px] mb-1 ">{title}</span>
      <div className="grid grid-rows-2 gap-3">
        <div className="flex items-center space-s-2 mb-3">
          <>
            <span>{remainingProducts}</span>
            <Progress
              dir={`${locale == "ar" ? "rtl" : "ltr"}`}
              value={33}
              className="w-[60%]"
            />
          </>
        </div>
        <div className="flex items-center space-s-2">
          <span>{remainingOrders}</span>
          <Progress
            dir={`${locale == "ar" ? "rtl" : "ltr"}`}
            value={66}
            className="w-[60%]"
          />
        </div>
        <div className="bg-[#eaebec] flex flex-1 justify-between font-normal text-[20px] px-4 rounded-lg -my-4 py-4 -mx-4">
          <div>{subscriptionDate} May 29, 2017</div>
          <div>{subscriptionExpirationDate} May 29, 2017</div>
        </div>
      </div>
    </div>
  );

  let mobileContent = (
    <div
      className="flex lap:hidden relative z-[10000] flex-col !min-w-[10rem] font-bold text-sm "
      dir={`${locale == "ar" ? "rtl" : "ltr"}`}
    >
      <span className="font-bold text-md mb-3 ">{title}</span>
      <div className="grid grid-rows-2 gap-3">
        <div className="flex items-center">
          <>
            <span>{remainingProducts}</span>
            <Progress
              dir={`${locale == "ar" ? "rtl" : "ltr"}`}
              value={33}
              className="w-[60%]"
            />
          </>
        </div>
        <div className="flex items-center space-s-2">
          <span>{remainingOrders}</span>
          <Progress
            dir={`${locale == "ar" ? "rtl" : "ltr"}`}
            value={66}
            className="w-[60%]"
          />
        </div>
        <div className="bg-[#eaebec] flex flex-1 justify-between font-normal text-xs rounded-lg -my-5 py-2 -mx-4 mt-2 px-2">
          <div className="flex flex-col space-y-1">
            <div>{subscriptionDate}</div>

            <div>May 29, 2017</div>
          </div>
          <div className="flex flex-col space-y-1">
            <div>{subscriptionExpirationDate}</div>

            <div>May 29, 2017</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="flex lap:hidden  relative flex flex-col  bg-white rounded-xl shadow-lg m-auto w-full ml:w-[80%] tab:w-[35%] lg:w-[20.5%]  py-2 md:py-7 md:pt-11 ">
        <Popover>
          <PopoverTrigger>{children}</PopoverTrigger>
          <PopoverContent>{mobileContent}</PopoverContent>
        </Popover>
      </div>
      <HoverCard>
        <HoverCardTrigger className="hidden lap:flex relative flex flex-col  bg-white rounded-xl shadow-lg m-auto w-full ml:w-[80%] tab:w-[35%] lg:w-[20.5%]  py-2 md:py-7 md:pt-11">
          {children}
        </HoverCardTrigger>
        <HoverCardContent dir={`${locale == "ar" ? "rtl" : "ltr"}`}>
          {content}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
