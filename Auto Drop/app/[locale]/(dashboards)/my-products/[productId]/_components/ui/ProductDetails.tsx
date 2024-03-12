import React from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";
import {Radio,RadioGroup} from '@chakra-ui/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ProductDetails({
productOptionsDetails,availableQuantity,withText,originalPrice,originalPriceText,profitTypeText,finalPrice,finalPriceText,profit,profitText,currentPiece,productQuantity,tagetSalePrice,inputClasses,withoutShipping,shippingIncluded,shippingChoosenValue,profitType,variantsDetails,percentage,number,valueText
}: any) {
  console.log("shippingChoosenValue",shippingChoosenValue)
    const [value,setValue] = React.useState(shippingChoosenValue)
console.log('variantsDetails',variantsDetails)
let SelectComponent = (
  <Select
    onValueChange={(value: any) => {
      // setProfitChoosenType(value);
    }}
    defaultValue="percentage"
  >
    <SelectTrigger className="bg-[#edf5f9] dark:text-black">
      <SelectValue
        className=" dark:text-[#253439]"
        placeholder={percentage}
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="number">{number}</SelectItem>
        <SelectItem value="percentage">{percentage}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
let product=null
if (false) {
  SelectComponent = (
    <Select
      onValueChange={(value: any) => {
        // setProfitChoosenType(value);
      }}
      defaultValue="number"
    >
      <SelectTrigger className="bg-[#edf5f9] dark:text-black">
        <SelectValue
          className=" dark:text-[#253439]"
          placeholder={percentage}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="number">{number}</SelectItem>
          <SelectItem value="percentage">{percentage}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
  return (
    <div>
        <span>{productOptionsDetails}</span>
    <div className="border rounded-lg p-5">
     <div className="flex items-center space-s-2">
                <span>{availableQuantity}</span>
                <span className="text-[#8d9598]">
                  {productQuantity} {currentPiece}
                </span>
              </div>
              <Separator />
    <div className="grid grid-cols-3  tab:gap-4   my-4 min-w-full gap-6 ">
                  <span className="">{originalPrice}:</span>
                  <Input
                    className={`shadow-sm text-sm md:text-base col-span-2 bg-[#edf5f9] ${inputClasses} `}
                    value={CurrencyFormatter(tagetSalePrice)}
                    
                  />{" "}
                    <span>{withText}:</span>
                    
                    
                    
                                      <RadioGroup
                    value={value}
                    className="grid grid-cols-1 ml:grid-cols-2 gap-2 tab:my-0 my-2 ml:my-3 w-full col-span-2"
  
             
                  >
                    <div className="flex items-center space-x-2  bg-[#edf5f9] p-2 rounded-md">
                      <Radio value="withoutShipping" id="r1" />
                      <label
                        className="whitespace-nowrap  text-xs mm:text-sm ml:text-md dark:text-black"
                        htmlFor="r1"
                      >
                        {withoutShipping}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
                      <Radio value="shippingIncluded" id="r2" />
                      <label
                        className="whitespace-nowrap text-xs mm:text-sm ml:text-md dark:text-black"
                        htmlFor="r2"
                      >
                        {shippingIncluded}
                      </label>
                    </div>
                  </RadioGroup>
                  <div>

                  <span className="">{profitType}</span>

                  {SelectComponent}
                  </div>

                  <div className=" flex items-center space-s-3 ">
                  <span>{valueText}:</span>
                    <div className="relative mt-auto min-w-full">
                      <Input
                        type="number"
                        className="inputField px-6"
                        // value={commissionVal}
                  /*       onChange={(e: any) => {
                          if (e.target.value) {
                            setCommissionVal(parseInt(e.target.value));
                          } else {
                            setCommissionVal(0);
                          }
                        }} */
                      />
                      <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
                        {/* {profitChoosenType == "percentage" ? <>%</> : <></>} */}
                      </span>
                    </div>
                  </div>
                </div>
    </div>
    </div>
  );
}
