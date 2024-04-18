"use client"
import { useSearchParams } from "next/navigation";
import {useEffect,useState} from "react";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import useOrderDetails from "./useOrderDetails";
import useOrderRenderer from "./useOrderRenderer";
import useOrderDetailsNotes from "./ui/useOrderDetailsNotes";
interface OrderFetchProps {
  translationMessages: { [key: string]: string };
  locale:string
}
export default function OrderFetch({ translationMessages,locale }: OrderFetchProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as string;
  const [sendOrder,setSendOrder] = useState(false)
  const { orderData ,ProductDetails} = useOrderDetails({ orderId ,translationMessages,locale,setSendOrder,sendOrder});

  let {   shipping:shippingText,
  shippingType,
  withLogo,
  attachALogo,
  shippedWPack,
  packagingBag,
  cartoon,
  attachAnInvoice,
  placeALogo,
  supplierShipping,
  estimatedDuration,
  shippingCompanyName, price,withInvoice,comments:commentsText} = translationMessages
  const { OrderDataComponent,orderMemo } = useOrderRenderer({
    orderData,
    translationMessages,locale
  });
useEffect(()=>{
  const orderFetchHandler = async () => {
    try{

      const res = await axiosInstance.post("/orders/sendOrder", {
        order_id: orderId,
        order_memo:orderMemo
      });
      let { data } = res;
      if (res.status >= 200 && res.status < 300) {
        console.log(data);
      } else {
        console.log("Error");
      }
    }catch(err){
      console.log(err)
    }
  }
if(sendOrder){
 
  orderFetchHandler()
}

},[sendOrder,setSendOrder])
  return (
    <>

    <div className="pageContainer">
      
      
      {ProductDetails}
      {OrderDataComponent}
    </div>
    </>
  );
}
