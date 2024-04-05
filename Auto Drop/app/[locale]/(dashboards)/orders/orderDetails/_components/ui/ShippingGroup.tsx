import CurrencyFormatter from "@/app/[locale]/(dashboards)/products/_components/CurrencyFormatter";
import { Radio, RadioGroup } from "@chakra-ui/react";
interface ShippingGroupProps {
    value:string
    setValue : (value:string)=>void
    shipping:any
    nameOfShippingComp:string
    durationToDeliver:string
    price:string

}
const ShippingGroup = ({value,setValue,shipping,durationToDeliver,nameOfShippingComp,price}:ShippingGroupProps)=>{
    return<>    <RadioGroup
    defaultValue="0"
    onChange={setValue}
    value={value}
    className="  grid grid-cols-1 items-center justify-around gap-5 gap-y-5 py-4"
  >
    { 
      shipping?.map((option: any, index: number) => {
        return (
          <Radio value={index.toString()} key={index}>
            <div
              className={` flex  border-gray-500  rounded-lg tab:px-3 tab:py-5 w-fit !text-xs ${
                value == index.toString()
                  ? `shippingCardActive`
                  : `shippingCard`
              } shippingCard gap-y-3`}
              key={"option-" + index}
            >
              <div className="flex flex-col space-y-3 items-center p-1 ">
             
             <div className="flex space-s-3 items-center ">


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
             </div>


             <div className="flex space-s-3 items-center">
             
             
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
             </div>
             <div className="flex space-s-3 items-center">
             <p
                  className={`text-xs tab:text-sm font-bold  ${
                    value == index.toString()
                      ? `text-white`
                      : `text-[#263238]`
                  }  `}
                >
                  {price}{" "}
                </p>
             
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
            </div>
          </Radio>
        );
      })
     }
  </RadioGroup></>
}

export default ShippingGroup