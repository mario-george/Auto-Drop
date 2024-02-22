import { Button } from "@/components/ui/button";

export default function ProductEditHeader({ UploadProduct, AddToCart }: any) {
  const uploadProductHandler = () => {};
  const addToCartHandler = () => {};
  const toggleLang = (lang: string) => {};
  return (
    <>
    <div className="flex space-s-3">

      <Button
        className="bg-[#40a58d] text-white"
        onClick={uploadProductHandler}
      >
        {UploadProduct}
      </Button>
      <Button className="bg-white text-black" onClick={addToCartHandler}>
        {AddToCart}
      </Button>

      <Button
        className="bg-[#253439] text-white hover:bg-[#253439]"
        onClick={() => {
          toggleLang("ar");
        }}
      >
        AR
      </Button>
      <Button
        className="text-[#959595] bg-[#d1d1d1]"
        onClick={() => {
          toggleLang("en");
        }}
      >
        EN
      </Button>
    </div>
    </>
  );
}
