"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { myProduct } from "../data/myProductsSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import ButtonsRenderer from "./Buttons/ButtonsRenderer";
import Image from "next/image";
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
        console.log(row);
        //@ts-ignore
        console.log(row.original.prodImage);
        return (
          <div className="flex justify-center space-s-1 items-center">
            <span className="">
              {(row.getValue("prodName") as any).substring(0, 35)}...
            </span>
            <span>
              <Image
        //@ts-ignore
                src={row.original.prodImage}
                width={25}
                height={25}
                alt="Product Image"
              />
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
          <div className="flex justify-center space-s-1 ">
            <span>{row.getValue("sellPrice")}</span>
            <span>SAR</span>
          </div>
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
          <div className="flex justify-center items-center">
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
        <div className="flex justify-center">{row.getValue("platform")}</div>
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
        <div className="flex justify-center">{row.getValue("inventory")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        //@ts-ignore
        let {_id:id} = row.original;
        return (
        <div>
          <ButtonsRenderer id={id} />
        </div>
      )
    }

    },
  ];
}
