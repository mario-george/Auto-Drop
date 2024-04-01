"use client";
import { DataTable } from "./components/data-table";
import Cols from "./components/columns";

export default function ColsExtract(props: any) {
  const {
    myProducts,
    productName,
    sellPrice,
    category,
    platform,
    inventory,
    setMyProducts,setLoadProducts,allProdCategories
  } = props;
  let emptyProducts = false
  if(myProducts=="empty"){
    emptyProducts = true
  }
  return (
    <DataTable
    setMyProducts={setMyProducts}
    allProdCategories={allProdCategories}
    setLoadProducts={setLoadProducts}
    emptyProducts={emptyProducts}
    colData = {   {productName,
      sellPrice,
      category,
      platform,
      inventory,
      setMyProducts,setLoadProducts}}
      data={myProducts}

      {...props}
    />
  );
}
