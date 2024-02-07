"use client";
import { DataTable } from "./data-table";
import Cols from "./columns";
import Header from "./Header";

export default function ColsExtract(props: any) {
  const { latestOrders, amount, date, details, CustomerName, orderStatus } =
    props;
  return (
    <>
      <Header title={props.latestRequests} />
      <DataTable
        data={latestOrders}
        columns={Cols({
          CustomerName,
          amount,
          date,
          details,
          orderStatus,
        })}
        {...props}
      />
    </>
  );
}
