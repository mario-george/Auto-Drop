import { useLocale, useTranslations } from "next-intl";
import React from "react";
import Header from "./components/TableComponents/components/Header";
import TableRenderer from "./components/TableComponents/TableRenderer";
export default function Page() {
  const t = useTranslations("myProducts");
  const locale = useLocale();
  return (
    <>
      <Header title={t("products")} />
      <TableRenderer
        productName={t("prodName")}
        sellPrice={t("sellPrice")}
        category={t("category")}
        platform={t("platform")}
        inventory={t("inv")}
        searchByProd={t("searchByProd")}
        unAvProd={t("unAvProd")}
        price={t("price")}
        unUpProd={t("unUpProd")}
        locale={locale}
        apply={t("apply")}
      />
    </>
  );
}
