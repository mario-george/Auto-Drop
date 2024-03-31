import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import OrderFetch from './_components/OrderDetailsFetch';

export default function OrderDetails(){
    const locale = useLocale()
    const t  = useTranslations("orderDetailsPage")
    const translationMessages = {
        "orderDetails":t("orderDetails"),
        "quantity":t("quantity"),
        "deliveryDetails":t("deliveryDetails"),
        "edit":t("edit"),
        "sendOrder":t("sendOrder"),
        "originalPrice":t("originalPrice"),
        "size":t("size"),
        "sku":t("sku"),
        "color":t("color"),
        "comments":t("comments"),
        "displayedPrice":t("displayedPrice"),
        "save":t("save"),
        "paymentProcess":t("paymentProcess"),
        "orderNumber":t("orderNumber"),
        "firstName":t("firstName"),
        "secondName":t("secondName"),
        "phone":t("phone"),
        "region":t("region"),
        "postalCode":t("postalCode"),
        "street":t("street"),
        "district":t("district"),
        "city":t("city"),
        "country":t("country"),
        "email":t("email"),
        "payNow":t("payNow"),
        "platOrderNumber":t("platOrderNumber"),
        "paymentFromWallet":t("paymentFromWallet"),
        "total":t("total"),
        "cod":t("cod"),
        "shipping":t("shipping"),
        "attachAnInvoice":t("attachAnInvoice"),
        "placeALogo":t("placeALogo"),
        "shippedWPack":t("shippedWPack"),
        "shippingType":t("shippingType"),
        "withLogo":t("withLogo"),
        "packagingBag":t("packagingBag"),
        "cartoon":t("cartoon"),
        "supplierShipping":t("supplierShipping")

    }
let OrderFetchProps ={translationMessages}
    return(
        <div>
            <OrderFetch {...OrderFetchProps }/>
            <h1>Order Details</h1>
        </div>
    )
}