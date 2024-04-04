"use client"
import { useSearchParams } from "next/navigation";
import useEffect from "react";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import useState from "react";
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
    translationMessages,locale
  });

  return (
    <>

    <div className="pageContainer">
      
      
      {ProductDetails}
      {OrderDataComponent}
    </div>
    </>
  );
}
