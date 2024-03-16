"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CurrencyFormatter, {
  CurrencyFormatterShippingInfo,
} from "./CurrencyFormatter";
import renderRatingStars from "./RenderRatingStarts";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./Header";
import Categories from "./Categories";
import Searchbar from "../../_components/Products/Searchbar";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import PaginationRenderer from "./PaginationRenderer";
import { unstable_batchedUpdates } from "react-dom";
import { resetPagesProducts } from "@/store/productsSlice";
import ProductsSpinner from "./ProductsSpinner";

import SubmitProducts from "./Dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiSend } from "react-icons/bi";
import { FetchSpinner } from "./ProductsSpinner";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import MotionWrapperExit from "../../_components/shared/MotionWrapperExit";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import useProductsAR from "./hooks/useProductsAR";
import useProductsEN from "./hooks/useProductsEN";
import ProductsListEN from "./ui/ProductsListEN";
import ProductsListAR from "./ui/ProductsListAR";
import SearchProduct from "../../_components/shared/ui/SearchProduct";

// pages / products  state

export default function ProductsRenderer({
  locale,
  categories,
  shops,
  allProducts,
  searchByProd,
}: {
  locale: string;
  categories: string;
  shops: string;
  searchByProd: string;
  allProducts: string;
}) {
  const [currPage, setCurrPage] = useState("1");

  const [lang, setLang] = useState<string>("en");
  const { fetchAndSetAR, handleCheckChangeAR, productsAR, setProductsAR } =
    useProductsAR(lang);
  let {
    products,
 
    handleCheckChange,
    productsShippingInfo,
    setProducts,
    fetchAndSet2,
    setProductsShippingInfo,
    showShippingForProduct,
    showShippingHandler,
  } = useProductsEN({
    currPage,
    fetchAndSetAR,
    lang,
    setProductsAR,
    productsAR,
  });

  const dispatch = useDispatch();


  const pagesProducts = useSelector((state: RootState) => state.products.pages);

  const toogleLang = async (language: string) => {
    setLang(language);
    unstable_batchedUpdates(() => {
      setLang(language);
      setProductsAR([]);
      setProducts([]);
    });

    dispatch(resetPagesProducts());
    if (language == "ar") {
      fetchAndSetAR();
    } else {
      fetchAndSet2();
    }
    return;
  };
  let ProductsListENProps = {
    showShippingForProduct,
    showShippingHandler,
    products,
    productsShippingInfo,
    handleCheckChange,
    locale,

  };
  let ProductsListARProps = {
    productsAR,
    productsShippingInfo,
    handleCheckChangeAR,
    locale,

    lang,
    showShippingForProduct,
    showShippingHandler,
  };
  return (
    <div className="dark:text-white">
      <Header toogleLang={toogleLang} shops={shops} />
      <SearchProduct
        isAr={locale == "ar"}
        placeholder={searchByProd}
        onChange={() => {}}
        value={""}
        className="flex justify-center"
      />
      <Categories categories={categories} allProducts={allProducts} />

      {lang == "en" ? (
        <>
          {" "}
          <ProductsListEN {...ProductsListENProps} />
        </>
      ) : (
        <>
          <ProductsListAR {...ProductsListARProps} />
        </>
      )}
      <>
        <ProductsSpinner
          products={products}
          productsAR={productsAR}
          lang={lang}
        />
        <PaginationRenderer
          lang={lang}
          products={products}
          productsAR={productsAR}
          setProducts={setProducts}
          setProductsAR={setProductsAR}
          setCurrPage={setCurrPage}
          currPage={currPage}
        />

        <SubmitProducts
          pagesProducts={pagesProducts}
          currPageProdEN={products}
          currPageProdAR={productsAR}
          currPage={currPage}
          lang={lang}
        />
      </>
    </div>
  );
}
