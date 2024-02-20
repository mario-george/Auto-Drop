"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import ColsExtract from "./ColumnsExtractor";

export default function ProductsFetch(props: any) {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const getMyProductsData = async () => {
      const data2 = await axiosInstance.get("/aliexpress/product/getProducts");
      console.log(data2.data.userProducts);
      //   setMyProducts(JSON.parse(data2.data.userProducts.toString()));
      setMyProducts(
        data2.data.userProducts.map((product: any) => {
          return {
            ...product,
            prodName: product.name,
            prodInfo: { name: product.name, image: product.images[0].original },
            category: product.category_name,
            prodImage: product.images[0].original,
            sellPrice: product.price,
            inventory: product.quantity,
            platform: props.locale == "ar" ? "علي اكسبرس" : "Aliexpress",
          };
        })
      );
    };

    getMyProductsData();
  }, []);

  if (!myProducts) {
    return <div>Loading...</div>; // Replace with your loading state
  }

  return (
    <>
      {" "}
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white">
        <ColsExtract {...props} myProducts={myProducts} />
      </div>
    </>
  );
}
