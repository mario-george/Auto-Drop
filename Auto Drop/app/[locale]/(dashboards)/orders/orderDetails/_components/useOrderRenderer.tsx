import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function useOrderRenderer({
  orderData,
  translationMessages,
}: {
  orderData: any;
  translationMessages: { [key: string]: string };
}) {
  let OrderDataComponent = <> </>;
  let { orderDetails } = translationMessages;
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
    OrderDataComponent = <>{orderDetails}</>;
  }

  return { OrderDataComponent };
}
