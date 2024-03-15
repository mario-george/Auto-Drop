import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { Image as ImageChakra, RadioGroup, Radio } from "@chakra-ui/react";
import DeleteOptionDialog from "./features/DeleteOptionDialog";

export default function useProductOptions({
  options,
  choosenColors,
  choosenSizes,
  setChoosenColors,
  setChoosenSizes,
  setChoosenMaterials,
  choosenMaterials,
  optionsSelected,
  setOptionsSelected,
  optionCheckHandler,
  selectedCheckboxes,
  checkboxHandler,
  checkboxesSelected,
  setOptionChoosenValues,
  optionChoosenValues,setVariantsDetails,setProductOptions
}: any) {
  /*   if (!options) {
    return <div>No options Found</div>;
  } */
  console.log("optionChoosenValues", optionChoosenValues);

  if (!options) {
    return {
      ProductOptionsComponent: <div>No options Found</div>,
      optionChoosenValues,
    };
  }
  console.log("optionChoosenValues", optionChoosenValues);
  const removeOptionHandler = (optIndex:number,element:any)=>{
    // VariantExtractor()
    setProductOptions((prevOptions:any)=>{
console.log("prevOptions",prevOptions)
console.log("optIndex",optIndex)
let temp = [...prevOptions]

console.log("temp",temp)

temp[optIndex].values = temp[optIndex].values.filter((ValueElement:any)=>{
  console.log("element",element)
  console.log("ValueElement",ValueElement)
  return element.sku !==ValueElement.sku 
})
return temp
    })
    setVariantsDetails((prevVariants:any)=>{
let tempVariants = prevVariants.filter((variant:any)=>{
let relativeOption = variant.relativeOptions[optIndex]
let {property_value_id,sku_property_id} = relativeOption
if (`${sku_property_id}:${property_value_id}` == element.sku){
  return false
}else{
  return true
}
})
return tempVariants
    })
  }
  // console.log("optionsSelected",optionsSelected)

  let ProductOptionsComponent = (
    <>
      <div className="grid grid-cols-1 ml:grid-cols-2 tab:grid-cols-3 gap-2 tab:gap-4 p-1 tab:p-3">
        {options?.map((opt: any, optIndex: number) => {
          let { name } = opt;
          if (!name) {
            return <></>;
          }
          let optImage: boolean =
            opt?.name?.includes("color") || opt?.name?.includes("Color");
          return (
            <>
              <span className="text-xl font-semibold ml:col-span-2 tab:col-span-3">
                {opt?.name}
              </span>
              <RadioGroup
                value={optionChoosenValues[optIndex].property_id}
                onChange={(value: string) => {
                  setOptionChoosenValues((prevValues: any) => {
                    let tempValues = [...prevValues];
let elementFound = opt?.values?.find((el: any)=>el.property_id == value);
let {property_id, name} = elementFound; 
                    tempValues[optIndex] = {name,property_id};
                    return tempValues;
                  });
                }}
                className="grid grid-cols-1 ml:grid-cols-2 tab:grid-cols-3 gap-2 tab:gap-4 p-1 tab:p-3 col-span-full "
              >
                {" "}
                {opt?.values?.map((el: any, index: number) => {
                  return (
                    <div
                      key={el.id}
                      className={`${!optImage ? `sizeBox w-full p-3`:``}`}
                    >
              <div className="relative">

                      <Radio
                        value={el.property_id}
                        /*    onChange={() => {
                        checkboxHandler(
                          optIndex,
                          i,
                          checkboxesSelected?.[optIndex]?.[i]
                        );
                      }} */
                        /*  className={`${
                        !optImage && `w-full flex  justify-between px-3`
                      }`} */
                      >
                        {optImage && (
                          <ImageChakra
                            src={el.sku_image}
                            fallbackSrc="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
                            className="rounded-lg "
                            htmlWidth="250"
                            htmlHeight="500"
                          />
                        )}
                        <p className="text-center mt-auto">{el?.name}</p>
                      </Radio>
             
             <DeleteOptionDialog deleteOptionHandler={removeOptionHandler} element={el} optIndex={optIndex} index={index} messageHeader="Do you want to delete this option" messageDescription={`you won't be able to retrieve this option again (${el.name}).`}>
                <div className={` ${optImage ? `absolute -top-2 left-0` :`absolute -top-6 -left-6`}`}>
                <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.6133"
                          cy="12.3652"
                          r="10"
                          fill="#2E464F"
                          stroke="white"
                        />
                        <line
                          x1="7.4863"
                          y1="8.85141"
                          x2="15.4336"
                          y2="15.481"
                          stroke="white"
                        />
                        <line
                          x1="14.3659"
                          y1="8.1459"
                          x2="8.95408"
                          y2="16.4352"
                          stroke="white"
                        />
                      </svg>
                </div>
             </DeleteOptionDialog>

              </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </>
          );
        })}
      </div>
    </>
  );

  return { ProductOptionsComponent, optionChoosenValues: [] };
}