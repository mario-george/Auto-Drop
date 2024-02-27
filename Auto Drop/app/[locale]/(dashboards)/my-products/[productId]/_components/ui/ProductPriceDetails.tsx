import React, { useState } from "react";
import { Switch } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";

export default function ProductPriceDetails({
  offerPrice,
  addOfferPrice,target_original_price
}: any) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="flex space-s-3 items-center">
        <div>{addOfferPrice}</div>
        <Switch
          id="email-alerts"
          isChecked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
      </div>
      {checked && (
        <>
          <div>{offerPrice}</div>
          <Input type="number" value={target_original_price} className="" />
        </>
      )}
    </div>
  );
}
