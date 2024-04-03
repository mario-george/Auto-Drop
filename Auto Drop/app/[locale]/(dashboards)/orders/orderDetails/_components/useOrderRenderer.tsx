import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useOrderDetailsNotes from "./ui/useOrderDetailsNotes";
import useOrderDetailsPayment from "./ui/useOrderDetailsPayment";

export default function useOrderRenderer({
  orderData,
  translationMessages,locale,commentsText
}: {
  orderData: any;
  translationMessages: { [key: string]: string };
  locale:string
  commentsText:string
}) {
  const [successLoadedOrder,setSuccessLoadedOrder] = useState(false)
  let merchantStore = orderData?.urls?.customer ?? ""
  let { paymentProcess,cod,total,paymentFromWallet,payNow, } = translationMessages;
  console.log("orderData",orderData)
  const {OrderNotes} = useOrderDetailsNotes({commentsText,merchantStore:orderData?.customer?.urls?.customer ?? "",locale})
  let OrderDetailsPaymentProps = {
    paymentProcess,cod,total,paymentFromWallet,payNow, 
  }
   const {OrderPayment} = useOrderDetailsPayment({...OrderDetailsPaymentProps,locale,totalPrice:orderData?.totalPrice||0})
 useEffect(()=>{
  if(!successLoadedOrder && typeof orderData == "object"){

    setSuccessLoadedOrder(true)
  }
 },[orderData])
  let OrderDataComponent = <> </>;
  if (orderData == "fail") {
    OrderDataComponent = <>Order not found</>;
  } else if (!orderData) {
    OrderDataComponent = (
      <div className="flex space-s-3 items-center text-green-500">
        <Spinner />
        <div className="dark:text-white">Fetching Order...</div>
      </div>
    );
  } else if (orderData) {
   
    OrderDataComponent = <>
    {OrderNotes}
    {OrderPayment}</>;
  }

  return { OrderDataComponent ,successLoadedOrder};
}
