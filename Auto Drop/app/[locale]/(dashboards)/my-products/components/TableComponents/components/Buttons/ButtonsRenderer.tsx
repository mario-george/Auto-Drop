import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function ButtonsRenderer() {
  let buttonClassD = "rounded-full bg-[#c1121f] px-2 py-2"
  let buttonClassL = "rounded-full bg-[#008767] px-2 py-2"
  let buttonClassE = "rounded-full bg-[#253439] px-2 py-2"
  let buttonClassS = "rounded-full bg-[#f79042] px-2 py-2"
    return (
    <div className="flex flex-row-reverse gap-3">
      <Button className={buttonClassD}>
        <Image
          src={`/client/my-products/delete.svg`}
          alt={`delete`}
          width={24}
          height={24}
        />
      </Button><Button  className={buttonClassL}>
<Image
        src={`/client/my-products/link.svg`}
        alt={`link`}
        width={24}
        height={24}
      />
</Button>
      <Button className={buttonClassE}>
      <Image
        src={`/client/my-products/edit.svg`}
        alt={`edit`}
        width={24}
        height={24}
      />
        </Button>
       
    
      
 <Button className={buttonClassS}>
      <Image
        src={`/client/my-products/store.svg`}
        alt={`store`}
        width={24}
        height={24}
      />
</Button>

    </div>
  );
}
