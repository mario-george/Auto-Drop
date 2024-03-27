"use client";
import { DataTable } from "./components/data-table";
import Cols from "./components/columns";

export default function ColsExtract(props: any) {
/*   const {
    myProducts,
    productName,
    sellPrice,
    category,
    platform,
    inventory,
    setMyProducts,setLoadProducts,allProdCategories
  } = props; */
  let {translationMessages,orders} = props
  return (
    <DataTable
    // setMyProducts={setMyProducts}
    // allProdCategories={allProdCategories}
    // setLoadProducts={setLoadProducts}
    colData = {   {translationMessages}
    }
      data={orders}

      {...props}
    />
  );
}
