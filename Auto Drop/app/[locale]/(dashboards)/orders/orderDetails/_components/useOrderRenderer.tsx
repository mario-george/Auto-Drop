import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useOrderDetailsNotes from "./ui/useOrderDetailsNotes";
import useOrderDetailsPayment from "./ui/useOrderDetailsPayment";
import useOrderCustomer from "./ui/useOrderCustomer";
import useOrderDetailsShipping from "./ui/useOrderDetailsShipping";

export default function useOrderRenderer({
  orderData,
  translationMessages,
  locale,
}: {
  orderData: any;
  translationMessages: { [key: string]: string };
  locale: string;
}) {
  const [successLoadedOrder, setSuccessLoadedOrder] = useState(false);
  let merchantStore = orderData?.urls?.customer ?? "";
  let {
    paymentProcess,
    cod,
    total,
    paymentFromWallet,
    payNow,
    firstName: firstNameText,
    secondName: lastNameText,

    email: emailText,
    city: cityText,
    country: countryText,
    phone: phoneText,
    district: districtText,
    street: addressText,
    postalCode: postalCodeText,
    edit: editText,
    region: regionText,
    deliveryDetails,


    shipping:shippingText,
  shippingType,
  withLogo,
  attachALogo,
  shippedWPack,
  packagingBag,
  cartoon,
  attachAnInvoice,
  placeALogo,
  supplierShipping,
  durationToDeliver:estimatedDuration,
  shippingCompanyName, price,withInvoice,comments:commentsText
  } = translationMessages;
  console.log("orderData", orderData);
  const { OrderNotes } = useOrderDetailsNotes({
    commentsText,
    merchantStore: orderData?.customer?.urls?.customer ?? "",
    locale,
  });
  let OrderDetailsPaymentProps = {
    paymentProcess,
    cod,
    total,
    paymentFromWallet,
    payNow,
  };

  let { customer,shipping } = orderData ?? {};
  let {address} = shipping ?? {}
  let {block , city,country,shipping_address,street_number,postal_code} = address ?? {}
  console.log("postal_code",postal_code)
  let {
    first_name: firstName,
    last_name: lastName,
    mobile,
    mobile_code,
    // country,
    email,
  } = customer ?? {};
  // let phone = mobile_code ?? "" + " " + mobile?.toString() ?? "";

  let phone = `${mobile_code ?? ''} ${mobile ?? ''}`
  const { OrderPayment } = useOrderDetailsPayment({
    ...OrderDetailsPaymentProps,
    locale,
    totalPrice: orderData?.totalPrice || 0,
  });
  let OrderCustomerProps = {
    firstNameText,
    lastNameText,
    firstName,
    lastName,
    emailText,
    email,
    locale,
    phoneText,
    phone,
    countryText,
    country,
    cityText,
    city,
    districtText,
    district: block ?? "",
    address: shipping_address ?? '',
    addressText,
    postalCode: postal_code ?? "",
    postalCodeText,
    editCustomerHandler: () => {},
    editText,
    deliveryDetails,
    region: "",
    regionText,
  };
  const { OrderCustomer } = useOrderCustomer({ ...OrderCustomerProps });

  
  let [shippingItems,setShippingItems ]= useState([])
  useEffect(()=>{
    if(typeof orderData == "object" ){
  let shippingArray = orderData?.items?.map((item: any) => item.product.shipping);
  setShippingItems(shippingArray)
}

  },[orderData])
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
    locale,price,withInvoice,shippingInfo:shippingItems??[],
  }
    const {OrderShipping} = useOrderDetailsShipping({...OrderShippingProps}) 
  useEffect(() => {
    if (!successLoadedOrder && typeof orderData == "object") {
      setSuccessLoadedOrder(true);
    }
  }, [orderData]);
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
    OrderDataComponent = (
      <>
        {OrderNotes}
        {OrderCustomer}
      {OrderShipping}

        {OrderPayment}
      </>
    );
  }

  return { OrderDataComponent, successLoadedOrder };
}
