"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CurrencyFormatter, {
  CurrencyFormatterShippingInfo,
} from "./CurrencyFormatter";
import renderRatingStars from "./RenderRatingStarts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./Header";
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
import useLoader from "@/components/loader/useLoader";
import useCategories from "./useCategories";
import useProductSearchBar from "./hooks/useProductSearchBar";
import { useErrorToast } from "@/components/chakra-ui/useErrorToast";
import { useSuccessToast } from "@/components/chakra-ui/useSuccessToast";
import { useToast } from "@chakra-ui/react";

// pages / products  state

export default function ProductsRenderer({
  locale,
  categories,
  shops,
  allProducts,
  searchByProd,
   smartDevices,
  electronics,
  clothes,
  accessories,
  perfumes,
  decor,
  sportsSupplies,
  stationary,
  cosmeticProducts,

 
  
}: {
  locale: string;
  categories: string;
  shops: string;
  searchByProd: string;
  allProducts: string;
  smartDevices:string
  electronics:string
  clothes:string
  accessories:string
  perfumes:string

  decor:string
  sportsSupplies:string
  stationary:string
  cosmeticProducts:string

}) {
  const [currPage, setCurrPage] = useState("1");
  const { LoaderComponent, setLoading } = useLoader();
  let toast = useToast()
  const errorButtonRef = useRef<HTMLButtonElement>(null)
  const successButtonRef = useRef<HTMLButtonElement>(null)
const {ErrorComponent} = useErrorToast({title:"Error",description:"The data you provided has no results.",errorButtonRef})
const {SuccessComponent} = useSuccessToast({title:"Success",description:"Products have been added successfully.",successButtonRef})
  const [lang, setLang] = useState<string>("en");
let {SearchBarComponent,searchInfo,setSearchInfo} =useProductSearchBar({locale,searchByProd})

  const { fetchAndSetAR, handleCheckChangeAR, productsAR, setProductsAR } =
    useProductsAR({lang,searchInfo,setSearchInfo,errorButtonRef});
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
    productsAR,searchInfo,setSearchInfo,errorButtonRef
  });

  const dispatch = useDispatch();
  let CategoriesProps = {
    categories,
    allProducts,
    searchByProd,
     smartDevices,
    electronics,
    clothes,
    accessories,
    perfumes,
    decor,
    sportsSupplies,
    stationary,
    cosmeticProducts,setSearchInfo
  
  }
let  {currentCategory,CategoriesRendererComponent} = useCategories(CategoriesProps)
  const pagesProducts = useSelector((state: RootState) => state.products.pages);
  const aliExpressToken = useSelector((state: RootState) => state.user.aliExpressToken);
useEffect(()=>{

  if(!searchInfo || searchInfo.type == "allProducts"){return } 
console.log("searchInfo",searchInfo)
  // unstable_batchedUpdates(() => {
    setProductsAR([]);
    setProducts([]);
  // });
  dispatch(resetPagesProducts());

  if (lang == "ar") {
    fetchAndSetAR('change');
  } else {
    fetchAndSet2('change');
  }
  return;

},[searchInfo,searchInfo.type,searchInfo.searchUrl,searchInfo.imageBytes])
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
if(!aliExpressToken){
  return <>Please Link your account with aliexpress and try again </>
}
  return (
    <div className="dark:text-white">
      {SuccessComponent}
{ErrorComponent}
{LoaderComponent}
      <Header toogleLang={toogleLang} shops={shops} />
 {SearchBarComponent}
      {CategoriesRendererComponent}

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
          setLoading={setLoading}
          successButtonRef={successButtonRef}
          toast={toast}
        />
      </>
    </div>
  );
}
