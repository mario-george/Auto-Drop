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
    setMyProducts,setLoadProducts,
  } = props;
  return (
    <DataTable
    setMyProducts={setMyProducts}
    setLoadProducts={setLoadProducts}
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
