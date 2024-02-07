"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { latestOrder } from "./latestOrdersSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import ButtonsRenderer from "./Buttons/ButtonsRenderer";
import OrderStatusButton from "./Buttons/OrderStatusButton";

interface ColProps {
  CustomerName: string;
  orderStatus: string;
  amount: string;
  details: string;
  date: string;
}
export default function Cols(props: ColProps): ColumnDef<latestOrder>[] {
  const { date, amount, orderStatus, CustomerName, details } = props;
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "CustomerName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={CustomerName}
          className=""
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="">
            <span className="flex items-center justify-center">
              {row.getValue("CustomerName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={orderStatus} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <OrderStatusButton orderStatus={row.getValue("orderStatus")} />
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={date} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row.getValue("date")}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={amount} />
      ),
      cell: ({ row }) => (
        <div className=" whitespace-nowrap flex items-center justify-center ">
          {row.getValue("amount")}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <div>
          <ButtonsRenderer details={details} />
        </div>
      ),
    },
  ];
}
