"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import ColsExtract from "./ColumnsExtractor";
import { setKeyValue } from "@/store/productsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useLoaderProducts from "@/components/loader/useLoaderProducts";

export default function ProductsFetch(props: any) {
  const { LoaderComponent } = useLoaderProducts();
  const [myProducts, setMyProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(false);
  const reloadProducts = useSelector(
    (state: any) => state.products.reloadProducts
  );
  const reloadPage = useSelector((state: any) => state.products.reloadPage);
  const dispatch = useDispatch();
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
            // prodInfo: { name: product.name, image: product.images[0].original },
            category:
              product.category_name || product.first_level_category_name,
            prodImage: product.images[0].original,
            sellPrice: product.price,
            inventory: product.quantity,
            platform: props.locale == "ar" ? "علي اكسبرس" : "Aliexpress",
          };
        })
      );
      dispatch(
        setKeyValue({
          key: "currentProductsList",
          value: data2.data.userProducts,
        })
      );
      dispatch(
        setKeyValue({
          key: "loadingProductTable",
          value: false,
        })
      );
    };

    getMyProductsData();
  }, [loadProducts, reloadProducts, reloadPage]);

  if (!myProducts) {
    return <div>Loading...</div>; // Replace with your loading state
  }

  return (
    <>
      {LoaderComponent}{" "}
      <div
        className={` tableContainer dark:bg-[#2e464f] dark:text-white flex flex-1 justify-center ${
          myProducts.length > 0 && `!mx-auto`
        }`}
      >
        <ColsExtract
          {...props}
          myProducts={myProducts}
          setMyProducts={setMyProducts}
          setLoadProducts={setLoadProducts}
        />
      </div>
    </>
  );
}
