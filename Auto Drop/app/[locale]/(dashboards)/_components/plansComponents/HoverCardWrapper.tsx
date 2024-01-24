import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress"

export default function HoverCardWrapper({title,remainingProducts,remainingOrders,children,locale}){
    return   <HoverCard>
    <HoverCardTrigger className="w-auto min-h-auto">{children}</HoverCardTrigger>
    <HoverCardContent dir={`${locale == "ar" ? "rtl" : "ltr"}`}
    >
      <div className="flex flex-col min-w-[44.3125rem]">
      {title}

        <div className="flex items-center space-x-2">
<span>{remainingProducts}</span>
<Progress dir={`${locale == "ar" ? "rtl" : "ltr"}`}value={33} className="w-[60%]"/>
        </div>
        <div className="flex">
<span>{remainingOrders}</span>
bar
        </div>
        <div className=""></div>
      </div>
    </HoverCardContent>
  </HoverCard>
}