"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchByProd: string;
  unAvProd: string;
  price: string;
  category: string;
  unUpProd: string;
  locale: string;
  setMyProducts: any;
  apply: string;
}

export function DataTableToolbar<TData>({
  table,
  searchByProd,
  unAvProd,
  price,
  category,
  unUpProd,
  locale,
  setMyProducts,
  apply,
}: DataTableToolbarProps<TData>) {
  const [checked, setChecked] = useState(false);
  const [oldProducts, setOldProducts] = useState([]);

  const isFiltered = table.getState().columnFilters.length > 0;
  let filterHandler = () => {
    if (checked) {
      let alreadyFiltered = true;
      setMyProducts((prevProducts: any) => {
        prevProducts.forEach((prod: any) => {
          if (prod.inventory === 0) {
            alreadyFiltered = false;
          }
        });
        if (alreadyFiltered) {
          return prevProducts;
        }
        setOldProducts(prevProducts);
        return prevProducts.filter((prod: any) => {
          return prod.inventory !== 0;
        });
      });
      //save old products
    } else {
      if (oldProducts.length > 0) {
        setMyProducts(oldProducts);
      }
    }
  };

  let isAr = locale === "ar";
  return (
    <div className="flex flex-col space-y-3 tab:space-y-0 tab:flex-row items-center justify-between bg-[#f0f3f4] px-3 py-1 tab:py-4 rounded-md  dark:bg-[#2e464f]">
      <div className="flex flex-col  items-center  space-x-2">
        <div className="relative">
          <Input
            placeholder={searchByProd}
            value={
              (table.getColumn("prodName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("prodName")?.setFilterValue(event.target.value)
            }
            className="placeholder:text-xs w-[150px] lg:w-[350px] shadow-md rounded-lg !placeholder-opacity-1  placeholder:text-[#b0b0b0] dark:bg-white dark:text-black"
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
      <div className="flex  space-s-1 tab:space-s-6 items-center justify-between tab:mx-4 tab:min-w-none">
        <div className="flex items-center space-s-2 ">

          <div className="text-xs tab:text-lg ">{unAvProd}</div>
          <Checkbox
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
            classNameIndicator={`bg-black rounded-lg`}
          />
        </div>
        <Button
          className="bg-[#b29e84] hover:bg-[#b29e84]/90 h-[2rem] tab:h-fit dark:text-white"
          onClick={filterHandler}
        >
          {apply}
        </Button>
      </div>
    </div>
  );
}
