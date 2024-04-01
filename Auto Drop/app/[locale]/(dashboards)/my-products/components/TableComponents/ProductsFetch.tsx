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
  const [noProducts, setNoProducts] = useState<boolean>(false);
  const [allProdCategories, setAllProdCategories] = useState([]);
  const [loadProducts, setLoadProducts] = useState(false);
  const reloadProducts = useSelector(
    (state: any) => state.products.reloadProducts
  );
  const reloadPage = useSelector((state: any) => state.products.reloadPage);
  const dispatch = useDispatch();
  useEffect(() => {
    let getProductsInfo = async () => {
      let fetchInfoUrls = [
        "/aliexpress/product/getProducts",
        "/salla/getProductsCategories",
      ];
      let fetchInfoPromises = fetchInfoUrls.map((url: string) => {
        return axiosInstance.get(url);
      });
      try {
        let fetchInfoResolved = await Promise.allSettled(fetchInfoPromises);
        console.log("fetchInfoResolved", fetchInfoResolved);
        fetchInfoResolved.forEach((resp, i: number) => {
          console.log("resp", resp);
          if (resp.status == "rejected") {
            throw new Error("Promise Failed" + resp.reason);
          }
          if (i == 0) {
            let products = resp.value.data.userProducts;
          console.log("PRODUCTS", products);

            if (products && products.length == 0) {
              setMyProducts([]);
              console.log("empty")
              setNoProducts(true)
            } else {
              setMyProducts(
                products.map((product: any) => {
                  return {
                    ...product,
                    prodName: product.name,
                    category:
                      product.category_name ||
                      product.first_level_category_name,
                    prodImage: product.images[0].original,
                    sellPrice: product.price,
                    inventory: product.quantity,
                    platform:
                      props.locale == "ar" ? "علي اكسبرس" : "Aliexpress",
                  };
                })
              );
            }
          } else {
            let productsCategories = resp.value.data.data;
            setAllProdCategories(productsCategories);
          }
          if (fetchInfoResolved[0].status == "fulfilled") {
            dispatch(
              setKeyValue({
                key: "currentProductsList",
                value: fetchInfoResolved[0].value.data.userProducts,
              })
            );
          }
          dispatch(
            setKeyValue({
              key: "loadingProductTable",
              value: false,
            })
          );
        });
      } catch (err) {
        console.error(err);
      }
    };

    getProductsInfo();
  }, [loadProducts, reloadProducts, reloadPage]);
  /*   useEffect(() => {
    const getAllProductsCategories = async () => {
      const productsCategoriesResp = await axiosInstance.get(
        "/salla/getProductsCategories"
      );

      console.log("productsCategoriesResp", productsCategoriesResp);
      let productsCategories = productsCategoriesResp.data.data;
      console.log("productsCategories", productsCategories);
      setAllProdCategories(productsCategories);
    };

    getAllProductsCategories();
  }, [loadProducts, reloadProducts, reloadPage]); */
  if (!myProducts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {LoaderComponent}{" "}
      <div
        className={` tableContainer dark:bg-[#2e464f] dark:text-white flex flex-1 justify-center ${
          myProducts.length > 0 && `!mx-auto`
        } lap:min-w-full `}
      >
        <ColsExtract
          {...props}
          myProducts={myProducts}
          setMyProducts={setMyProducts}
          setLoadProducts={setLoadProducts}
          allProdCategories={allProdCategories}
          noProducts={noProducts}
        />
      </div>
    </>
  );
}
