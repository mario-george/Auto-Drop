import React from "react";
import { cn } from "../../../../../../../lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ProductCategoriesTags({
  category,
  tag,
  setSelectedCategories,
  categoriesList,
  selectedCategories,
  locale,
}: {
  category: string;
  tag: string;
  setSelectedCategories: (value: string[] | null) => void;
  categoriesList: any;
  selectedCategories: string[];
  locale?: string;
}) {
  let isAr = locale=="ar"
  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 gap-4 my-4 min-w-full">
        <div className={cn(isAr ? "border-l" : "border-r", "border-gray-400")}>
          <span>{category}</span>{" "}
          <Select
            onValueChange={(value: string) => {
              let valid = true;
              selectedCategories?.forEach((val: string) => {
                if (val == value) valid = false;
              });
              if (!valid) {
                return;
              }
              console.log("change", value);
              //@ts-ignore
              setSelectedCategories((prevCategories: any) => {
                if (!prevCategories) {
                  return [value];
                }
                return [...prevCategories, value];
              });
            }}
          >
            <SelectTrigger className="mt-3 max-w-[90%] bg-[#edf5f9] text-black text-right text-xs mm:text-sm ml:text-md tab:text-lg">
              <SelectValue placeholder={category} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{category}</SelectLabel>

                {categoriesList.map(
                  (category: { id: string; name: string }) => (
                    <SelectItem
                      key={category.id}
                      value={category.name}
                      className="z-[50] relative text-xs mm:text-sm ml:text-md tab:text-lg"
                    >
                      {category.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
          {/* 
element
 */}
          {selectedCategories?.map((category: any) => {
            return (
              <>
                <div
                  className="rounded-lg relative bg-[#EDF5F9] px-8 py-2 w-fit  mt-3"
                  key={category}
                >
                  <div
                    className="absolute top-0 left-0 rounded-full hover:cursor-pointer"
                    onClick={() => {
                      //@ts-ignore
                      setSelectedCategories((prevCategories: any) => {
                        console.log(prevCategories);
                        console.log(
                          prevCategories.filter(
                            (item: any) => item !== category
                          )
                        );
                        return prevCategories.filter(
                          (item: any) => item !== category
                        );
                      });
                    }}
                  >
                    <div className="bg-[#000000] rounded-full px-[6px] py-[0px] text-white">
                      x
                    </div>
                  </div>
                  <span>{category}</span>
                </div>
              </>
            );
          })}
        </div>
        <div>
          <span>{tag}</span>{" "}
          <Select>
            <SelectTrigger className="mt-3 bg-[#edf5f9] max-w-[90%]">
              <SelectValue placeholder={tag} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{tag}</SelectLabel>
                {/*           <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </div>
      </div>
    </div>
  );
}
