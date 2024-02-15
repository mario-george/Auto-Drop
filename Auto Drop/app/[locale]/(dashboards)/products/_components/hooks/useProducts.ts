import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

export default function useProducts({
  currPage,
  fetchAndSetAR,
  lang,
  setProductsAR,
}: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [commissionV, setCommissionV] = useState(
    Array(products.length).fill("")
  );
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
  const pagesProducts = useSelector((state: RootState) => state.products.pages);

  const fetchProducts = useCallback(async () => {
    const resp = await axiosInstance.post("/aliexpress/products?lang=en", {
      page: 1,
    });

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

    const resp = await shoppingCartHandler(product.product_detail_url);

    if (resp) {
      resp.forEach((element: any, shippingIndexNumber: number) => {
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
        productsShipping.map((shipping: any, shippingIndex: number) => {
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
  };
  const shoppingCartHandler = async (url: string) => {
    const resp = await axiosInstance.post(
      "/aliexpress/getProductDetails?lang=en",
      { url }
    );
      
    if (!resp.data.shipping) {
      return null;
    }
    return resp.data.shipping;
  };
  return {
    commissionV,
    products,
    addCommissionHandler,
    setCommissionV,
    handleCheckChange,
    productsShippingInfo,
  };
}
