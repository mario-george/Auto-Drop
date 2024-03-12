import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface SearchProductProps {
  placeholder: string;
  value: string;
  isAr: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}
export default function SearchProduct({
  placeholder,
  value,
  isAr,
  onChange,className
}: Partial<SearchProductProps>) {
  /*   if (!onChange) {
    onChange = () => {};
  } */
  return (
    <div className={`${className}`}>
      <div className="relative w-fit">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
      </div>
    </div>
  );
}
