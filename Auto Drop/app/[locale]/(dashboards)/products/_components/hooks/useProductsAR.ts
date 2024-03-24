import { useCallback } from "react";

import { useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";

export default function useProductsAR({ lang,searchInfo,errorButtonRef,setSearchInfo }: any) {
  const [productsAR, setProductsAR] = useState<any[]>([]);
  let fetchProductsAR =useCallback( async () => {
    try{

      if (searchInfo.type == "allProducts" ||searchInfo.type == "fallback"  ) {
        const resp = await axiosInstance.post("/aliexpress/products?lang=ar", {
          page: 1,
        });
  
        return resp.data.result;
      } else if (searchInfo.type == "category") {
        const resp = await axiosInstance.post(
          `/search/getRandomProductsCategory/?lang=ar`,
          {
            categoryName: searchInfo.categoryName,
          }
        );
  
        return resp.data.result;
      } else if (searchInfo.type == "image") {
        const resp = await axiosInstance.post(
          "/search/getRandomProductsImage?lang=ar",
  
          searchInfo.imageBytes,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        return resp.data.result;
      }else if (searchInfo.type == "search") {
        const resp = await axiosInstance.post(
          `/search/getProductByUrl/?lang=ar`,
          {
            url: searchInfo.searchUrl,
          }
        );
  
        return resp.data.result;
      } 
    }catch(err:any){
      console.error(err)
      errorButtonRef?.current?.click()
      setSearchInfo({searchUrl:'',type:"fallback",imageBytes:null})
    }

  },[searchInfo])
  const fetchAndSetAR = useCallback(async (value?:string) => {
    if (value == "change") {
      const newProducts = await fetchProductsAR();

      if (!newProducts || newProducts?.length == 0) {
        return;
      }
      setProductsAR((oldProducts) => [...newProducts]);

      return;
    }
    let productCount = productsAR.length;
    const targetCount = 20;

    if (productCount < targetCount) {
      const remainingProducts = targetCount - productCount;
      const newProducts = await fetchProductsAR();
      if (!newProducts || newProducts?.length == 0) {
        return;
      }
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
