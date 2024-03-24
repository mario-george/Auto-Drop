import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";

interface CategoryObject {
  name: string;
  path: string;
}

export default function useCategories({
  categories,
  allProducts,
  smartDevices,
  electronics,
  clothes,
  accessories,
  perfumes,
  decor,
  sportsSupplies,
  stationary,
  cosmeticProducts,setSearchInfo
}: {
  categories: string;
  allProducts: string;
  smartDevices: string;
  electronics: string;
  clothes: string;
  accessories: string;
  perfumes: string;
  decor: string;
  sportsSupplies: string;
  stationary: string;
  cosmeticProducts: string;
  setSearchInfo:any
}) {
  const [currentCategory, setCurrentCategory] = useState("allProducts");

  const changeCategoryHandler = (value: string) => {
    setCurrentCategory(value);
    setSearchInfo({searchUrl:'',categoryName:value,type:"category",imageBytes:null})
  };
  let categoriesArray = [
    { name: smartDevices, path: "smartDevices" },
    { name: electronics, path: "electronics" },
    { name: clothes, path: "clothes" },
    { name: accessories, path: "accessories" },

    { name: perfumes, path: "perfumes" },

    ,
    { name: decor, path: "decor" },

    { name: stationary, path: "stationary" },
    { name: cosmeticProducts, path: "cosmeticProducts" },
    { name: sportsSupplies, path: "sportsSupplies" },
  ];
const CategoriesRendererComponent =(<>
      <div className="text-2xl my-3">{categories}</div>
      <div className="lap:px-6 bg-white rounded-lg shadow px-2 py-2 flex items-center overflow-x-auto">
        <div
          className="flex space-s-3 items-center dark:text-[#253439] hover:cursor-pointer "
          onClick={() => {
            setCurrentCategory("allProducts");
          }}
        >
          {allProducts}
          <Separator
            className="py-3 w-[1px] bg-black mx-2 dark:bg-black"
            orientation="vertical"
          />
        </div>
        <div className="flex space-s-3">
          {categoriesArray.map((categoryObject: CategoryObject | undefined) => {
            if (
              !categoryObject ||
              !categoryObject.path ||
              !categoryObject.name
            ) {
              return <></>;
            }
            return (
              <div
                key={categoryObject.path}
                className="hover:cursor-pointer tab:text-[15px] "
                onClick={() => {
                  changeCategoryHandler(categoryObject.path);
                }}
              >
                <div className="text-[#253439] whitespace-nowrap dark:text-[#253439]">
                  {categoryObject.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>)


return {currentCategory,CategoriesRendererComponent}
}
