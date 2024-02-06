"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchByProd: string;
  unAvProd: string;
  price: string;
  category: string;
  unUpProd: string;
}

export function DataTableToolbar<TData>({
  table,
  searchByProd,
  unAvProd,
  price,
  category,
  unUpProd,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  let filterHandler = () => {};
  return (
    <div className="flex items-center justify-between bg-[#f0f3f4] px-3 py-4 rounded-md">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder={searchByProd}
            value={
              (table.getColumn("prodName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("prodName")?.setFilterValue(event.target.value)
            }
            className=" w-[150px] lg:w-[350px] shadow-md rounded-lg"
          />
          <div className="absolute left-[5%] top-[25%]">
            <Image
              src={`/client/my-products/searchbar.svg`}
              alt={`search-bar`}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      <Button
        className="bg-[#b29e84] hover:bg-[#b29e84]/90 "
        onClick={filterHandler}
      >
        Confirm
      </Button>

    </div>
  );
}
