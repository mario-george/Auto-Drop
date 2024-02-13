import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import Cols from "./components/columns";
import { DataTable } from "./components/data-table";
import ColsExtract from "./ColumnsExtractor";

// Simulate a database read for tasks.
async function getMyProducts() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "app/[locale]/(dashboards)/my-products/components/TableComponents/data/myproducts.json"
    )
  );

  return JSON.parse(data.toString());
}
interface myProductProps {
  productName: string;
  sellPrice: string;
  category: string;
  platform: string;
  inventory: string;
  searchByProd: string;
  unAvProd: string;
  unUpProd: string;
  price: string;
  locale: string;
}
export default async function TaskPage(props: myProductProps) {
  const myProducts = await getMyProducts();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white">
        <ColsExtract {...props} myProducts={myProducts} />
      </div>
    </>
  );
}
