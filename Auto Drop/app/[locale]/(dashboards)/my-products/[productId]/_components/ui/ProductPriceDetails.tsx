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
  shippingTotalCost,setDiscountPrice,discountPrice,shippingWithoutOrInclude,choosenShippingIndex,shipping
}: any) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="">
        <div className="grid lap:grid-cols-6 min-w-full whitespace-nowrap items-center lap:space-s-3">
         <div className="col-span-3 flex justify-between w-full items-center ">


          <div className="">{addOfferPrice}</div>
          <Switch
            id="email-alerts"
            isChecked={showDiscountPrice}
            onChange={() => {
              setShowDiscountPrice(!showDiscountPrice);
            }}
            className="col-span-2"
          />{" "}
         </div>

            <Input
          className={`shadow-sm text-sm md:text-base min-w-[60%] lap:col-span-3 ${inputClasses} `}
          // ref={discountPriceRef}
// type="number"

          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log("event.target.value", event.target.value);
            let onlyNumber = event.target.value.replace(/[^0-9.]/g,"");       
             console.log("onlyNumber", onlyNumber)
            setDiscountPrice(+onlyNumber);
          }}
          // value={CurrencyFormatter(discountPrice)}
          value={"SAR "+(discountPrice ?? 0)}
        />

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
          className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#008767] ${inputClasses} `}
          value={shippingWithoutOrInclude === "withoutShipping" ? CurrencyFormatter(totalProfit  - (shipping?.[choosenShippingIndex]?.freight?.cent/100) ?? 0) :CurrencyFormatter(totalProfit)  }
        />
      </div>
    </div>
  );
}
