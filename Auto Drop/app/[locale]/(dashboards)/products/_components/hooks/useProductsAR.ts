import { useCallback } from "react";

import { useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";

export default function useProductsAR({ lang }: any) {
  const [productsAR, setProductsAR] = useState<any[]>([]);
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
  }, [fetchProductsAR, productsAR.length, setProductsAR]);
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
  return { fetchAndSetAR, handleCheckChangeAR,productsAR,setProductsAR };
}
