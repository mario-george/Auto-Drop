import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Searchbar({ searchByProd, locale }: any) {
  let isAr = locale === "ar";
  return (
    <>
      <div className=" flex justify-center my-3">
        <div className="w-fit flex">
          <div className="relative ">
            <Input
              placeholder={searchByProd}
              //   value={
              // (table.getColumn("prodName")?.getFilterValue() as string) ?? ""
              //   }
              //   onChange={(event) =>
              // table.getColumn("prodName")?.setFilterValue(event.target.value)
              //   }
              className=" w-[150px] lg:w-[350px] shadow-md rounded-lg !placeholder-opacity-1  placeholder:text-[#b0b0b0] px-4 py-5"
            />
            <div
              className={cn(
                isAr ? ` left-[5%] ` : `right-[5%]`,
                "absolute top-[21%]"
              )}
            >
              <Image
                src={`/client/my-products/searchbar.svg`}
                alt={`search-bar`}
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
