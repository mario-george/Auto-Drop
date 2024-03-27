"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import Image from "next/image";
// import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
// import { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
// import SearchProduct from "../../../../_components/shared/ui/SearchProduct";

// import useMultiSelectCategories from "./ui/useMultiSelectCategories";
interface DataTableToolbarProps<TData> {
  /*   searchByProd: string;
  unAvProd: string;
  noShipping: string;
  unLinkedProd: string;
  price: string;
  category: string;
  unUpProd: string;
  setMyProducts: any;
  apply: string;
  myProducts: any;
  allProdCategories:any[] */
  table?: Table<TData>;
  locale: string;
  translationMessages: { [key: string]: string };
  orders: any[];
}

export function DataTableToolbar<TData>({
  table,
  translationMessages,
  locale,
  // orders
/*   searchByProd,
  unAvProd,
  price,
  category,
  unUpProd,
  setMyProducts,
  apply,
  unLinkedProd,
  noShipping,
  myProducts,
  allProdCategories, */
}: DataTableToolbarProps<TData>) {
  // const reloadPage = useSelector((state: any) => state.products.reloadPage);
  // const [checkedUnAvailable, setCheckedUnAvailable] = useState(true);
  // const [checkedUnLinked, setCheckedUnLinked] = useState(true);
  // const [checkedNoShipping, setCheckedNoShipping] = useState(true);
  // const [oldProducts, setOldProducts] = useState([]);
 /*  let { selected: selectedCategories, MultiCategoriesSelectBox } =
    useMultiSelectCategories({ translationMessages, category }) as any; */
  //  / const isFiltered = table.getState().columnFilters.length > 0;
 /*  useEffect(() => {
    // Save the original state of the products when the component mounts
    setOldProducts([]);
  }, [reloadPage]);
  useEffect(() => {
    if (myProducts && myProducts.length > 0 && oldProducts.length == 0)
      setOldProducts(myProducts);
  }, [myProducts]);
  let filterHandler = () => {
    console.log("oldProducts", oldProducts);
    let newProducts = [...oldProducts];

    if (!checkedUnAvailable) {
      newProducts = newProducts.filter((prod: any) => prod.inventory !== 0);
    }

    if (!checkedUnLinked) {
      newProducts = newProducts.filter(
        (prod: any) => prod.salla_product_id !== null
      );
    }

    if (!checkedNoShipping) {
      newProducts = newProducts.filter(
        (prod: any) => prod.shippingAvailable !== false
      );
    }
    console.log("allProdCategories", allProdCategories);
    selectedCategories = selectedCategories.map((cat: any) => cat.value);
    console.log("selectedCategories", selectedCategories);
    if (allProdCategories?.length > 0 && selectedCategories?.length > 0) {
      newProducts = newProducts.filter((prod: any, index: number) => {
        let currProd = allProdCategories[index].categoriesSalla;
        let matchCategory = false;
        if (currProd?.length == 0) {
          return false;
        }
        currProd.forEach((cat: number) => {
          console.log("cat", cat);
          if (selectedCategories?.includes(cat)) {
            // console.log("MATCHEEED")
            matchCategory = true;
          }
        });
        return matchCategory;
      });
    }
    setMyProducts(newProducts);
  }; */
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
        {translationMessages.orders}
       {/*  <SearchProduct
          value={
            (table.getColumn("prodName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("prodName")?.setFilterValue(event.target.value)
          }
          placeholder={searchByProd}
          isAr={isAr} */}
        {/* /> */}
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
{/*         <div className="flex items-center space-s-2 ">
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
        <div className="flex items-center space-s-2 ">
          <div className="text-xs tab:text-lg ">{category}</div>
          {MultiCategoriesSelectBox}
        </div>

        <Button
          className="bg-[#b29e84] hover:bg-[#b29e84]/90 h-[2rem] tab:h-fit dark:text-white"
          onClick={filterHandler}
        >
          {apply}
        </Button> */}
      </div>
    </div>
  );
}
