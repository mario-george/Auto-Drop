import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
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
  return (
    <HoverCard>
      <HoverCardTrigger className="relative flex flex-col  bg-white rounded-xl shadow-lg m-auto max-[350px]:w-[100%] max-[426px]:w-[47%] w-[48%] lg:w-[20.5%] py-2 md:py-7 md:pt-11">
        {children}
      </HoverCardTrigger>
      <HoverCardContent dir={`${locale == "ar" ? "rtl" : "ltr"}`}>
        <div className="flex flex-col min-w-[40rem] font-bold text-[24px] ">
          <span className="font-bold text-[32px] mb-1 ">{title}</span>
          <div className="grid grid-rows-2 gap-4">
            <div className="flex items-center space-s-2 mb-5">
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
                value={33}
                className="w-[60%]"
              />
            </div>
            <div className="bg-[#eaebec] flex flex-1 justify-between font-normal text-[20px] px-4 rounded-lg -my-4 py-4 -mx-4">
              <div>{subscriptionDate} May 29, 2017</div>
              <div>{subscriptionExpirationDate} May 29, 2017</div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
