"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../data/schema";
import { myProduct } from "../data/myProductsSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import ButtonsRenderer from "./Buttons/ButtonsRenderer";

interface ColProps {
  productName: string;
  sellPrice: string;
  category: string;
  platform: string;
  inventory: string;
}
export default function Cols(props: ColProps): ColumnDef<myProduct>[] {
  const { productName, sellPrice, category, platform, inventory } = props;
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
      accessorKey: "prodName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={productName} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("prodName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "sellPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={sellPrice} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">{row.getValue("sellPrice")}</div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={category} />
      ),
      cell: ({ row }) => {
        // row.getValue('category')
        return (
          <div className="flex w-[100px] items-center">
            {row.getValue("category")}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "platform",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={platform} />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("platform")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "inventory",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={inventory} />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("inventory")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <div>
          <ButtonsRenderer />
        </div>
      ),
    },
  ];
}
