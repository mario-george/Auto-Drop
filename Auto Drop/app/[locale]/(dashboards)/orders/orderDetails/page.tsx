import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import OrderDetailsFetch from "./_components/OrderDetailsFetch";

export default function OrderDetails() {
  const locale = useLocale();
  const t = useTranslations("orderDetailsPage");
  const t2 = useTranslations("myProductsEdit");
  const t3 = useTranslations("ordersPagev2");

  const translationMessages = {
    orderDetails: t("orderDetails"),
    quantity: t("quantity"),
    deliveryDetails: t("deliveryDetails"),
    edit: t("edit"),
    sendOrder: t("sendOrder"),
    originalPrice: t("originalPrice"),
    size: t("size"),
    sku: t("sku"),
    color: t("color"),
    comments: t("comments"),
    displayedPrice: t("displayedPrice"),
    save: t("save"),
    paymentProcess: t("paymentProcess"),
    orderNumber: t("orderNumber"),
    firstName: t("firstName"),
    secondName: t("secondName"),
    phone: t("phone"),
    region: t("region"),
    postalCode: t("postalCode"),
    street: t("street"),
    district: t("district"),
    city: t("city"),
    country: t("country"),
    email: t("email"),
    payNow: t("payNow"),
    platOrderNumber: t("platOrderNumber"),
    paymentFromWallet: t("paymentFromWallet"),
    total: t("total"),
    cod: t("cod"),
    shipping: t("shipping"),
    attachAnInvoice: t("attachAnInvoice"),
    placeALogo: t("placeALogo"),
    shippedWPack: t("shippedWPack"),
    shippingType: t("shippingType"),
    withLogo: t("withLogo"),
    withInvoice: t("withInvoice"),
    packagingBag: t("packagingBag"),
    cartoon: t("cartoon"),
    supplierShipping: t("supplierShipping"),
    price: t2("price"),

    durationToDeliver: t2("durationToDeliver"),
    shippingCompanyName: t2("nameOfShippingComp"),
    attachALogo: t("attachALogo"),


    orderStatus: t3("orderStatus"),
    inReview: t3("inReview"),
    created: t3("created"),
    delivered: t3("delivered"),
    InProgress: t3("InProgress"),
    deliveryInProgess: t3("deliveryInProgess"),
    Warehouse : t3("Warehouse"),
    client : t3("client"),
    supplier : t3("supplier"),

    shipStatus: t3("shipStatus"),
    websiteOrderNumber : t3("websiteOrderNumber"),
    contactShipCom : t3("contactShipCom"),
    shipComHomePage : t3("shipComHomePage"),
    internationalTracking : t3("internationalTracking"),
    localTracking : t3("localTracking"),
    notYet : t3("notYet"),
    expectedDuration : t3("expectedDuration"),
    underwayNow : t3("underwayNow"),
    shippingInfo : t3("shippingInfo"),
    leavingClassCenter : t3("leavingClassCenter"),  
         delByLocal       : t3("delByLocal"),
         comCustomsCl    : t3("comCustomsCl"),
         customClIm     : t3("customClIm"),
         access     : t3("access"),
         leave    : t3("leave"),
         leavingCustoms  : t3("leavingCustoms"),
         aliexpress  : t3("aliexpress"),

         days : t3("days"),
  
      
  };
  let OrderDetailsFetchProps = { translationMessages, locale };
  return (
    <div className="px-3">
      <OrderDetailsFetch {...OrderDetailsFetchProps} />
    </div>
  );
}
