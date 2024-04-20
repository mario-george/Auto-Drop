import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useOrderDetailsNotes from "./ui/useOrderDetailsNotes";
import useOrderDetailsPayment from "./ui/useOrderDetailsPayment";
import useOrderCustomer, { CustomerDataType } from "./ui/useOrderCustomer";
import useOrderDetailsShipping from "./ui/useOrderDetailsShipping";
import { OrderStatusAfterSend } from './ui/AfterSendOrder/ShippingStatusAfterSend';
import axiosInstance from "../../../_components/shared/AxiosInstance";
import useShippingAfterSend from "./ui/AfterSendOrder/useShippingAfterSend";
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

  let merchantStore = orderData?.storeName ?? "";
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
  shippingCompanyName, price,withInvoice,comments:commentsText,orderStatus,created,inReview,InProgress,deliveryInProgess,delivered,orderNumber:orderNumberText,shipStatus,supplier,Warehouse,client
  , localTracking, internationalTracking, shipComHomePage, underwayNow, contactShipCom, expectedDuration, shippingInfo, websiteOrderNumber, notYet
  } = translationMessages;
  console.log("orderData", orderData);
  const { OrderNotes,orderNotesRef } = useOrderDetailsNotes({
    commentsText,
    merchantStore: merchantStore,
    locale,
  });

  let OrderDetailsPaymentProps = {
    paymentProcess,
    cod,
    total,
    paymentFromWallet,
    payNow,
  };

  let { customer,shipping ,status,order_id} = orderData ?? {};
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

  let phone = mobile ?? ''
let phoneCode = mobile_code ?? ''
  let totalPrice = orderData?.totalPrice
  let shippingPrice = orderData?.amounts?.shipping_cost?.amount 
  let subTotal = orderData?.amounts?.sub_total?.amount 
  if(totalPrice==0){
totalPrice =orderData?.amounts?.total?.amount 
  }
  const { OrderPayment } = useOrderDetailsPayment({
    ...OrderDetailsPaymentProps,
    locale,
    totalPrice:totalPrice||0,
  });

  let editCustomerHandler = async(data:CustomerDataType)=>{
    let res = await axiosInstance.patch("/orders/editCustomer",{...data,order_id})
  
  
  }
  let OrderCustomerProps = {
    firstNameText,
    lastNameText,
    firstName,
    lastName,
    emailText,
    email,
    locale,
    phoneText,
    phone,phoneCode,
    countryText,
    country,
    cityText,
    city,
    districtText,
    district: block ?? "",
    address: street_number ?? '',
    addressText,
    postalCode: postal_code ?? "",
    postalCodeText,
    editCustomerHandler,
    editText,
    deliveryDetails,
    region: "",
    regionText,
  };
  const { OrderCustomer ,CustomerData} = useOrderCustomer({ ...OrderCustomerProps });
let ShippingAfterSendProps = { translationMessages}
  let { ShippingAfterSendComponent } = useShippingAfterSend(ShippingAfterSendProps)
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
    const {OrderShipping,shippingCurrIndex} = useOrderDetailsShipping({...OrderShippingProps}) 
    let OrderStatusAfterSendProps = {
      orderStatus,created,inReview,InProgress,deliveryInProgess,delivered,currStatus:  status,locale,order_id,orderNumberText
    }
  
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
      <OrderStatusAfterSend { 
        ...OrderStatusAfterSendProps  
      }/>
        {OrderNotes}
        {OrderCustomer}
      {OrderShipping}

        {OrderPayment}
      
        {ShippingAfterSendComponent}
      </>
    );
  }

  return { OrderDataComponent, successLoadedOrder,orderNotesRef ,orderMemo:orderNotesRef.current?.value,shippingCurrIndex:shippingCurrIndex?.map((el:string)=>+el),CustomerData};
}
