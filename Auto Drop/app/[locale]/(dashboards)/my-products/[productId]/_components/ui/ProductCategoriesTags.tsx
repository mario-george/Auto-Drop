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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IoMdSend } from "react-icons/io";
export default function ProductCategoriesTags({
  category,
  tag,
  setSelectedCategories,
  categoriesList,
  selectedCategories,
  locale,
  setSelectedTags,
  selectedTags,
}: {
  category: string;
  tag: string;
  setSelectedCategories: (value: string[] | null) => void;
  categoriesList: any;
  selectedCategories: string[];
  selectedTags: string[];
  setSelectedTags: (value: string[] | null) => void;
  locale?: string;
}) {
  let isAr = locale == "ar";
  const addTagHandler = () => {

    if(inputRef.current?.value=="") return 
    let val: string = inputRef.current?.value ?? "";
    console.log("val", val);
    console.log(val);
    //@ts-ignore
    setSelectedTags((prevTags: any) => {
      return prevTags ? [...prevTags, val] : [val];
    });
    if(inputRef.current) inputRef.current.value = ""
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      {" "}
      <div className="grid tab:grid-cols-2 gap-4 my-4 min-w-full">
        <div className={cn(isAr ? "tab:border-l" : "tab:border-r", "border-gray-400")}>
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
                    <div className=" ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.6133"
                          cy="12.3652"
                          r="10"
                          fill="#2E464F"
                          stroke="white"
                        />
                        <line
                          x1="7.4863"
                          y1="8.85141"
                          x2="15.4336"
                          y2="15.481"
                          stroke="white"
                        />
                        <line
                          x1="14.3659"
                          y1="8.1459"
                          x2="8.95408"
                          y2="16.4352"
                          stroke="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="dark:text-[#111111]">{category}</span>
                </div>
              </>
            );
          })}
        </div>

        <div>
<div className="tab:hidden my-2">
  <Separator/>
</div>

          <span>{tag}</span>{" "}
          <div className="flex space-s-3 items-center my-3">
            {!isAr && (
              <>
                {" "}
                <button
                  type="button"
                  className="duration-200 transition-all hover:fill-black hover:text-green-300"
                  onClick={addTagHandler}
                >
                  <span>
                    <IoMdSend />
                  </span>
                </button>
              </>
            )}

            <Input
              ref={inputRef}
              className="max-w-[90%] bg-[#edf5f9] text-black text-right text-xs mm:text-sm ml:text-md tab:text-lg"
            />
            {isAr && (
              <>
                {" "}
                <button
                  type="button"
                  className="duration-200 transition-all hover:fill-black hover:text-green-300"
                  onClick={addTagHandler}
                >
                  <span>
                    <IoMdSend />
                  </span>
                </button>
              </>
            )}
          </div>
          {selectedTags?.map((tag: any) => {
            return (
              <>
                <div
                  className="rounded-lg relative bg-[#EDF5F9] px-8 py-2 w-fit  mt-3"
                  key={tag}
                >
                  <div
                    className="absolute top-0 left-0 rounded-full hover:cursor-pointer"
                    onClick={() => {
                      //@ts-ignore
                      setSelectedTags((prevTags: any) => {
                        return prevTags.filter((item: any) => item !== tag);
                      });
                    }}
                  >
                    <div className=" ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.6133"
                          cy="12.3652"
                          r="10"
                          fill="#2E464F"
                          stroke="white"
                        />
                        <line
                          x1="7.4863"
                          y1="8.85141"
                          x2="15.4336"
                          y2="15.481"
                          stroke="white"
                        />
                        <line
                          x1="14.3659"
                          y1="8.1459"
                          x2="8.95408"
                          y2="16.4352"
                          stroke="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="dark:text-[#111111]">{tag}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
