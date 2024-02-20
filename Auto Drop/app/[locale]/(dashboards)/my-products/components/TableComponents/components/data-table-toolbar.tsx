"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchByProd: string;
  unAvProd: string;
  price: string;
  category: string;
  unUpProd: string;
  locale: string;
}

export function DataTableToolbar<TData>({
  table,
  searchByProd,
  unAvProd,
  price,
  category,
  unUpProd,
  locale,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  let filterHandler = () => {};
 
  let isAr = locale === "ar";
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
            className=" w-[150px] lg:w-[350px] shadow-md rounded-lg !placeholder-opacity-1  placeholder:text-[#b0b0b0]"
          />
          <div
            className={cn(
              isAr ? ` left-[5%] ` : `right-[5%]`,
              "absolute top-[20%]"
            )}
          >
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
