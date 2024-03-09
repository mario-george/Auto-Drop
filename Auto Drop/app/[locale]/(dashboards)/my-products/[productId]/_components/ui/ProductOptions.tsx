import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { Image as ImageChakra } from "@chakra-ui/react";
export default function ProductOptions({
  options,
  choosenColors,
  choosenSizes,
  setChoosenColors,
  setChoosenSizes,
  setChoosenMaterials,
  choosenMaterials, optionsSelected, setOptionsSelected, optionCheckHandler,selectedCheckboxes,checkboxHandler,checkboxesSelected

}: any) {
  if (!options) {
    return <div>No options Found</div>;
  }
console.log("optionsSelected",optionsSelected)
  return (
    <>
      <div className="grid grid-cols-1 ml:grid-cols-2 tab:grid-cols-3 gap-2 tab:gap-4 p-1 tab:p-3">

      {optionsSelected?.map((opt:any,optIndex:number)=>{
let {name,checkboxes} = opt
let optImage :boolean = opt.name.includes('color') || opt.name.includes('Color')
console.log("checkboxesSelected",checkboxesSelected)
return <>
   <span className="text-xl font-semibold ml:col-span-2 tab:col-span-3">
                      {opt.name}
                    </span>
                    {opt.values.map((el: any, i: number) => {
                      console.log('checkboxesSelected?.[optIndex]?.[i]',checkboxesSelected?.[optIndex]?.[i])
                      return (
                        <div key={el.id} className={`${!optImage && `sizeBox w-fit`}`} >
                          <Checkbox
                         
                            isChecked={checkboxesSelected?.[optIndex]?.[i]}
                            onChange={() => { 
                              // optionCheckHandler(optIndex,i)
                          /*     setOptionsSelected((prev: any) => {
                                const updatedOptions = [...prev];
                                updatedOptions[optIndex].checkboxes[i] =
                                  !updatedOptions[optIndex].checkboxes[i];
                                console.log("updatedOptions", updatedOptions);
                                return updatedOptions;
                              }); */

                              checkboxHandler(optIndex,i,checkboxesSelected?.[optIndex]?.[i])

                              
                            }}
                            className={`${ !optImage && `w-full flex  justify-between px-3`}`}
                          >
           {         optImage &&        <ImageChakra
                              src={el.sku_image}
                              fallbackSrc="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
                              className="rounded-lg"
                              htmlWidth="250"
                              htmlHeight="500"
                            />}
                            <p className="text-center mt-auto">{el.name}</p>
                          </Checkbox>
                        </div>
                      );
                    })}
                    </>
                         
      })}
        {options &&
          options.map((option: any) => {
            return (
              <>
                {option?.name?.includes("Color") ? (
                  <>
                    <span className="text-xl font-semibold ml:col-span-2 tab:col-span-3">
                      {option.name}
                    </span>
                    {option.values.map((el: any, i: number) => {
                      return (
                        <div key={el.id} >
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
                {option?.name?.includes("Size") ? (
                  <>
                    <span className="text-xl font-semibold ml:col-span-2 tab:col-span-3">
                      {" "}
                      {option.name}
                    </span>
                    {option.values.map((el: any, i: number) => {
                      return (
                        <div key={el.id}>
                          <div className="sizeBox w-fit">
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
                {option?.name?.includes("Material") ? (
                  <>
                    <span className="text-xl font-semibold col-span-3">
                      {" "}
                      {option.name}
                    </span>
                    {option.values.map((el: any, i: number) => {
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
