import { useMemo, useState } from "react";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function ProductShipping({
  shipping,
  nameOfShippingComp,
  shippingText,
  durationToDeliver,
}: any) {
  const [value, setValue] = useState("1");

  return (
    <>
      {shipping?.length ? (
        <div className="space-y-4 min-w-full ">
          <p className="text-lg font-semibold text-content">{shippingText}</p>
          <div className="min-w-full grid grid-cols-1 items-center justify-around gap-y-5 px-2 py-4">
            <RadioGroup defaultValue="1" onChange={setValue} value={value}>
              <Stack direction="row">
                {shipping?.map((option: any, index: number) => {
                  return (
                    <Radio value={index.toString()} key={index}>
                      <div
                        // style={{ border: "2px solid #d1c2c2" }}
                        className={` flex  flex-col border-gray-500  rounded-lg tab:px-3 tab:py-5 !text-xs ${
                          value == index.toString()
                            ? `shippingCardActive`
                            : `shippingCard`
                        } shippingCard gap-y-3`}
                        key={"option-" + index}
                      >
                        <div className="flex w-full justify-between items-center px-2 pt-2  ">
                          <div className="flex items-center gap-x-2">
                            <p className={`text-xs tab:text-sm font-bold  ${value == index.toString() ? `text-white`:`text-[#263238]` }  whitespace-nowrap`}>{nameOfShippingComp} </p>
                            <p className={`text-xs tab:text-sm ${value == index.toString() ? `text-[#CCE0DB]`:`text-[#263238]` }  whitespace-nowrap `}>
                              {" "}

                              {option.shipping_method || option.service_name}
                            </p>
                            <span className={`text-xs ${value == index.toString() ? `text-white`:`text-[#263238]` } text-xs tab:text-sm font-bold whitespace-nowrap`}>{durationToDeliver}</span>
                            <span className={` text-xs tab:text-sm ${value == index.toString() ? `text-[#CCE0DB]`:`text-[#263238]` }`}>
                              {option.estimated_delivery_time}
                            </span>
                            {/*    <p className="text-xs px-2">
                        </p> */}
                            <p className={`text-xs tab:text-lg font-bold  tab:pr-2 ${value == index.toString() ? `text-[#F4B1AC]`:`text-[#C1121F]` }`}>
                              {CurrencyFormatter(
                                option.freight.amount ||
                                  option.freight.cent / 100
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-red-700">
          Product Shipping Not Avaliable
        </div>
      )}
    </>
  );
}
