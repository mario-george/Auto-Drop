import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";

interface OrderDetailsProps {
  orderId: string | number;
}
interface OrderData{



}

export default function useOrderDetails({ orderId }: OrderDetailsProps) {
  const [orderData, setOrderData] = useState<OrderData |string |OrderData[]>([]);

  useEffect(() => {
    const orderFetchHandler = async () => {
      if (orderId) {
        const res = await axiosInstance.post("/orders/getOrderDetails" , {order_id:orderId});
        let { data } = res;
        setOrderData(data);
        if (res.status >= 200 && res.status < 300) {
          console.log(data);
        } else {
          console.log("Error");
          setOrderData('fail')
        }
      }
    };
    orderFetchHandler();
  }, [orderId]);
  return { orderData };
}
