import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
export default function Categories({
  categories,
  allProducts,
}: {
  categories: string;
  allProducts: string;
}) {
  return (
    <>
      <div className="text-2xl my-3">{categories}</div>
      <div className="bg-white rounded-lg shadow px-2 py-2 flex items-center">
        <div className="flex space-s-3 items-center">
          {allProducts}
          <Separator
            className="py-3 w-[1px] bg-black mx-2"
            orientation="vertical"
          />
        </div>
      </div>
    </>
  );
}
