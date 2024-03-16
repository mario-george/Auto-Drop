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
    let updateAllProductShipping = async function () {
      let prodSh;
      if (lang == "en") {
        prodSh = products.map((prod: any, ind: number) => {
          return shoppingCartHandler(prod.product_id);
        });
      } else {
        prodSh = productsAR.map((prod: any, ind: number) => {
          return shoppingCartHandler(prod.product_id);
        });
      }

      let prodShPromises = await Promise.allSettled(prodSh);
      console.log(prodShPromises);
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
  }, [products.length, productsAR.length, lang]);
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
