import { Button } from "@/components/ui/button";
import React from "react";

export default function OrderStatusButton({
  orderStatus,
}: {
  orderStatus: string;
}) {
  let buttonC = " rounded-lg px-3 h-8";
  if (orderStatus === "قيد الدفع") {
    buttonC += " text-[#253439] bg-[#eaebec]";
  } else if (orderStatus === "مكتمل") {
    buttonC += " text-[#008767] bg-[#f2fcfb] px-5";
  } else {
    buttonC += " text-[#c1121f] bg-[#ffd6d9] px-6";
  }

  return (
    <div>
      <Button className={buttonC}>{orderStatus}</Button>
    </div>
  );
}
