"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

import {useSelector} from 'react-redux'
import SearchProduct from "../../../../_components/shared/ui/SearchProduct";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchByProd: string;
  unAvProd: string;
  noShipping: string;
  unLinkedProd: string;
  price: string;
  category: string;
  unUpProd: string;
  locale: string;
  setMyProducts: any;
  apply: string;
  myProducts: any;
  setColumnFilters:any
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
  apply,unLinkedProd,noShipping,myProducts,setColumnFilters
}: DataTableToolbarProps<TData>) {

  const reloadPage = useSelector((state:any)=>state.products.reloadPage)
  const [checkedUnAvailable, setCheckedUnAvailable] = useState(false);
  const [checkedUnLinked, setCheckedUnLinked] = useState(false);
  const [checkedNoShipping, setCheckedNoShipping] = useState(false);
  const [oldProducts, setOldProducts] = useState([]);

//  / const isFiltered = table.getState().columnFilters.length > 0;
  useEffect(() => {
    // Save the original state of the products when the component mounts
    setOldProducts([]);
  }, [reloadPage]); 
  useEffect(()=>{
    if(myProducts&&myProducts.length>0&&oldProducts.length==0)
      setOldProducts(myProducts)
  },[myProducts])
  let filterHandler = () => {
    console.log("oldProducts",oldProducts)
    let newProducts = [...oldProducts]; 
  
    if (checkedUnAvailable) {
      newProducts = newProducts.filter((prod: any) => prod.inventory !== 0);
    }
  
    if (checkedUnLinked) {
      newProducts = newProducts.filter((prod: any) => prod.salla_product_id !== null);
    }
  
    if (checkedNoShipping) {
      newProducts = newProducts.filter((prod: any) => prod.shippingAvailable !== false);
    }
  
  setMyProducts(newProducts);
  };
/*   let filterHandler = () => {
    if (checkedUnAvailable) {
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
  }; */

  let isAr = locale === "ar";
  return (
    <div className="flex flex-col space-y-3 tab:space-y-0 tab:flex-row items-center justify-between bg-[#f0f3f4] px-3 py-1 tab:py-4 rounded-md  dark:bg-[#2e464f]">
      <div className="flex flex-col  items-center  space-x-2">
        <SearchProduct
          value={
            (table.getColumn("prodName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("prodName")?.setFilterValue(event.target.value)
          }
          placeholder={searchByProd}
          isAr={isAr}
        />
        {/*   <div className="relative">
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
              "absolute top-[35%] tab:top-[28%] lap:top-[20%]"
            )}
          >
            <Image
              src={`/client/my-products/searchbar.svg`}
              alt={`search-bar`}
              width={24}
              height={24}
              className="w-[15px] h-[15px] tab:w-[20px] tab:h-[20px] lap:w-[24px] lap:h-[24px] my-auto"
            />
          </div>
        </div> */}
      </div>
      <div className="flex  space-s-1 tab:space-s-6 items-center justify-between tab:mx-4 tab:min-w-none">
        <div className="flex items-center space-s-2 ">
          <div className="text-xs tab:text-lg ">{unAvProd}</div>
          <Checkbox
            checked={checkedUnAvailable}
            onCheckedChange={() => setCheckedUnAvailable(!checkedUnAvailable)}
            classNameIndicator={`bg-black rounded-lg dark:fill-white dark:bg-white`}
          />
        </div>
        <div className="flex items-center space-s-2 ">
          <div className="text-xs tab:text-lg ">{unLinkedProd}</div>
          <Checkbox
            checked={checkedUnLinked}
            onCheckedChange={() => setCheckedUnLinked(!checkedUnLinked)}
            classNameIndicator={`bg-black rounded-lg dark:fill-white dark:bg-white`}
          />
        </div>
        <div className="flex items-center space-s-2 ">
          <div className="text-xs tab:text-lg ">{noShipping}</div>
          <Checkbox
            checked={checkedNoShipping}
            onCheckedChange={() => setCheckedNoShipping(!checkedNoShipping)}
            classNameIndicator={`bg-black rounded-lg dark:fill-white dark:bg-white`}
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
