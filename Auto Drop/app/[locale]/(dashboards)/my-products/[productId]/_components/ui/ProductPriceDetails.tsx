import React, { useState } from "react";
import { Switch } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";

export default function ProductPriceDetails({
  addOfferPrice,
  editedPrice,
  profit,
  finalPrice,
  totalProfit,
  inputClasses,
  showDiscountPrice,
  setShowDiscountPrice,
  shippingTotalCost,
}: any) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-2 space-s-3 items-center">
        <div className="flex whitespace-nowrap items-center space-s-3">
          <div>{addOfferPrice}</div>
          <Switch
            id="email-alerts"
            isChecked={showDiscountPrice}
            onChange={() => {
              setShowDiscountPrice(!showDiscountPrice);
            }}
          />{" "}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 my-4 min-w-full">
        <span>{editedPrice}</span>
        <span>{profit}</span>
        <Input
          className={`shadow-sm text-sm md:text-base min-w-[60%] ${inputClasses} `}
          value={CurrencyFormatter(finalPrice + shippingTotalCost)}
        />
        <Input
          className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#636867] ${inputClasses} `}
          value={CurrencyFormatter(totalProfit)}
        />
      </div>
    </div>
  );
}
