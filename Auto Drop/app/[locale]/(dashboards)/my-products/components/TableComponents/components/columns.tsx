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
  setMyProducts: any;
  setLoadProducts: any;
  rowSelection?: any;
}
export default function Cols(props: ColProps): ColumnDef<myProduct>[] {
  const {
    productName,
    sellPrice,
    category,
    platform,
    inventory,
    setMyProducts,
    setLoadProducts,rowSelection
  } = props;
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
              {(row.getValue("prodName") as any)?.substring(0, 35)}...
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
        let price: any = row.getValue("sellPrice");
        //@ts-ignore
        // let { variantsArr } = row.original;
      /*   if (price == 0 || price == null) {
          price = variantsArr[0].offer_sale_price;
        } */
        return (
          <div className="flex justify-center space-s-1 ">
            <span>{price}</span>
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

      cell: ({ row }) => {
        let inventory: any = row.getValue("inventory");
        //@ts-ignore
        // let { variantsArr } = row.original;
       /*  if (inventory == 0 || inventory == null) {
          inventory = variantsArr[0].sku_available_stock;
        } */
        return <div className="flex justify-center">{inventory}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        console.log(rowSelection)
        //@ts-ignore
        let { _id: id, salla_product_id ,productValuesNumber} = row.original;
        return (
          <div>
            <ButtonsRenderer
              setMyProducts={setMyProducts}
              id={id}
              salla_product_id={salla_product_id}
              setLoadProducts={setLoadProducts}
              productValuesNumber={productValuesNumber} 
            />
          </div>
        );
      },
    },
  ];
}
