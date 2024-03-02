import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { Image as ImageChakra } from "@chakra-ui/react";
export default function ProductOptions({
  options,
  choosenColors,
  choosenSizes,setChoosenColors,setChoosenSizes,setChoosenMaterials,choosenMaterials
}: any) {
  if (!options) {
    return <div>No options Found</div>;
  }



  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-3">
        {options &&
          options.map((option: any) => {
            console.log(option.name);
            console.log(option.name.includes("Color"));
            return (
              <>
                {option.name.includes("Color") ? (
                  <>
                    <span className="text-xl font-semibold col-span-3">
                      {option.name}
                    </span>
                    {option.values.map((el: any, i: number) => {
                      return (
                        <div key={el.id}>
                          <Checkbox
                            isChecked={choosenColors[i]}
                            onChange={() => {
                              setChoosenColors((prev: any) => {
                                let tempArr = [...prev];
                                tempArr[i] = !tempArr[i];
                                return tempArr;
                              });
                            }}
                            className=""
                          >
                            
                        
                            <ImageChakra
                              src={el.sku_image}
                              fallbackSrc="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
                              className="rounded-lg"
                              htmlWidth="250"
                              htmlHeight="500"
                            />
                            <p className="text-center mt-auto">{el.name}</p>
                          </Checkbox>
                        </div>
                      );
                    })}
                    <Separator />
                  </>
                ) : (
                  <></>
                )}
                {option.name.includes("Size") ? (
                  <>
                    <span className="text-xl font-semibold col-span-3"> {option.name}</span>
                    {option.values.map((el: any,i:number) => {
                      return (
                        <div key={el.id}>
                          <div className="sizeBox max-w-[50%]">
                            <Checkbox
                                      isChecked={choosenSizes[i]}
                                onChange={() => {
                                  setChoosenSizes((prev: any) => {
                                    let tempArr = [...prev];
                                    tempArr[i] = !tempArr[i];
                                    return tempArr;
                                  });
                                }}
                              className="w-full flex  justify-between px-3"
                            >
                              <p className="text-center ">{el.name}</p>
                            </Checkbox>
                          </div>
                        </div>
                      );
                    })}
                    <Separator />
                  </>
                ) : (
                  <></>
                )}
                {option.name.includes("Material") ? (
                  <>
                    <span className="text-xl font-semibold col-span-3"> {option.name}</span>
                    {option.values.map((el: any,i:number) => {
                      return (
                        <div key={el.id}>
                          <div className="sizeBox ">
                            <Checkbox
                                      isChecked={choosenMaterials[i]}
                                onChange={() => {
                                  setChoosenMaterials((prev: any) => {
                                    let tempArr = [...prev];
                                    tempArr[i] = !tempArr[i];
                                    return tempArr;
                                  });
                                }}
                              className="w-full flex  justify-between px-3"
                            >
                              <p className="text-center ">{el.name}</p>
                            </Checkbox>
                          </div>
                        </div>
                      );
                    })}
                    <Separator />
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })}
      </div>
    </>
  );
}
