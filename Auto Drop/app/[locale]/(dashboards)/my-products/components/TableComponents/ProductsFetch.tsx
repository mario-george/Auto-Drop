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
  const [allProdCategories, setAllProdCategories] = useState([]);
  const [loadProducts, setLoadProducts] = useState(false);
  const reloadProducts = useSelector(
    (state: any) => state.products.reloadProducts
  );
  const reloadPage = useSelector((state: any) => state.products.reloadPage);
  const dispatch = useDispatch();
  useEffect(() => {
    let getProductsInfo=async()=>{

let fetchInfoUrls = ["/aliexpress/product/getProducts","/salla/getProductsCategories"]
let fetchInfoPromises =  fetchInfoUrls.map((url:string)=>{
return  axiosInstance.get(url)
})
try{
let fetchInfoResolved = await Promise.allSettled(fetchInfoPromises)
console.log("fetchInfoResolved",fetchInfoResolved)  
fetchInfoResolved.forEach((resp,i:number)=>{
console.log("resp",resp)
  if(resp.status=="rejected"){
    throw new Error("Promise Failed" + resp.reason)
  }
if(i==0){
setMyProducts(
  resp.value.data.userProducts.map((product: any) => {
    return {
      ...product,
      prodName: product.name,
      category:
        product.category_name || product.first_level_category_name,
      prodImage: product.images[0].original,
      sellPrice: product.price,
      inventory: product.quantity,
      platform: props.locale == "ar" ? "علي اكسبرس" : "Aliexpress",
    };
  })
);
}else{
let productsCategories = resp.value.data.data;
// console.log("productsCategories", productsCategories);
setAllProdCategories(productsCategories);
}
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

})
}catch(err){
console.error(err)
}
    }
    // const getMyProductsData = async () => {
    /*   const data2 = await axiosInstance.get("/aliexpress/product/getProducts");
      console.log(data2.data.userProducts);
      setMyProducts(
        data2.data.userProducts.map((product: any) => {
          return {
            ...product,
            prodName: product.name,
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
      ); */
    // };

    // getMyProductsData();
    // getMyProductsData()
    getProductsInfo()
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
        }`}
      >
        <ColsExtract
          {...props}
          myProducts={myProducts}
          setMyProducts={setMyProducts}
          setLoadProducts={setLoadProducts}
          allProdCategories={allProdCategories}
        />
      </div>
    </>
  );
}
