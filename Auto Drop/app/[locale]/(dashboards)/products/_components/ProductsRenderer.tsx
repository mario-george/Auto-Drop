"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CurrencyFormatter from "./CurrencyFormatter";
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
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

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
  const token: string = useSelector((state: RootState) => {
    return state.user.token;
  });
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState("1");
  const [lang, setLang] = useState<string>("en");
  const [products, setProducts] = useState<any[]>([]);
  const [productsAR, setProductsAR] = useState<any[]>([]);

  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    const resp = await fetch(
      `http://localhost:10000/api/v1/aliexpress/products?lang=en`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify({ page: 1 }),
      }
    );
    const respData = await resp.json();
    return respData.result;
  }, [token]);

  const fetchAndSet2 = useCallback(async () => {
    let productCount = products.length;
    const targetCount = 20;

    if (productCount < targetCount) {
      const remainingProducts = targetCount - productCount;
      const newProducts = await fetchProducts();
      const additionalProducts = newProducts.slice(0, remainingProducts);
      productCount += additionalProducts.length;

      setProducts((oldProducts) => [...oldProducts, ...additionalProducts]);
    }
  }, [fetchProducts, products]);

  let fetchProductsAR = async () => {
    const resp = await fetch(
      `http://localhost:10000/api/v1/aliexpress/products?lang=ar`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify({ page: 1 }),
      }
    );
    const respData = await resp.json();
    return respData.result;
  };
  const fetchAndSetAR = useCallback(async () => {
    let productCount = productsAR.length;
    const targetCount = 20;

    if (productCount < targetCount) {
      const remainingProducts = targetCount - productCount;
      const newProducts = await fetchProductsAR();
      const additionalProducts = newProducts.slice(0, remainingProducts);
      productCount += additionalProducts.length;

      setProductsAR((oldProducts) => [...oldProducts, ...additionalProducts]);
    }
  }, [fetchProducts, lang, productsAR]);
  const shoppingCartHandler = async (url:string) => {
    console.log(url)
    const resp = await fetch(
      `http://localhost:10000/api/v1/aliexpress/getProductDetails?lang=en`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify({ url }),
      }
    );
    const respData = await resp.json();
    console.log(respData);
    // return respData;
  };
  const pagesProducts = useSelector((state: RootState) => state.products.pages);

  useEffect(() => {
    const productsPage = pagesProducts.find(
      (p) => p.page === currPage && p.lang === lang
    );
    console.log(pagesProducts);
    console.log(lang);
    if (productsPage) {
      console.log(pagesProducts);
      console.log(productsPage!.lang);
      console.log(productsPage!.page);
      if (productsPage.products.length === 0) {
        if (lang == "en") {
          fetchAndSet2();
        } else {
          fetchAndSetAR();
        }
        return;
      }
      if (productsPage.lang == lang) {
        if (lang == "en") {
          setProducts(productsPage.products);
        } else {
          setProductsAR(productsPage.products);
        }
      }
    } else {
      if (lang == "en") {
        fetchAndSet2();
      } else {
        fetchAndSetAR();
      }
    }
  }, [pagesProducts, currPage]);
  const handleCheckChange = (index: number) => {
    setProducts((products) =>
      products.map((product, i) => {
        if (i === index) {
          return { ...product, checked: !product.checked };
        }
        return product;
      })
    );
  };
  const handleCheckChangeAR = (index: number) => {
    setProductsAR((products) =>
      products.map((product, i) => {
        if (i === index) {
          return { ...product, checked: !product.checked };
        }
        return product;
      })
    );
  };

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

    if (language !== "ar") {
      setProductsAR([]);
    } else {
      setProducts([]);

      let fetchProductsAR = async () => {
        const resp = await fetch(
          `http://localhost:10000/api/v1/aliexpress/products?lang=${language}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            method: "POST",
            body: JSON.stringify({ page: 1 }),
          }
        );
        const respData = await resp.json();
        console.log(respData);
        return respData.result;
      };
      let fetchAndSetAR = async () => {
        let productCount = 0;

        while (productCount < 20) {
          const newProducts = await fetchProductsAR(); // Assume this always fetches 2 products
          productCount += newProducts.length;

          // Add new products to the array
          setProductsAR((oldProducts) => [...oldProducts, ...newProducts]);
          console.log(productCount);
        }
      };
      console.log(lang);
      console.log(language);
      // fetchAndSetAR();
      // fetchAndSet2();
    }
    fetchAndSet2();
  };

  return (
    <div>
      <Header toogleLang={toogleLang} shops={shops} />
      <Searchbar locale={locale} searchByProd={searchByProd} />
      <Categories categories={categories} allProducts={allProducts} />

      {lang == "en" ? (
        <>
          {" "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-3 overflow-hidden">
            {products?.map((product: any, i: number) => {
              return (
                <Card
                  className="relative flex flex-col !p-0 my-3 shadow-md rounded-lg justify-between overflow-hidden"
                  key={i}
                >
                  <div
                    className={cn(
                      "absolute top-[1rem] ",
                      locale == "ar" ? `right-[1rem]` : `left-[1rem]`
                    )}
                  >
                    <div
                      className="overflow-hidden"
                      onClick={() => {
                        shoppingCartHandler(product.product_detail_url);
                      }}
                    >
                      <Image
                        src={`/client/products/shoppingCart.svg`}
                        className=" rounded-full cursor-pointer "
                        // style={{ height: "70%" }}
                        //   layout="fill"
                        //   objectFit="cover"

                        height={45}
                        width={45}
                        alt="shoppingCart"
                      />
                    </div>
                  </div>

                  <div
                    className={
                      (cn("absolute top-[10rem] left-[6rem]"),
                      locale == "aar" ? `right-[10%]` : `left-[10%]`)
                    }
                  >
                    <Checkbox
                      checked={product.checked || false}
                      onCheckedChange={() => handleCheckChange(i)}
                      classNameIndicator="bg-blue-500 overflow-hidden"
                      className={cn(
                        "absolute top-[5%]  tab:h-[18px] tab:w-[18px] overflow-hidden border-black border-2 shadow-lg",
                        locale == "ar" ? `left-[5%]` : `right-[5%]`
                      )}
                    />
                  </div>
                  <div className="">
                    <Image
                      src={
                        product.product_small_image_urls.productSmallImageUrl[0]
                      }
                      className="p-0 w-full min-h-[67.5%] mb-auto "
                      // style={{ height: "70%" }}
                      //   layout="fill"
                      //   objectFit="cover"
                      height={300}
                      width={300}
                      alt="aliexpressProduct"
                    />
                  </div>
                  <div className="p-3 flex flex-col  gap-y-3">
                    <div
                      className={`flex justify-between gap-x-2 items-center ${
                        locale === "ar" && "flex-row-reverse "
                      }`}
                    >
                      <div
                        className={`flex w-full items-center ${
                          locale === "ar" && "justify-end "
                        }`}
                      >
                        <span
                          className={`w-fit text-neutral-500 text-xs ${
                            locale === "ar" && "text-right "
                          }`}
                        >
                          {locale === "ar" && "..."}
                          {locale === "en"
                            ? product.product_title.substring(0, 25)
                            : product.product_title.substring(0, 35)}
                          {locale === "en" && "..."}
                        </span>
                      </div>
                      {/*   {loadingAdd.includes(i) ? (
                    <div className=" flex items-center justify-center">
                      <TailSpin
                        height="20"
                        width="20"
                        color="#253439"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    <button
                      className="bg-gray-300 rounded-full p-2 w-6 h-6 flex items-center justify-center text-white hover:text-orange-400 hover:bg-slate-300"
                      onClick={() => setAddButton(i)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-sm " />
                    </button>
                  )} */}
                    </div>
                    <div
                      className={`flex justify-between items-center w-full ${
                        locale === "ar" && "flex-row-reverse "
                      }`}
                    >
                      <div
                        className={`flex gap-x-2 items-center w-11/12  ${
                          locale === "ar" && "justify-end "
                        }`}
                      >
                        <span className="text-sm text-[#253439]">
                          {CurrencyFormatter(product.target_sale_price)}
                        </span>
                        {product.target_original_price !==
                        product.target_sale_price ? (
                          <span className="text-xs text-[#d64d57] line-through">
                            {CurrencyFormatter(product.target_original_price)}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <button onClick={() => copy(i)}> */}
                      {/*           <FontAwesomeIcon
                      icon={faCopy}
                      className={`cursor-pointer mr-1 ${
                        copied === i && "text-green-700"
                      }`}
                    /> */}
                      <Image
                        src={"/client/products/cart.svg"}
                        alt={`cart`}
                        width={24}
                        height={24}
                      />
                    </div>
                    <div
                      className={`flex justify-between items-center ${
                        locale === "ar" && "flex-row-reverse "
                      }`}
                    >
                      <div className="flex flex-1 z-30">
                        {product.evaluate_rate
                          ? renderRatingStars(
                              product.evaluate_rate.split("%")[0]
                            )
                          : renderRatingStars(90)}
                      </div>
                      <a
                        href={product.product_detail_url}
                        target="_blank"
                        className=" "
                      >
                        <Image
                          src={`/client/products/aliexpressCard.svg`}
                          width={66}
                          height={21}
                          alt="aliexpressCard"
                        />
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-3 overflow-hidden">
            {productsAR?.map((product: any, i: number) => {
              return (
                <Card
                  className="relative flex flex-col !p-0 my-3 shadow-md rounded-lg justify-between overflow-hidden"
                  key={i}
                >
                  <div
                    className={cn(
                      "absolute top-[1rem] ",
                      locale == "ar" ? `right-[1rem]` : `left-[1rem]`
                    )}
                  >
                    <div className="overflow-hidden">
                      <Image
                        src={`/client/products/shoppingCart.svg`}
                        className=" rounded-full cursor-pointer "
                        height={45}
                        width={45}
                        alt="shoppingCart"
                      />
                    </div>
                  </div>

                  <div
                    className={
                      (cn("absolute top-[10rem] left-[6rem]"),
                      locale == "aar" ? `right-[10%]` : `left-[10%]`)
                    }
                  >
                    <Checkbox
                      checked={product.checked || false}
                      onCheckedChange={() => handleCheckChangeAR(i)}
                      classNameIndicator="bg-blue-500 overflow-hidden"
                      className={cn(
                        "absolute top-[5%]  tab:h-[18px] tab:w-[18px] overflow-hidden border-black border-2 shadow-lg",
                        locale == "ar" ? `left-[5%]` : `right-[5%]`
                      )}
                    />
                  </div>
                  <div className="">
                    <Image
                      src={
                        product.product_small_image_urls.productSmallImageUrl[0]
                      }
                      className="p-0 w-full min-h-[67.5%] mb-auto "
                      height={300}
                      width={300}
                      alt="aliexpressProduct"
                    />
                  </div>
                  <div className="p-3 flex flex-col  gap-y-3">
                    <div
                      className={`flex justify-between gap-x-2 items-center`}
                    >
                      <div
                        className={`flex justify-between w-full items-center`}
                      >
                        <span
                          className={`w-fit text-[#253439] text-xs ${
                            lang === "ar" && "text-right "
                          }`}
                        >
                          {lang === "en"
                            ? product.product_title.substring(0, 25)
                            : product.product_title.substring(0, 35)}
                          ...
                        </span>
                        <div>
                          <Image
                            src={"/client/products/cart.svg"}
                            alt={`cart`}
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center w-full`}>
                      <div className={`flex space-x-2 items-center `}>
                        <span className="text-sm">
                          {CurrencyFormatter(product.target_sale_price)}
                        </span>
                        {product.target_original_price !==
                        product.target_sale_price ? (
                          <span className="text-xs text-[#c2464f] line-through text-[12px]">
                            {CurrencyFormatter(product.target_original_price)}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex justify-between items-center ${
                        lang === "ar" && "flex-row-reverse "
                      }`}
                    >
                      <div className="flex flex-1 z-30">
                        {product.evaluate_rate
                          ? renderRatingStars(
                              product.evaluate_rate.split("%")[0]
                            )
                          : renderRatingStars(90)}
                      </div>
                      <a
                        href={product.product_detail_url}
                        target="_blank"
                        className=" "
                      >
                        <Image
                          src={`/client/products/aliexpressCard.svg`}
                          width={66}
                          height={21}
                          alt="aliexpressCard"
                        />
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
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
function SubmitProducts({
  lang,
  pagesProducts,
  currPageProdEN,
  currPageProdAR,
  currPage,
}: any) {
  let toBeSentPages = pagesProducts.filter((element: any) => {
    return element.lang === lang && element.page !== currPage;
  });
  let toBeSentProducts = toBeSentPages.map((element: any) => {
    return element.products;
  });
  let toBeSentProductsArr = toBeSentProducts.flat().filter((element: any) => {
    return element.checked === true;
  });
  if (lang == "en") {
    currPageProdEN.forEach((element: any) => {
      if (element.checked) {
        toBeSentProductsArr.push(element);
      }
    });
  } else {
    currPageProdAR.forEach((element: any) => {
      if (element.checked) {
        toBeSentProductsArr.push(element);
      }
    });
  }
  const submitProductsHandler = () => {
    console.log(toBeSentProductsArr);
    console.log(toBeSentProductsArr.length);
  };
  return (
    <>
      <Dialog toBeSentProductsArr={toBeSentProductsArr}>
        <Button
          className="fixed bottom-12 !bg-blue-300 rounded-full min-w-[3rem] min-h-[3rem] shadow"
          onClick={submitProductsHandler}
          disabled={toBeSentProductsArr.length === 0}
        >
          <FaPlus className="text-black" />
        </Button>
      </Dialog>
    </>
  );
}
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Dialog({
  children,
  toBeSentProductsArr,
}: {
  children: React.ReactNode;
  toBeSentProductsArr: any;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to add these products to your list ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can save these products to your list
              {toBeSentProductsArr.map((product: any, i: number) => {
                return (
                  <>
                    <div
                      key={i}
                      className="flex justify-between items-center text-[#253439] min-w-full my-4 border-2 rounded-lg p-2"
                    >
                      <span className="max-w-[80%]">
                        {product.product_title}
                      </span>
                      <span>
                        {CurrencyFormatter(product.target_sale_price)}
                      </span>
                    </div>
                  </>
                );
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-green-500 hover:bg-green-600">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
