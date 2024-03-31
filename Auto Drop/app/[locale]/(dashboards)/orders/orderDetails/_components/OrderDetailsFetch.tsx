"use client"
import { useSearchParams } from "next/navigation";
import useEffect from "react";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import useState from "react";
import useOrderDetails from "./useOrderDetails";
import useOrderRenderer from "./useOrderRenderer";
interface OrderFetchProps {
  translationMessages: { [key: string]: string };
}
export default function OrderFetch({ translationMessages }: OrderFetchProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as string;
  const { orderData } = useOrderDetails({ orderId });
  const { OrderDataComponent } = useOrderRenderer({
    orderData,
    translationMessages,
  });
  return (
    <>
      OrderFetch
      {OrderDataComponent}
    </>
  );
}
