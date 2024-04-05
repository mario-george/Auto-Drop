import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios, { CancelToken } from "axios";

export default function useProducts({
  currPage,
  fetchAndSetAR,
  lang,
  setProductsAR,
  productsAR,
  searchInfo,
  setSearchInfo,
  errorButtonRef,
}: any) {
  const [products, setProducts] = useState<any[]>([]);

  let lengthOfProducts = products.length;
  if (lang == "ar") {
    lengthOfProducts = productsAR.length;
  }

  const [showShippingForProduct, setShowShippingForProduct] = useState([
    Array(lengthOfProducts).fill(false),
  ]);
  const [productsShippingInfo, setProductsShippingInfo] = useState([
    Array(lengthOfProducts).fill([
      {
        shippingType: "",
        price: "",
        profitAfterDiscount: "",
        duration: "",
        activated: false,
        loading: 'pending',
      },
    ]),
  ]);
  const pagesProducts = useSelector((state: RootState) => state.products.pages);

  const fetchProducts = useCallback(async () => {
    console.log("searchInfo", searchInfo);

    try {
      if (searchInfo.type == "allProducts" || searchInfo.type == "fallback") {
        const resp = await axiosInstance.post("/aliexpress/products?lang=en", {
          page: 1,
        });

        return resp.data.result;
      } else if (searchInfo.type == "category") {
        const resp = await axiosInstance.post(
          `/search/getRandomProductsCategory/?lang=en`,
          {
            categoryName: searchInfo.categoryName,
          }
        );

        return resp.data.result;
      } else if (searchInfo.type == "image") {
        const resp = await axiosInstance.post(
          "/search/getRandomProductsImage?lang=en",

          searchInfo.imageBytes,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return resp.data.result;
      } else if (searchInfo.type == "search") {
        const resp = await axiosInstance.post(
          `/search/getProductByUrl/?lang=en`,
          {
            url: searchInfo.searchUrl,
          }
        );

        return resp.data.result;
      }
    } catch (err: any) {
      console.error(err);
      errorButtonRef?.current?.click();
      setSearchInfo({ searchUrl: "", type: "fallback", imageBytes: null });
    }
  }, [searchInfo]);
  useEffect(() => {
    if (products.length !== productsShippingInfo.length && lang == "en") {
      setProductsShippingInfo(
        Array(products.length).fill([
          {
            shippingType: "",
            price: "",
            profitAfterDiscount: "",
            duration: "",
            activated: false,
            // loading: false,
            loading: "pending",
            // made pending after remove of commission calculation
          },
        ])
      );
    }

    if (productsAR.length !== productsShippingInfo.length && lang == "ar") {
      setProductsShippingInfo(
        Array(productsAR.length).fill([
          {
            shippingType: "",
            price: "",
            profitAfterDiscount: "",
            duration: "",
            activated: false,
            // loading: false,
            loading: "pending",
          },
        ])
      );
    }
    if (products.length !== showShippingForProduct.length && lang == "en") {
      setShowShippingForProduct(Array(products.length).fill(false));
    }
    if (productsAR.length !== showShippingForProduct.length && lang == "ar") {
      setShowShippingForProduct(Array(productsAR.length).fill(false));
    }
  }, [lang, productsAR.length, products.length]);
  const fetchAndSet2 = useCallback(
    async (value?: string) => {
      if (value == "change") {
        const newProducts = await fetchProducts();

        if (!newProducts || newProducts?.length == 0) {
          return;
        }
        setProducts((oldProducts) => [...newProducts]);

        return;
      }

      let productCount = products.length;
      const targetCount = 20;

      if (value == "change" || productCount < targetCount) {
        const remainingProducts = targetCount - productCount;
        const newProducts = await fetchProducts();
        if (!newProducts || newProducts?.length == 0) {
          return;
        }
        const additionalProducts = newProducts.slice(0, remainingProducts);
        productCount += additionalProducts.length;

        setProducts((oldProducts) => [...oldProducts, ...additionalProducts]);
      }
    },
    [fetchProducts, products]
  );

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

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
if((products.length ===0 && lang=="en" )||(productsAR.length ===0 && lang=="ar")) return
    let updateAllProductShipping = async function () {
      let prodSh;
      if (lang == "en") {
        prodSh = products.map((prod: any, ind: number) => {
          return shoppingCartHandler(prod.product_id, source.token);
        });
      } else {
        prodSh = productsAR.map((prod: any, ind: number) => {
          return shoppingCartHandler(prod.product_id, source.token);
        });
      }

      let prodShPromises = await Promise.allSettled(prodSh);
      let reset = true
      prodShPromises.forEach  ((promise:any)=>{
        if(promise.value.length>0){
          reset=false
        }
      })
      if(reset ) return
      console.log("prodShPromises" ,prodShPromises);
      setProductsShippingInfo(
        prodShPromises.map((result: any, index: number) => {
          if (result.status === "rejected") {
            return [{ activated: true, loading: false, noShipping: true }];
          }

          let shipping = result.value;

          if (shipping.length == 0) {
            return [{ activated: true, loading: false, noShipping: true }];
          }
          return shipping.map((e: any) => {
            let shippingType = e.shipping_method;
            let duration = e.estimated_delivery_time;
            let price = e?.freight?.cent / 100;
            return {
              ...e,
              price,
              duration,
              shippingType,
              activated: true,
              loading: false,
            };
          });
        })
      );
    };
    updateAllProductShipping();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [products.length, productsAR.length, lang]);
  const shoppingCartHandler = async (product_id: string, cancelToken: any) => {
    try {
      const resp = await axiosInstance.post(
        "/shipping/new",
        {
          product_id,
        },
        {
          cancelToken: cancelToken,
        }
      );
      return resp.data.shipping;
    } catch (e: any) {
      console.log(e);
      return [];
    }
  };

  const showShippingHandler = (i: number) => {
    setShowShippingForProduct((prevProducts: any) => {
      let tempArr = [...prevProducts];
      tempArr[i] = !tempArr[i];
      return tempArr;
    });
  };

  return {
    products,
    handleCheckChange,
    productsShippingInfo,
    setProducts,
    fetchAndSet2,
    setProductsShippingInfo,
    showShippingForProduct,
    showShippingHandler,
  };
}
