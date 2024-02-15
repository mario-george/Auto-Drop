import { useLocale, useTranslations } from "next-intl";
import React from "react";

import ProductsRenderer from "./_components/ProductsRenderer";
import MotionWrapper from "../_components/shared/MotionWrapper";
export default function Page() {
  const t = useTranslations("productsPage");
  const locale = useLocale();
  return (
    <>
      <MotionWrapper locale={locale}>
        <div className="px-3">
          <ProductsRenderer
            locale={locale}
            categories={t("categories")}
            allProducts={t("allProducts")}
            searchByProd={t("searchByProd")}
            shops={t("shops")}
          />
        </div>
      </MotionWrapper>
      {/*   <Header title={t("products")} />
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
      /> */}
    </>
  );
}
