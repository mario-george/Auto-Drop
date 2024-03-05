import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function useProducts({
  currPage,
  fetchAndSetAR,
  lang,
  setProductsAR,
  productsAR,
}: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [shippingInfoPending, setShippingInfoPending] =
    useState<boolean>(false);
  const [commissionV, setCommissionV] = useState(
    Array(products.length).fill(0)
  );
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
        loading: false,
      },
    ]),
  ]);
  const pagesProducts = useSelector((state: RootState) => state.products.pages);

  const fetchProducts = useCallback(async () => {
    const resp = await axiosInstance.post("/aliexpress/products?lang=en", {
      page: 1,
    });

    return resp.data.result;
  }, []);
  useEffect(() => {
    console.log("use effect reset is active");
    if (lang == "en" && products.length !== commissionV.length) {
      setCommissionV(Array(products.length).fill(0));
    }
    if (lang == "ar" && productsAR.length !== commissionV.length) {
      setCommissionV(Array(productsAR.length).fill(0));
    }
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
            loading: false,
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
  /*   useEffect(() => {
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
  }, [products.length]); */
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

  const addCommissionHandler = async (
    index: number,
    product: any,
    value: any
  ) => {
    setShippingInfoPending(true);
    if (!value) {
      value = 0;
    }
    console.log(lang);
    console.log(product);
    /*   if (lang == "en") {
      setProducts((products) =>
        products.map((product, i) => {
          if (i === index) {
            return { ...product, vendor_commission: value };
          }
          return product;
        })
      );
    } else {
      setProductsAR((products: any) => {
        return productsAR.map((product: any, i: number) => {
          if (i === index) {
            return { ...product, vendor_commission: value };
          }
          return product;
        });
      });
    }
    */
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
    console.log(productsShippingInfo);

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
    console.log(productsShippingInfo);
  };
  useEffect(() => {
    let updateAllProductShipping = async function () {
      if (lang == "en") {
        if (productsShippingInfo.length == 0) {
          let prodSh = products.map((prod: any, ind: number) => {
            return shoppingCartHandler(prod.product_id);
          });
          let prodShPromises = await Promise.allSettled(prodSh);
          console.log(prodShPromises);
          setProductsShippingInfo(
            prodShPromises.map((result: any, index: number) => {
              if (result.status === "rejected") {
                return [];
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
        }
      } else {
      }
    };
    updateAllProductShipping();
  }, [products, productsAR, lang]);
  const shoppingCartHandler = async (product_id: string) => {
    try {
      const resp = await axiosInstance.post("/aliexpress/getShippingDetails", {
        product_id,
      });

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
    commissionV,
    products,
    addCommissionHandler,
    setCommissionV,
    handleCheckChange,
    productsShippingInfo,
    shippingInfoPending,
    setProducts,
    fetchAndSet2,
    setProductsShippingInfo,
    showShippingForProduct,
    showShippingHandler,
  };
}
