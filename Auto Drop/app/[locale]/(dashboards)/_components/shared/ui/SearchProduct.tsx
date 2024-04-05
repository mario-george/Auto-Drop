import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ImageProductsSearch from "@/components/icons/clientPages/ImageProductsSearch";
import { RefObject } from "react";
interface SearchProductProps {
  placeholder: string;
  value: string;
  isAr: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  productSearchBar?: boolean;

  updateImageHandler?: any;
  fileInputRef?: any;
  handleFileChange?: any;
  triggerSearchByUrl?: any;
  urlInputRef?:RefObject<HTMLInputElement>
}
export default function SearchProduct({
  placeholder,
  value,
  isAr,
  onChange,
  className,
  productSearchBar,
  updateImageHandler,
  fileInputRef,
  handleFileChange,triggerSearchByUrl,urlInputRef
}: Partial<SearchProductProps>) {
  /*   if (!onChange) {
    onChange = () => {};
  } */

  if (productSearchBar) {
    return (
      <div className={`${className}`}>
        <div className="relative w-fit">
          <Input
            placeholder={placeholder}
            // value={value}
            // onChange={onChange}
            className="placeholder:text-xs px-14  lg:w-[350px] tab:h-[3rem] shadow-md rounded-lg !placeholder-opacity-1  placeholder:text-[#b0b0b0] bg-white dark:text-black"
            ref={urlInputRef}
      />

          <div className="hover:bg-black/20 rounded-full ">
          <div
            className={cn(
              isAr ? ` left-[5%] ` : `right-[5%]`,
              "absolute top-[35%] tab:top-[28%] lap:top-[20%]",""
            )}
            onClick={triggerSearchByUrl}
          >
            <Image
              src={`/client/my-products/searchbar.svg`}
              alt={`search-bar`}
              width={24}
              height={24}
              className="w-[15px] h-[15px] tab:w-[20px] tab:h-[20px] lap:w-[24px] lap:h-[24px] my-auto"
            />
          </div>
          </div>
          <div
            className={cn(
              isAr ? ` right-[5%] ` : `left-[5%]`,
              "absolute top-[20%] tab:top-[28%] lap:top-[20%]"
            )}
            onClick={updateImageHandler}
          >
            <ImageProductsSearch />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="relative w-fit">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="placeholder:text-xs w-[150px] lg:w-[350px] shadow-md rounded-lg !placeholder-opacity-1  placeholder:text-[#b0b0b0] bg-white dark:text-black"
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
      </div>
    </div>
  );
}
