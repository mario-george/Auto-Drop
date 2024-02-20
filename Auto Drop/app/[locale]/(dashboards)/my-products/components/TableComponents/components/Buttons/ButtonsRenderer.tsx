import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function ButtonsRenderer({ id,setMyProducts }: any) {
  console.log("idddd");
  console.log(id);
  let buttonClassD = "rounded-full bg-[#c1121f] px-2 py-2";
  let buttonClassL = "rounded-full bg-[#008767] px-2 py-2";
  let buttonClassE = "rounded-full bg-[#253439] px-2 py-2";
  let buttonClassS = "rounded-full bg-[#f79042] px-2 py-2";

  let linkProductHandler = async () => {
    const res = await axiosInstance.post(
      "aliexpress/product/linkProductSalla",
      { productId: id }
    );
    console.log(res.data);
  };
  let deleteProductHandler = async () => {
    const res = await axiosInstance.delete(
      `aliexpress/product/deleteProduct/${id}`
    );
    if (res.status >= 200 && res.status < 300) {
      console.log("Product deleted");
      setMyProducts((prevProducts:any) =>{
        return prevProducts.filter((prod:any)=>{
          return prod._id!==id
        })
      })
    } else {
      console.log("error");
    }
  };
  return (
    <div className="flex flex-row-reverse gap-3">
      <Button className={buttonClassD} onClick={deleteProductHandler}>
        <Image
          src={`/client/my-products/delete.svg`}
          alt={`delete`}
          width={24}
          height={24}
        />
      </Button>
      <Button className={buttonClassL} onClick={linkProductHandler}>
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
