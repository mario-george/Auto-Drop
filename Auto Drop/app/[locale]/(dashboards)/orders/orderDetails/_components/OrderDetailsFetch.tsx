"use client"
import { useSearchParams } from "next/navigation";
import {useEffect,useState} from "react";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import useOrderDetails from "./useOrderDetails";
import useOrderRenderer from "./useOrderRenderer";
import useOrderDetailsNotes from "./ui/useOrderDetailsNotes";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
interface OrderFetchProps {
  translationMessages: { [key: string]: string };
  locale:string
}
export default function OrderFetch({ translationMessages,locale }: OrderFetchProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as string;
  const [sendOrder,setSendOrder] = useState(false)
  const { orderData ,ProductDetails} = useOrderDetails({ orderId ,translationMessages,locale,setSendOrder,sendOrder});
const toast = useToast()
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
  const { OrderDataComponent,orderMemo,shippingCurrIndex ,getCustomerData} = useOrderRenderer({
    orderData,
    translationMessages,locale
  });
useEffect(()=>{
  const orderFetchHandler = async () => {
    try{

      const resPromise =  axiosInstance.post("/orders/sendOrder", {
        order_id: orderId,
        order_memo:orderMemo,CustomerData:getCustomerData(),shippingCurrIndex
      });
      toast.promise(resPromise, {
        success: { title: `Success`, description: `Order has been added successfully` },
        error: { title: 'Fail', description: 'Something went wrong while adding this Order' },
        loading: { title: 'Adding Order', description: 'Please wait' ,position:"bottom-right"},
      })
      const res = await resPromise

      let { data } = res;
      if (res.status >= 200 && res.status < 300) {
        console.log(data);
      } else {
        console.log("Error");
      }
    }catch(err:any){
      console.log(err)
      toast({
        title: "Error",
        description: err?.response?.data?.message??"Something went wrong while adding this Order",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
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
