"use client"
import { useSearchParams } from "next/navigation";
import useEffect from "react";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import useState from "react";
import useOrderDetails from "./useOrderDetails";
import useOrderRenderer from "./useOrderRenderer";
import useOrderDetailsShipping from "./ui/useOrderDetailsShipping";
import useOrderDetailsNotes from "./ui/useOrderDetailsNotes";
interface OrderFetchProps {
  translationMessages: { [key: string]: string };
  locale:string
}
export default function OrderFetch({ translationMessages,locale }: OrderFetchProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as string;
  const { orderData ,ProductDetails} = useOrderDetails({ orderId ,translationMessages,locale});

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
  const { OrderDataComponent } = useOrderRenderer({
    orderData,
    translationMessages,locale,commentsText
  });
  let OrderShippingProps = {
  shippingText,
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
  shippingCompanyName,
  locale,price,withInvoice
}
  const {OrderShipping} = useOrderDetailsShipping({...OrderShippingProps}) 
  return (
    <>

    <div className="pageContainer">
      
      
      {ProductDetails}
      {OrderShipping}
      {OrderDataComponent}
    </div>
    </>
  );
}
