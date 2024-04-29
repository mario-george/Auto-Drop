import { useLocale, useTranslations } from "next-intl";
import React from "react";

import ProductsRenderer from "./_components/ProductsRenderer";
import MotionWrapper from "../_components/shared/MotionWrapper";

import './_components/styles/styles.css'
import ProductsProtector from './_components/ProductsProtector';
export default function Page() {
  const t = useTranslations("productsPage");
  const locale = useLocale();
let ProductsRendererProps = {
  allProducts:t("allProducts"),
  smartDevices:t("smartDevices"),
  electronics:t("electronics"),
  clothes:t("clothes"),
  accessories:t("accessories"),
  perfumes:t("perfumes"),
  categories:t("categories"),
  searchByProd:t("searchByProd"),
  shops:t("shops"),
  decor:t("decor"),
  sportsSupplies:t("sportsSupplies"),
  stationary:t("stationary"),
  cosmeticProducts:t("cosmeticProducts"),locale

  
  
}
  return (
    <>
      <MotionWrapper locale={locale}>
        <div className="px-3 productsContainer">
       {/*    <ProductsRenderer
           {...ProductsRendererProps}
          /> */}
          
          <ProductsProtector
           {...ProductsRendererProps}
          
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
