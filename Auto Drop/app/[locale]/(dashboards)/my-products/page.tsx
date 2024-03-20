import { useLocale, useTranslations } from "next-intl";
import React from "react";
import Header from "./components/TableComponents/components/Header";
import TableRenderer from "./components/TableComponents/TableRenderer";
import "./components/styles/styles.css";
export default function MyProducts() {
  const t = useTranslations("myProducts");
  const t2 = useTranslations("myProductsEdit");
const translationMessages = {
  "allCategories":t("allCategories"),
  "selectAll":t("selectAll"),
  "search":t("search")

}
  let HeaderProps = {
    upProducts: t("upProducts"),
    val: t("val"),
    percentage: t("percentage"),
    profitType: t("profitType"),
    title: t("products"),
    number: t2("number"),
  };
  const locale = useLocale();
  return (
    <>
      <Header {...HeaderProps} className="max-w-full" />
      <TableRenderer
        productName={t("prodName")}
        sellPrice={t("sellPrice")}
        category={t("category")}
        platform={t("platform")}
        inventory={t("inv")}
        searchByProd={t("searchByProd")}
        unAvProd={t("unAvProd")}
        translationMessages={translationMessages}
        noShipping={t("noShipping")}
        unLinkedProd={t("unLinkedProd")}
      
        price={t("price")}
        unUpProd={t("unUpProd")}
        locale={locale}
        apply={t("apply")}
      />
    </>
  );
}
