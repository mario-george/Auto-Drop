import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import Cols from "./columns";
import { DataTable } from "./data-table";
import ColsExtract from "./ColumnsExtractor";

// Simulate a database read for tasks.
async function getLatestOrders() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "app/[locale]/(dashboards)/_components/home-page/TableComponents/latestOrders.json"
    )
  );

  return JSON.parse(data.toString());
}
interface latestOrdersProps {
  details: string;
  date: string;
  latestRequests: string;
  CustomerName: string;
  orderStatus: string;
  amount: string;
}
export default async function TableRenderer(props: latestOrdersProps) {
  const latestOrders = await getLatestOrders();

  return (
    <>
      <div className="flex flex-col  bg-white md:py-4 md:px-6 dark:bg-[#2e464f] dark:text-white">
        <ColsExtract {...props} latestOrders={latestOrders} />
      </div>
    </>
  );
}
