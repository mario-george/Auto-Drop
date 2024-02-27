import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
export default function ProductOptions({ options }: any) {
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
                    <span className="font-bold col-span-3">Colors</span>
                    {option.values.map((el: any) => {
                      return (
                        <div key={el.id}>
                          <Image
                            src={el.sku_image}
                            alt={el.name}
                            width="250"
                            height="500"
                          />
                          <p className="text-center">{el.name}</p>
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
                    <span className="font-bold col-span-3">Size</span>
                    {option.values.map((el: any) => {
                      return (
                        <div key={el.id}>
                      {/*     <Image
                            src={el.sku_image}
                            alt={el.name}
                            width="250"
                            height="500"
                          /> */}
                          <p className="text-center">{el.name}</p>
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