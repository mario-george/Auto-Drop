import { Button } from "@/components/ui/button";
import React from "react";

export default function OrderStatusButton({
  orderStatus,
}: {
  orderStatus: string;
}) {
  let buttonC = " rounded-lg px-3 h-8";
  if (orderStatus === "قيد الدفع") {
    buttonC += " text-[#253439] bg-[#eaebec] dark:bg-gray-300 dark:text-black";
  } else if (orderStatus === "مكتمل") {
    buttonC += " text-[#008767] bg-[#f2fcfb] dark:bg-green-300 px-5 dark:text-black";
  } else {
    buttonC += " text-[#c1121f] bg-[#ffd6d9] dark:bg-red-300 px-6 dark:text-black";
  }

  return (
    <div>
      <Button className={buttonC}>{orderStatus}</Button>
    </div>
  );
}
