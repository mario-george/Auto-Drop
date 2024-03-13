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
  shippingChoosenValue,
  profitType,
  variantsDetails,
  percentage,
  number,
  valueText,
  optionChoosenValues,
  setCurrentlySelectedVariant,
  currentlySelectedVariant,
}: any) {
  console.log("shippingChoosenValue", shippingChoosenValue);
  const [value, setValue] = React.useState(shippingChoosenValue);
  console.log("optionChoosenValues", optionChoosenValues);
  let {
    id,
    sku_price: originalPriceValue,
    offer_sale_price: price,
    sku_available_stock: productQuantityValue,
    shippingChoice,
    profitTypeValue,
    commission,
  } = currentlySelectedVariant;
  console.log("variantsDetails", variantsDetails);
  function VariantExtractor() {
    if (!variantsDetails) {
      return;
    }
    let currentVariantInfo: any = [];

    let choosenOptionsFullDetails: any = [];
    if (optionChoosenValues) {
      optionChoosenValues.forEach((element: any, index: number) => {
        for (let i = 0; i < variantsDetails.length; i++) {
          if (variantsDetails?.[i]?.relativeOptions?.[index]) {
            let valueToBeChecked =
              variantsDetails?.[i]?.relativeOptions?.[index];
            if (
              valueToBeChecked?.property_value_definition_name &&
              valueToBeChecked?.property_value_definition_name == element
            ) {
              choosenOptionsFullDetails.push(valueToBeChecked);
              break;
            }

            if (valueToBeChecked.sku_property_value == element) {
              choosenOptionsFullDetails.push(valueToBeChecked);
              break;
            }
          }
        }
      });
    }
    let currentVariantIds = [];
    if (choosenOptionsFullDetails.length !== 0) {
      choosenOptionsFullDetails.forEach((option: any) => {
        let { sku_property_id, property_value_id } = option;
        let currentVariantId = `${sku_property_id}:${property_value_id}`;
        /*    if(!currentVariantId){
       currentVariantId= `${sku_property_id}:${property_value_id}`
    }    else{
       currentVariantId+= `${sku_property_id}:${property_value_id}`
    } */
        currentVariantIds.push(currentVariantId);
      });
    }
    // let currentVariantInfo
    if (currentVariantIds.length !== 0) {
      if (variantsDetails.length == 1) {
        currentVariantInfo.push(variantsDetails[0]);
      } else {
        variantsDetails.forEach((variant: any) => {
          let match = true;
          currentVariantIds.forEach((key: string) => {
            if (!variant.sku_code.includes(key)) {
              match = false;
            }
          });
          if (match) {
            console.log();
            currentVariantInfo.push(variant);
          }
        });
      }
    }
    return currentVariantInfo;
  }
  let foundElement = VariantExtractor();
  if (foundElement?.length > 0) {
    setCurrentlySelectedVariant(foundElement[0]);
  }
  console.log("foundElement", foundElement);
  // console.log("currentVariant",currentVariant)
  // console.log("choosenOptionsFullDetails",choosenOptionsFullDetails)
  console.log("variantsDetails", variantsDetails);
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
  let product = null;
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
            {productQuantityValue} {currentPiece}
          </span>
        </div>
        <Separator />
        <div className="grid grid-cols-3  tab:gap-4   my-4 min-w-full gap-6 ">
          <span className="">{originalPrice}:</span>
          <Input
            className={`shadow-sm text-sm md:text-base col-span-2 bg-[#edf5f9] ${inputClasses} `}
            value={CurrencyFormatter(price)}
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
          <div className="grid grid-cols-6 min-w-full col-span-3 gap-3 items-center">
            <span className="">{profitType}</span>
            <div className="col-span-2">{SelectComponent}</div>
            <span>{valueText}:</span>
            {/* <div className=" flex items-center space-s-3  "> */}
            <div className="relative mt-auto min-w-full col-span-2">
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
            {/* </div> */}
          </div>
          <div className="grid grid-cols-6 min-w-full col-span-3 gap-3 items-center">
            <span className="">{finalPriceText}</span>
            <div className="col-span-2">{SelectComponent}</div>
            <span>{profitText}:</span>
            {/* <div className=" flex items-center space-s-3  "> */}
            <div className="relative mt-auto min-w-full col-span-2">
              <Input
                className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#636867] ${inputClasses} `}
                value={CurrencyFormatter(20)}
              />
              <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
                {/* {profitChoosenType == "percentage" ? <>%</> : <></>} */}
              </span>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
