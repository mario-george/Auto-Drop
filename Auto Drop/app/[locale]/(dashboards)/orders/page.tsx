import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Header from "./components/TableComponents/components/Header";
import TableRenderer from "./components/TableComponents/TableRenderer";
import "./components/styles/styles.css";

export default function Orders() {
  const t = useTranslations("ordersPage");
  const t3 = useTranslations("ordersPagev2");
  const locale = useLocale();
  const translationMessages = {
    orders: t("orders"),
    sender: t("sender"),
    orderNumber: t("orderNumber"),
    orderStatus: t("orderStatus"),
    date: t("date"),
    orderSource: t("orderSource"),
    amount: t("amount"),
    inReview: t3("inReview"),
    created: t3("created"),
    delivered: t3("delivered"),
    InProgress: t3("InProgress"),
    deliveryInProgess: t3("deliveryInProgess"),
  };
  let HeaderProps = {
    translationMessages,
  };
  let TableRendererProps = { translationMessages };
  return (
    <>
      <div className="px-3">
        <Header {...HeaderProps} className="w-fit" />
        <TableRenderer {...TableRendererProps} />
      </div>
    </>
  );
}
