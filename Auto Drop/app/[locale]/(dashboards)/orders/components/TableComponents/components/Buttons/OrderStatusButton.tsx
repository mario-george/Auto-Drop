import { Button } from "@/components/ui/button";
import React from "react";

export default function OrderStatusButton({
  orderStatus,
}: {
  orderStatus: string;
}) {
    let deliveryProgressStrings  = ["جاري التوصيل","Delivery in progess"]
  let deliveredStrings  = ["تم التوصيل","Delivered"]
  let InReveiwStrings  = ["قيد المراجعة","In Review"]
  let InProgressStrings  = ["قيد التنفيذ","In Progress"]
  let createdStrings  = ["تم الانشاء","Created"]
  let rejectedStrings  = ["ملغي","Rejected"]
  let buttonC = " rounded-lg px-3 h-8";
  if (createdStrings.includes(orderStatus)) { 
    buttonC += " text-[#253439] bg-[#FACC15] dark:text-black";
  } else if (InReveiwStrings.includes(orderStatus)) {
    buttonC += " text-[#008767] bg-[#916F16] px-5 dark:text-black";
  } else if(InProgressStrings.includes(orderStatus)) {
    buttonC += " text-[#c1121f] bg-[#3F51B5] px-6 dark:text-black";
  }else{
    buttonC += " text-[#c1121f] bg-[#ffd6d9] px-6 dark:text-black";

  }
  return (
    <div>
      <Button className={buttonC}>{orderStatus}</Button>
    </div>
  );
}
