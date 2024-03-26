import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import Cols from "./components/columns";
import { DataTable } from "./components/data-table";
import ColsExtract from "./ColumnsExtractor";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import OrdersFetch from "./OrdersFetch";
// Simulate a database read for orders.
async function getOrders() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "app/[locale]/(dashboards)/orders/components/TableComponents/data/myorders.json"
    )
  );
  // const data2 = await axiosInstance.get("/orders/");
  return JSON.parse(data.toString());
}
interface myOrdersProps {

  translationMessages :{ [key: string]: string }
}
export default async function OrdersTable(props: myOrdersProps) {
/*   const getOrders = async () => {
    const data2 = await axiosInstance.get("/orders");
    return JSON.parse(data2.toString());
  }; */
  let orders :any= await getOrders() 
  return (
    <>
      <OrdersFetch {...props} orders={orders}/>


    </>
  );
}
