import { Button } from "@/components/ui/button";
import React from "react";

export default function OrderStatusButton({
  orderStatus   ,translationMessages
}: {
  orderStatus: string;
  translationMessages:{[key:string]:string}
  
}) {
  let { deliveryInProgess,
    delivered,
    created,
    inReview,
    InProgress} = translationMessages
  // 

  let buttonC = " rounded-lg px-3 h-8 dark:text-black text-white px-6 ";
  let buttonClasses = " rounded-lg px-3 h-8 dark:text-black text-white px-6 ";

  let currStatusText = created;
  switch (orderStatus) {
    case "created":
      currStatusText = created;
      buttonC += " text-[#253439] bg-[#FACC15] ";
      break;
    case "in_review":
      currStatusText = inReview;
      buttonC += " text-white bg-[#916F16] px-5 ";

      break;
    case "in_progress":
      currStatusText = InProgress;
      buttonC += " text-[#c1121f] bg-[#3F51B5] px-6 ";

      break;
    case "in_transit":
      currStatusText = deliveryInProgess;
      buttonC += " text-[#c1121f] bg-[#D804FC] ";

      break;

    case "completed":
      currStatusText = delivered;
      buttonC += " text-[#c1121f] bg-[#ffd6d9] px-6 ";

      break;
    default:
      currStatusText = orderStatus;
      break;
  }
  // 
/*     let deliveryProgressStrings  = ["جاري التوصيل","Delivery in progess"]
  let deliveredStrings  = ["تم التوصيل","Delivered"]
  let InReveiwStrings  = ["قيد المراجعة","In Review"]
  let InProgressStrings  = ["قيد التنفيذ","In Progress"]
  let createdStrings  = ["تم الانشاء","Created"]
  let rejectedStrings  = ["ملغي","Rejected"] */
  // let buttonC = " rounded-lg px-3 h-8";
/*   if (createdStrings.includes(orderStatus)) { 
    buttonC += " text-[#253439] bg-[#FACC15] dark:text-black";
  } else if (InReveiwStrings.includes(orderStatus)) {
    buttonC += " text-[#008767] bg-[#916F16] px-5 dark:text-black";
  } else if(InProgressStrings.includes(orderStatus)) {
    buttonC += " text-[#c1121f] bg-[#3F51B5] px-6 dark:text-black";
  }else{
    buttonC += " text-[#c1121f] bg-[#ffd6d9] px-6 dark:text-black";

  } */
  return (
    <div>
      <Button className={buttonC}>{currStatusText}</Button>
    </div>
  );
}
