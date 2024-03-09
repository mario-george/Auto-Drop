import { useMemo, useState, useEffect } from "react";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function useProductShipping({
  shipping,
  nameOfShippingComp,
  shippingText,
  durationToDeliver,
  shippingWithoutOrInclude,
}: any) {
  const [value, setValue] = useState("0");
  const [shippingTotalCost, setShippingTotalCost] = useState(0);
  useEffect(() => {
    if (shippingWithoutOrInclude == "shippingIncluded") {
      let price = shipping?.[+value]?.freight?.cent / 100;
      if (price == 0||price ) {
        setShippingTotalCost(price);
      }
    } else {
      setShippingTotalCost(0);
    }
  }, [shippingWithoutOrInclude, value, shipping]);
  let ProductShippingComponent = (
    <>
      {shipping?.length ? (
        <div className="space-y-4 min-w-full  ">
          <div>
            <p className="text-lg font-semibold text-content">{shippingText}</p>
            <RadioGroup
              defaultValue="0"
              onChange={setValue}
              value={value}
              className="min-w-full  grid grid-cols-1 items-center justify-around gap-5 gap-y-5 py-4"
            >
              {shipping?.map((option: any, index: number) => {
                return (
                  <Radio value={index.toString()} key={index}>
                    <div
                      className={` flex  border-gray-500  rounded-lg tab:px-3 tab:py-5 !text-xs ${
                        value == index.toString()
                          ? `shippingCardActive`
                          : `shippingCard`
                      } shippingCard gap-y-3`}
                      key={"option-" + index}
                    >
                      <div className="flex flex-col space-y-3 tab:space-y-0 tab:flex-row items-center space-s-2 px-4 py-2 ">
                        <p
                          className={`text-xs tab:text-sm font-bold  ${
                            value == index.toString()
                              ? `text-white`
                              : `text-[#263238]`
                          }  `}
                        >
                          {nameOfShippingComp}{" "}
                        </p>
                        <p
                          className={`text-xs tab:text-sm text-center ${
                            value == index.toString()
                              ? `text-[#CCE0DB]`
                              : `text-[#263238]`
                          }   `}
                        >
                          {" "}
                          {option.shipping_method || option.service_name}
                        </p>
                        <span
                          className={`text-xs ${
                            value == index.toString()
                              ? `text-white`
                              : `text-[#263238]`
                          } text-xs tab:text-sm font-bold text-center `}
                        >
                          {durationToDeliver}
                        </span>
                        <span
                          className={` text-xs tab:text-sm ${
                            value == index.toString()
                              ? `text-[#CCE0DB]`
                              : `text-[#263238]`
                          }`}
                        >
                          {option.estimated_delivery_time}
                        </span>

                        <p
                          className={`text-xs tab:text-lg font-bold  tab:pr-2 ${
                            value == index.toString()
                              ? `text-[#F4B1AC]`
                              : `text-[#C1121F]`
                          }`}
                        >
                          {CurrencyFormatter(
                            option.freight.amount || option.freight.cent / 100
                          )}
                        </p>
                      </div>
                    </div>
                  </Radio>
                );
              })}
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
  return { ProductShippingComponent, value, shippingTotalCost };
}
