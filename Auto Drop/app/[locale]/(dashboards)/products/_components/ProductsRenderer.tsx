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
import axiosInstance from "../../_components/shared/AxiosInstance";
import SubmitProducts from "./Dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiSend } from "react-icons/bi";
import { FetchSpinner } from "./ProductsSpinner";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import MotionWrapperExit from "../../_components/shared/MotionWrapperExit";
import MotionWrapper from "../../_components/shared/MotionWrapper";
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
  const [shippingInfoPending, setShippingInfoPending] =
    useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");
  const [products, setProducts] = useState<any[]>([]);
  const [productsAR, setProductsAR] = useState<any[]>([]);
  const [productsShippingInfo, setProductsShippingInfo] = useState(
    Array(products.length).fill([
      {
        shippingType: "",
        price: "",
        profitAfterDiscount: "",
        duration: "",
        activated: false,
        loading: false,
      },
    ])
  );
  useEffect(() => {
    if (products.length !== productsShippingInfo.length) {
      setProductsShippingInfo(
        Array(products.length).fill([
          {
            shippingType: "",
            price: "",
            profitAfterDiscount: "",
            duration: "",
            activated: false,
            loading: false,
          },
        ])
      );
    }
  }, [products.length]);
  const dispatch = useDispatch();
  const [commissionV, setCommissionV] = useState(
    Array(products.length).fill("")
  );
  const fetchProducts = useCallback(async () => {
    const resp = await axiosInstance.post("/aliexpress/products?lang=en", {
      page: 1,
    });

    //@ts-ignore
    return resp.data.result;
  }, []);

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
    const resp = await axiosInstance.post("/aliexpress/products?lang=ar", {
      page: 1,
    });

    return resp.data.result;
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
  const shoppingCartHandler = async (product_id: string) => {
    const resp = await axiosInstance.post("/aliexpress/getShippingDetails", {
      product_id,
    });

    console.log(resp.data.shipping);
    console.log(resp.data);
    return resp.data.shipping;
  };
  const toggleShoppingCartActivated = (index: number) => {
    setProductsShippingInfo((productsShipping) => {
      return productsShipping.map((shipping, shippingIndex) => {
        if (shippingIndex === index) {
          return [
            {
              ...shipping[0],
              activated: !shipping[0].activated,
            },
            ...shipping.slice(1),
          ];
        } else {
          return shipping;
        }
      });
    });
  };

  const pagesProducts = useSelector((state: RootState) => state.products.pages);

  useEffect(() => {
    const productsPage = pagesProducts.find(
      (p) => p.page === currPage && p.lang === lang
    );

    if (productsPage) {
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
  };

  const addCommissionHandler = async (
    index: number,
    product: any,
    value: any
  ) => {
    setShippingInfoPending(true);
    if (!value) {
      value = 0;
    }

    setProducts((products) =>
      products.map((product, i) => {
        if (i === index) {
          return { ...product, commission: value };
        }
        return product;
      })
    );
    setProductsShippingInfo((productsShipping) => {
      return productsShipping.map((shipping, shippingIndex) => {
        if (shippingIndex === index) {
          return [{ ...shipping[0], loading: "pending" }];
        } else {
          return shipping;
        }
      });
    });
    console.log(product.product_id);
    const shippingArr = await shoppingCartHandler(product.product_id);

    if (shippingArr.length !== 0) {
      shippingArr.forEach((element: any, shippingIndexNumber: number) => {
        let profitAfterDiscount =
          (product.target_sale_price * value) / 100 -
          element.freight.cent / 100; //subtract the shipping cost
        let price = product.target_sale_price;
        let shipping_method = element.shipping_method;
        let duration = element.estimated_delivery_time;

        setProductsShippingInfo((productsShipping) => {
          return productsShipping.map((shipping, shippingIndex) => {
            if (shippingIndex === index) {
              if (shippingIndexNumber == 0) {
                return [
                  {
                    shippingType: shipping_method,
                    duration,
                    activated: true,
                    price,
                    profitAfterDiscount,
                    loading: false,
                  },
                ];
              }
              return [
                ...shipping,
                {
                  shippingType: shipping_method,
                  duration,
                  activated: true,
                  price,
                  profitAfterDiscount,
                  loading: false,
                },
              ];
            } else {
              return shipping;
            }
          });
        });
      });
    } else {
      console.log("a7aaaaaaaaaaa");
      setProductsShippingInfo((productsShipping: any): any => {
        return productsShipping.map((shipping: any, shippingIndex: number) => {
          if (index === shippingIndex) {
            return [
              {
                ...shipping[0],
                loading: false,
                noShipping: true,
                activated: true,
              },
            ];
          } else {
            return shipping;
          }
        });
      });
    }
    setShippingInfoPending(false);

    console.log(shippingArr);

    console.log((product.target_sale_price * value) / 100);
  };
  return (
    <div>
      <Header toogleLang={toogleLang} shops={shops} />
      <Searchbar locale={locale} searchByProd={searchByProd} />
      <Categories categories={categories} allProducts={allProducts} />

      {lang == "en" ? (
        <>
          {" "}
          <MotionWrapper locale="en">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-3 overflow-hidden">
              {products?.map((product: any, i: number) => {
                let shippingInfoActive =
                  productsShippingInfo &&
                  productsShippingInfo.length == products.length &&
                  productsShippingInfo[i] &&
                  productsShippingInfo[i][0] &&
                  productsShippingInfo[i][0].activated;

                return (
                  <Card
                    className="relative flex flex-col !p-0 my-3 shadow-md rounded-lg justify-between overflow-hidden"
                    key={i}
                  >
                    {productsShippingInfo &&
                      productsShippingInfo[i] &&
                      productsShippingInfo[i][0].loading === "pending" && (
                        <FetchSpinner />
                      )}
                    {productsShippingInfo &&
                      productsShippingInfo[i] &&
                      productsShippingInfo[i][0].activated && (
                        <>
                          <MotionWrapperExit locale="en">
                            <div className="text-[#253439] " dir="ltr">
                              <div className="mx-auto bg-[#f0f3f4] text-center pt-16 p-6   ">
                                Information and shipping methods for the product
                              </div>
                              <ScrollArea className="h-[18rem]">
                                {productsShippingInfo[i].map(
                                  (shipping: any, ind: number) => {
                                    if (shipping.noShipping) {
                                      return (
                                        <div className="flex flex-col space-y-2 pl-2 mt-6">
                                          <div className="flex space-s-3">
                                            <span>Shipping Method:</span>
                                            <span className="text-[#008767]">
                                              No Shipping Found.
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <>
                                        <div className="flex flex-col space-y-2 pl-2 mt-6 ">
                                          <div className="flex space-s-3">
                                            <span>Shipping Method:</span>
                                            <span className="text-[#008767]">
                                              {
                                                productsShippingInfo[i][0]
                                                  .shippingType
                                              }{" "}
                                            </span>
                                          </div>
                                          <div className="flex space-s-3">
                                            {" "}
                                            <span>Duration:</span>{" "}
                                            <span className="text-[#008767]">
                                              {
                                                productsShippingInfo[i][0]
                                                  .duration
                                              }
                                            </span>
                                          </div>
                                          <div className="flex space-s-3">
                                            {" "}
                                            <span>
                                              Profit After Discount:
                                            </span>{" "}
                                            <span className="text-[#008767]">
                                              {CurrencyFormatterShippingInfo(
                                                productsShippingInfo[i][0]
                                                  .profitAfterDiscount
                                              )}
                                            </span>{" "}
                                          </div>
                                          <div className="flex space-s-3 text-[#C1121F]">
                                            {" "}
                                            <span>Price:</span>{" "}
                                            <span>
                                              {CurrencyFormatter(
                                                productsShippingInfo[i][0].price
                                              )}
                                            </span>{" "}
                                          </div>
                                          {ind !==
                                            productsShippingInfo[i].length -
                                              1 && <Separator />}
                                        </div>
                                      </>
                                    );
                                  }
                                )}
                              </ScrollArea>
                            </div>
                          </MotionWrapperExit>
                        </>
                      )}
                    <div
                      className={cn(
                        "absolute top-[1rem] ",
                        locale == "ar" ? `right-[1rem]` : `left-[1rem]`
                      )}
                    >
                      <div
                        className="overflow-hidden"
                        onClick={() => {
                          if (
                            product.checked &&
                            (product.commission || product.commission === 0)
                          ) {
                            toggleShoppingCartActivated(i);
                          }
                        }}
                      >
                        <Image
                          src={`/client/products/shoppingCart.svg`}
                          className=" rounded-full cursor-pointer "
                          height={45}
                          width={45}
                          alt="shippingCart"
                        />
                      </div>
                    </div>

                    {!shippingInfoActive && (
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
                    )}
                    {!shippingInfoActive && (
                      <div className="">
                        <Image
                          src={
                            product.product_small_image_urls
                              .productSmallImageUrl[0]
                          }
                          className="p-0 w-full min-h-[67.5%] mb-auto "
                          height={300}
                          width={300}
                          alt="aliexpressProduct"
                        />
                      </div>
                    )}
                    {product.checked && !shippingInfoActive ? (
                      <>
                        <div className="space-y-3 flex flex-col pt-7">
                          <span className="mx-auto">
                            Please Enter your commision
                          </span>
                          <div className="flex space-x-3 items-center justify-between px-3 pb-2">
                            <Button
                              className="bg-blue-500 text-white hover:bg-blue-600 rounded-full "
                              onClick={() => {
                                addCommissionHandler(
                                  i,
                                  product,
                                  commissionV[i]
                                );
                              }}
                              disabled={shippingInfoPending}
                            >
                              <BiSend />
                            </Button>
                            <div className="relative mt-auto">
                              <Input
                                type="number"
                                className="pr-6"
                                value={commissionV[i]}
                                onChange={(e) => {
                                  const newValues = [...commissionV];
                                  newValues[i] = e.target.value;
                                  setCommissionV(newValues);
                                }}
                              />
                              <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : shippingInfoActive ? (
                      <></>
                    ) : (
                      <>
                        <div className="p-3 flex flex-col  gap-y-3">
                          <div
                            className=" flex items-center justify-between"
                            dir="ltr"
                          >
                            <div className={` text-[#253439] text-xs`}>
                              {product.product_title.substring(0, 35)}
                              ...
                            </div>
                            <div>
                              <Image
                                src={"/client/products/cart.svg"}
                                alt={`cart`}
                                width={24}
                                height={24}
                              />
                            </div>
                          </div>

                          <div
                            className={`flex justify-between items-center w-full `}
                          >
                            <div
                              className={`flex gap-x-2 items-center w-11/12 `}
                            >
                              <span className="text-sm text-[#253439]">
                                {CurrencyFormatter(product.target_sale_price)}
                              </span>
                              {product.target_original_price !==
                              product.target_sale_price ? (
                                <span className="text-xs text-[#d64d57] line-through">
                                  {CurrencyFormatter(
                                    product.target_original_price
                                  )}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div
                            className={`flex justify-between items-center `}
                            dir="ltr"
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
                      </>
                    )}
                  </Card>
                );
              })}
            </div>
          </MotionWrapper>
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
