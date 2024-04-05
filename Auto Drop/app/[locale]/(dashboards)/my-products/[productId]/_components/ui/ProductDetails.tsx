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
import { Radio, RadioGroup } from "@chakra-ui/react";
import VariantExtractor from "./features/VariantExtractor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
const calcShippingFee = (shipping:any,shipIndex:number)=>{
  let fee:any = (shipping?.[shipIndex]?.freight?.cent || 0) ;
  if(fee !==0){

    fee/=100
  }
  return -fee
  

}
export default function ProductDetails({
  productOptionsDetails,
  availableQuantity,
  withText,
  originalPrice,
  originalPriceText,
  profitTypeText,
  finalPrice,
  finalPriceText,
  profit,
  profitText,
  currentPiece,
  productQuantity,
  tagetSalePrice,
  inputClasses,
  withoutShipping,
  shippingIncluded,
  // shippingChoosenValue,
  profitType,
  variantsDetails,
  percentage,
  number,
  valueText,
  optionChoosenValues,
  setCurrentlySelectedVariant,
  currentlySelectedVariant,
  setVariantsDetails,
  shippingTotalCost,productOptions,shippingWithoutOrInclude,shipping,choosenShippingIndex,baseCommission
}: any) {
  // console.log("shippingChoosenValue", shippingChoosenValue);
  // const [value, setValue] = React.useState(shippingChoosenValue);
  
  console.log("optionChoosenValues", optionChoosenValues);
  console.log("currentlySelectedVariant", currentlySelectedVariant);
  let {
    id,
    sku_price: originalPriceValue,
    offer_sale_price: price,
    sku_available_stock: productQuantityValue,
    shippingChoice,
    profitTypeValue,
    commission,
  } = currentlySelectedVariant;
  console.log("profitTypeValue",profitTypeValue)
  console.log("variantsDetails", variantsDetails);
  console.log("shippingChoice", shippingChoice);

  if (price) {
    price = Number(price);
  }

  function changeVariantOptionsHandler(option: string, value: string | number) {
    let ids = foundElement?.map((element: any) => element.id);
    if (option == "shipping") {
      setVariantsDetails((prev: any) => {
        let updatedVars = [...prev];

        updatedVars = updatedVars.map((variant: any) => {
          if (ids?.includes(variant.id)) {
            let require_shipping: boolean;
            if (shippingChoice == "shippingIncluded") {
              require_shipping = false;
            } else {
              require_shipping = true;
            }
            return { ...variant, shippingChoice: value, require_shipping };
          }
          console.log("updatedVars", updatedVars);
          return variant;
        });

        return updatedVars;
      });
    } else if (option == "commission") {
      setVariantsDetails((prev: any) => {
        let updatedVars = [...prev];

        updatedVars = updatedVars.map((variant: any) => {
          if (ids?.includes(variant.id)) {
            return { ...variant, commission: value };
          }
          return variant;
        });

        return updatedVars;
      });
    } else if (option == "profitType") {
      setVariantsDetails((prev: any) => {
        let updatedVars = [...prev];

        updatedVars = updatedVars.map((variant: any) => {
          if (ids?.includes(variant.id)) {
            return { ...variant, profitTypeValue: value };
          }
          return variant;
        });

        return updatedVars;
      });
    }
  }
  let foundElement = VariantExtractor(optionChoosenValues, variantsDetails);
  if (foundElement && foundElement?.length > 0) {
    setCurrentlySelectedVariant(foundElement[0]);
  }
  console.log("foundElement", foundElement);

  // console.log("variantsDetails", variantsDetails);
  console.log("profitTypeValue", profitTypeValue);
  let SelectComponent = (
    <Select
      onValueChange={(value: any) => {
        console.log("profitTypeeee", value);
        changeVariantOptionsHandler("profitType", value);
      }}
      // defaultValue="percentage"
      value={profitTypeValue}
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
  let finalTargetPrice = price || 0;
  if (profitTypeValue == "percentage" && commission !== 0) {
    console.log("price", price);
    console.log("commission", commission);
    finalTargetPrice = (commission * price) / 100 + price;
  } else if (profitTypeValue == "number" && commission !== 0) {
    finalTargetPrice = price + commission;
  }
  let shippingVariantTotalCost = 0;
  let shippingWithoutShippingCost = 0;
  if (shippingWithoutOrInclude == "shippingIncluded") {
    shippingVariantTotalCost = shippingTotalCost;
  }else{
    shippingWithoutShippingCost = calcShippingFee(shipping,choosenShippingIndex)
     console.log(shippingWithoutShippingCost,"shippingWithoutShippingCost")
     console.log(shipping,"shipping")
     console.log(choosenShippingIndex,"choosenShippingIndex")
  }
if(!productOptions || productOptions?.length==0|| !productOptions?.[0]?.name){

      return <></>;
    
  }
  let totalProfit = finalTargetPrice - price
  console.log("totalProfit",totalProfit)
  console.log("shippingVariantTotalCost",shippingVariantTotalCost)
  console.log("totalProfit - shippingVariantTotalCost",totalProfit+ shippingVariantTotalCost)
  console.log("typeof shippingVariantTotalCost",typeof shippingVariantTotalCost)
  console.log("shippingWithoutOrInclude",shippingWithoutOrInclude)
  console.log(shippingWithoutOrInclude === "withoutShipping" ? CurrencyFormatter(totalProfit  + shippingVariantTotalCost):CurrencyFormatter(totalProfit) )
    return (
    <div className={`text-xs tab:text-sm`}>
      <span>{productOptionsDetails}</span>
      <div className="border rounded-lg p-2 tab:p-5 my-2">
        <div className="flex items-center space-s-2">
          <span>{availableQuantity}</span>
          <span className="text-[#8d9598]">
            {productQuantityValue} {currentPiece}
          </span>
        </div>
        <div className="my-2">
          <Separator />
        </div>
        <div className="grid grid-cols-1 tab:grid-cols-3  tab:gap-4   my-4 min-w-full gap-2 tab:gap-6 items-center ">
          <div className="">
            <span className="">{originalPrice}:</span>
          </div>
          <Input
            className={`shadow-sm text-sm md:text-base tab:col-span-2 bg-[#edf5f9] ${inputClasses} `}
            value={CurrencyFormatter(price)}
          />{" "}
{/*           <div className="col-span-full grid tab:grid-cols-6 min-w-full gap-2  items-center">
            <span className="col-span-1">{withText}:</span>
            <RadioGroup
              value={shippingChoice}
              className="grid grid-cols-1 ml:grid-cols-2 gap-2 tab:my-0 my-2 ml:my-3 w-full col-span-5"
              onChange={(value: string) => {
                console.log("value", value);
                changeVariantOptionsHandler("shipping", value);
              }}
            >
              <div className="flex items-center space-s-1  bg-[#edf5f9] p-1 py-2 rounded-md">
                <Radio value="withoutShipping" id="r1" />
                <label
                  className="whitespace-nowrap  text-xs  dark:text-black"
                  htmlFor="r1"
                >
                  {withoutShipping}
                </label>
              </div>
              <div className="flex items-center space-s-1 bg-[#edf5f9] p-1 py-2 rounded-md">
                <Radio value="shippingIncluded" id="r2" />
                <label
                  className="whitespace-nowrap text-xs dark:text-black"
                  htmlFor="r2"
                >
                  {shippingIncluded}
                </label>
              </div>
            </RadioGroup>
          </div> */}
          <div className="grid tab:grid-cols-6 min-w-full tab:col-span-3 gap-3 items-center ">
            <span className="">{profitType}</span>
            <div className="col-span-2">{SelectComponent}</div>
            <span className="whitespace-nowrap">{valueText}:</span>
            <div className="relative mt-auto min-w-full col-span-2">
              <Input
                type="number"
                className="inputField px-6 "
                value={commission}
                onChange={(e: any) => {
                  let price = parseInt(e.target.value);
                  if (e.target.value) {
                    changeVariantOptionsHandler("commission", price);

                    // setCommissionVal();
                  } else {
                    price = 0;
                    changeVariantOptionsHandler("commission", price);

                    // setCommissionVal(0);
                  }
                }}
              />
              <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
                {profitTypeValue == "percentage" ? <>%</> : <></>}
              </span>
            </div>
            {commission==0 && <p className="text-xs tab:text-sm text-blue-500 col-span-full">If commission of the variant is not given it will take the commission of the product which is {baseCommission||0} and its profit type</p>}
          </div>
          <div className="col-span-full my-2">
            <Separator />
          </div>
          <div className="grid tab:grid-cols-6 min-w-full tab:col-span-3 gap-3 items-center">
            <span className="">{finalPriceText}</span>
            <div className="col-span-2">
              <Input
                className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#636867] ${inputClasses}  `}
                value={CurrencyFormatter(
                  finalTargetPrice + shippingVariantTotalCost
                )}
              />
            </div>
            <span>{profitText}:</span>
            <div className="relative  min-w-full col-span-2">
              <Input
                className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#008767] ${inputClasses} `}
                value={shippingWithoutOrInclude === "withoutShipping" ? CurrencyFormatter(totalProfit  + shippingWithoutShippingCost):CurrencyFormatter(totalProfit) }
// shippingWithoutOrInclude === "withoutShipping" ? CurrencyFormatter(totalProfit  - shippingVariantTotalCost:CurrencyFormatter(totalProfit) 
/>
              <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
