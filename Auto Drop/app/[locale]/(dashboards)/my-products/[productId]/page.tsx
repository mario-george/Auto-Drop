import axiosInstance from "../../_components/shared/AxiosInstance";
import ProductEditHeader from "./_components/ProductEditHeader";
import MotionWrapperExit from "../../_components/shared/MotionWrapperExit";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductEditForm from "./_components/ProductEditForm";
import ProductEditRenderer from "./_components/ProductEditRenderer";

export default function ProductEdit(props: { params: { productId: string } }) {
  const locale = useLocale();
  const t = useTranslations("myProductsEdit");

  return (
    <>
      <ProductEditRenderer
        {...props}
        locale={locale}
        with={t("with")}
        to={t("to")}
        sku={t("sku")}
        price={t("price")}
        description={t("description")}
        prodNameTitle={t("prodNameTitle")}
        prodNameTitlePlaceholder={t("prodNameTitlePlaceholder")}
        invalidProdName={t("invalidProdName")}
        invalidSEODescription={t("invalidSEODescription")}
        invalidSEOTitle={t("invalidSEOTitle")}
        invalidDescription={t("invalidDescription")}
        availableQuantity={t("availableQuantity")}
        params={props.params}
        currentPiece={t("currentPiece")}
        piecePrice={t("piecePrice")}
        originalPrice={t("originalPrice")}
        shippingIncluded={t("shippingIncluded")}
        withoutShipping={t("withoutShipping")}
        profitType={t("profitType")}
        editedPrice={t("editedPrice")}
        tag={t("tag")}
        category={t("category")}
        SEOTitle={t("SEOTitle")}
        SEODescription={t("SEODescription")}
        color={t("color")}
        size={t("size")}
        shipping={t("shipping")}
        number={t("number")}
        profit={t("profit")}
        percentage={t("percentage")}
        value={t("value")}
      >
     
          <ProductEditHeader
            uploadProduct={t("uploadProduct")}
            addToCart={t("addToCart")}
          />
      </ProductEditRenderer>
    </>
  );
}
