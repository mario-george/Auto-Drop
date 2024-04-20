"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
// import { myProduct } from "../data/myProductsSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import ButtonsRenderer from "./Buttons/ButtonsRenderer";
import Image from "next/image";
import { myOrder } from "../data/myOrdersSchema";
import OrderStatusButton from "./Buttons/OrderStatusButton";
interface ColProps {
/*   productName: string;
  sellPrice: string;
  category: string;
  platform: string;
  inventory: string;
  setMyProducts: any;
  setLoadProducts: any;
  rowSelection?: any; */
  translationMessages:{[key:string]:string}
}
export default function Cols(props: ColProps): ColumnDef<myOrder>[] {
/*   const {
    productName,
    sellPrice,
    category,
    platform,
    inventory,
    setMyProducts,
    setLoadProducts,rowSelection
  } = props; */
let {translationMessages}= props
let { sender,orderStatus,orderSource,amount,date,orderNumber } =translationMessages
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
      accessorKey: "sender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={sender} />
      ),
      cell: ({ row }) => {
        // console.log(row);
        //@ts-ignore
        // console.log(row.original.prodImage);
        return (
          <div className="flex justify-center space-s-1 items-center">
            <span className="">
              {row.getValue("sender") as any}
            </span>
         {/*    <span>
              <Image
                //@ts-ignore
                src={row.original.prodImage}
                width={25}
                height={25}
                alt="Product Image"
              />
            </span> */}
          </div>
        );
      },
    },
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={orderNumber} />
      ),
      cell: ({ row }) => {
        let price: any = row.getValue("orderNumber");
        //@ts-ignore
        // let { variantsArr } = row.original;
      /*   if (price == 0 || price == null) {
          price = variantsArr[0].offer_sale_price;
        } */
        return (
          <div className="flex justify-center space-s-1 ">
            <span>{row.getValue("orderNumber")}</span>
            {/* <span>SAR</span> */}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={orderStatus} />
      ),
      cell: ({ row }) => {
        // row.getValue('category')
        return (
          <div className="flex justify-center items-center">

<OrderStatusButton
orderStatus={row.getValue("orderStatus")}
translationMessages={translationMessages}
/>
            
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
      cell: ({ row }) => (
        <div className="flex justify-center">{row.getValue("date")}</div>
      ),
      // enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={amount} />
      ),

      cell: ({ row }) => {
     
      return<div className="flex justify-center space-s-1 ">
            <span>{row.getValue("amount")}</span>
            <span>SAR</span>
          </div>      },
      // enableSorting: false,
      enableHiding: false,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        //@ts-ignore
        let { _id: id, order_id } = row.original;
        console.log("ROW",row.original)
        console.log("_IDD",id)
        return (
          <div>
            <ButtonsRenderer
              // setMyProducts={setMyProducts}
              id={id}
              // salla_product_id={salla_product_id}
              // setLoadProducts={setLoadProducts}
              order_id={order_id}
            />
          </div>
        );
      },
    },
  ];
}
