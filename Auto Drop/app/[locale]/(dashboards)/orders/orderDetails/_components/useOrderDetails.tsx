import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import OrderedProduct, { OrderDetailsHeader } from "./ui/OrderedProduct";

interface OrderDetailsProps {
  orderId: string | number;
  translationMessages: { [key: string]: string };
  locale:string
}
interface OrderData {
  items: any;
}

export default function useOrderDetails({
  orderId,
  translationMessages,locale
}: OrderDetailsProps) {
  const [orderData, setOrderData] = useState<OrderData | null | string>(null);
  let {
    orderDetails,
    displayedPrice: displayedPriceText,
    originalPrice: originalPriceText,
    sku: skuText,
    quantity: quantityText,orderNumber:orderNumberText
  } = translationMessages;
  let ProductDetails = <></>;
  useEffect(() => {
    const orderFetchHandler = async () => {
      if (orderId) {
        const res = await axiosInstance.post("/orders/getOrderDetails", {
          order_id: orderId,
        });
        let { data } = res;
        setOrderData(data.data);
        if (res.status >= 200 && res.status < 300) {
          console.log(data);
        } else {
          console.log("Error");
          setOrderData("fail");
        }
      }
    };
    orderFetchHandler();
  }, [orderId]);
  if (orderData && orderData !== "fail" && typeof orderData === "object") {
    let { items } = orderData;
    let OrderDetailsHeaderProps = {
      orderDetails, locale, orderNumberText, order_id:orderId
    }
    ProductDetails = (
      <>
      <OrderDetailsHeader  {...OrderDetailsHeaderProps}/>
        <div className="container p-3">
          {items.map((item: any) => {
            let {
              sku,
              quantity,
              choosenVariant,
              thumbnail: image,
              product,
            } = item;
            let { name: prodName } = product;
            let { relativeOptions:options, offer_sale_price, price } = choosenVariant;
            let originalPrice = +offer_sale_price;
            let displayedPrice = price.amount;
            options = options.map((option: any) => {
              let {
                property_value_definition_name,
                sku_property_name,
                sku_property_value,
              } = option;
              let valueName = property_value_definition_name
                ? property_value_definition_name
                : sku_property_name;
              let optionName = sku_property_value;
              return { valueName, optionName };
            });
            let OrderedProductProps = {
              image,
              prodName,
              originalPrice,
              originalPriceText,
              displayedPrice,
              displayedPriceText,
              sku,
              skuText,
              quantityText,
              quantity,options
            };
            return <OrderedProduct {...OrderedProductProps} />;
          })}
        </div>
      </>
    );
  }
  return { orderData, ProductDetails };
}
