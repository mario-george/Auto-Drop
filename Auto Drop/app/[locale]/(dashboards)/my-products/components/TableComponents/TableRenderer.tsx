import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import Cols from "./components/columns";
import { DataTable } from "./components/data-table";
import ColsExtract from "./ColumnsExtractor";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import ProductsFetch from "./ProductsFetch";
// Simulate a database read for tasks.
async function getMyProducts() {
  /* const data = await fs.readFile(
    path.join(
      process.cwd(),
      "app/[locale]/(dashboards)/my-products/components/TableComponents/data/myproducts.json"
    )
  ); */
  const data2 = await axiosInstance.get("/aliexpress/product/getProducts");
  return JSON.parse(data2.toString());
}
interface myProductProps {
  productName: string;
  sellPrice: string;
  category: string;
  platform: string;
  inventory: string;
  searchByProd: string;
  unAvProd: string;

  noShipping: string;
  unLinkedProd: string;

  unUpProd: string;
  price: string;
  locale: string;
  apply: string;
  translationMessages :{ [key: string]: string }
}
export default async function MyProductsTable(props: myProductProps) {
  const getMyProductsData = async () => {
    const data2 = await axiosInstance.get("/aliexpress/product/getProducts");
    return JSON.parse(data2.toString());
  };
  const myProducts: any = [];
  return (
    <>
      <ProductsFetch {...props}>
        {/*       <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white">
        <ColsExtract {...props} myProducts={myProducts} />
      </div> */}
      </ProductsFetch>
    </>
  );
}
