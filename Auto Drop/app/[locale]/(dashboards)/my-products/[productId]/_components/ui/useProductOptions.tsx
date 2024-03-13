import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { Image as ImageChakra, RadioGroup, Radio } from "@chakra-ui/react";

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
  optionChoosenValues,
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
  let ProductOptionsComponent = (
    <>
      <div className="grid grid-cols-1 ml:grid-cols-2 tab:grid-cols-3 gap-2 tab:gap-4 p-1 tab:p-3">
        {optionsSelected?.map((opt: any, optIndex: number) => {
          let { name, checkboxes } = opt;
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
                value={optionChoosenValues[optIndex]}
                onChange={(value: string) => {
                  setOptionChoosenValues((prevValues: string[]) => {
                    let tempValues = [...prevValues];
                    tempValues[optIndex] = value;
                    return tempValues;
                  });
                }}
                className="grid grid-cols-1 ml:grid-cols-2 tab:grid-cols-3 gap-2 tab:gap-4 p-1 tab:p-3 col-span-full"
              >
                {" "}
                {opt?.values?.map((el: any, i: number) => {
                  return (
                    <div
                      key={el.id}
                      className={`${!optImage && `sizeBox w-full p-3`}`}
                    >
                      <Radio
                        value={el.name}
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
                            className="rounded-lg"
                            htmlWidth="250"
                            htmlHeight="500"
                          />
                        )}
                        <p className="text-center mt-auto">{el?.name}</p>
                      </Radio>
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
