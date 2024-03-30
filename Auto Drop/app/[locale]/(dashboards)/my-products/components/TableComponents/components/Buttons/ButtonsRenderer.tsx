import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DialogUnLinkProduct from "./DialogUnLinkProduct";
import useLoader from "@/components/loader/useLoader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setKeyValue } from "@/store/productsSlice";
import { useToast } from "@/components/ui/use-toast";
export default function ButtonsRenderer({
  id,
  setMyProducts,
  salla_product_id,
  setLoadProducts,
  productValuesNumber,
}: any) {
  const { LoaderComponent, setLoading } = useLoader();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();
  const productsState = useSelector((state: any) => state.products);
  const sallaToken = useSelector((state: any) => state.user.sallaToken);

  const { toast } = useToast();
  let { reloadPage, allowButtonAction } = productsState;
  let buttonClassD =
    "rounded-full bg-[#c1121f] w-[2rem] h-[2rem] tab:w-[3rem] tab:h-[3rem]  px-2 py-2 tab:px-0 tab:py-0 hover:cursor-pointer  hover:bg-[#c1121f]/90 ";
  let buttonClassL = `rounded-full w-[2rem] h-[2rem] tab:w-[3rem] tab:h-[3rem]  px-2 py-2 tab:px-0 tab:py-0 hover:cursor-pointer bg-[#ff0000] hover:bg-[#ff0000]/90 `;
  let buttonClassE =
    "rounded-full bg-[#253439] w-[2rem] h-[2rem] tab:w-[3rem] tab:h-[3rem] hover:cursor-pointer  px-2 py-2 tab:px-0 tab:py-0 hover:bg-[#253439]/90";
  let buttonClassS =
    "rounded-full bg-[#f79042] w-[2rem] h-[2rem] tab:w-[3rem] tab:h-[3rem] hover:cursor-pointer  px-2 py-2 tab:px-0 tab:py-0 hover:bg-[#f79042]/90 ";
  let linkProductHandler = async () => {
    if (!sallaToken || sallaToken == "") {
      toast({
        variant: "destructive",
        title: "Please link your account with salla and try again.",
      });

      return;
    }

    if (productValuesNumber > 100) {
      toast({
        variant: "destructive",
        title:
          "Salla allows a maximum of 100 variant for a product please delete some options and try again.",
      });

      return;
    }
    try {
      if (salla_product_id) {
        return;
      }

      dispatch(
        setKeyValue({
          key: "loadingProductTable",
          value: true,
        })
      );
      const res = await axiosInstance.post(
        "aliexpress/product/linkProductSalla/v2",
        { productId: id }
      );
      console.log(res.data);
      setLoadProducts((prev: boolean) => !prev);
      dispatch(setKeyValue({ key: "reloadPage", value: !reloadPage }));
    } catch (err: any) {
      if (err?.response?.data?.message == "SallaToken Not Found.") {
        toast({
          variant: "destructive",
          description: "Please Link your account with salla and try again.",
        });
      }
      console.error(err);
    } finally {
      dispatch(
        setKeyValue({
          key: "loadingProductTable",
          value: false,
        })
      );
    }
  };
  let deleteProductHandler = async () => {
    if (!sallaToken || sallaToken == "") {
      toast({
        variant: "destructive",
        title: "Please link your account with salla and try again.",
      });

      return;
    }
    try {
      dispatch(
        setKeyValue({
          key: "loadingProductTable",
          value: true,
        })
      );
      const res = await axiosInstance.delete(
        `aliexpress/product/deleteProduct/${id}`
      );
      if (res.status >= 200 && res.status < 300) {
        console.log("Product deleted");
        /*      dispatch(
          setKeyValue({
            key: "loadingProductTable",
            value: false,
          })
        );
      */
        dispatch(setKeyValue({ key: "reloadPage", value: !reloadPage }));
      } else {
        console.log("error");
      }
    } catch (err: any) {
      if (err?.response?.data?.message == "SallaToken Not Found.") {
        toast({
          variant: "destructive",
          description: "Please Link your account with salla and try again.",
        });
      }
      console.error(err);
    } finally {
      dispatch(
        setKeyValue({
          key: "loadingProductTable",
          value: false,
        })
      );
    }
  };

  const EditProductHandler = () => {
    router.push(`/${locale}/my-products/${id}`);
  };

  return (
    <div className="flex flex-row-reverse gap-3 transition-all duration-100">
      <div className={buttonClassD} onClick={deleteProductHandler}>
        <Image
          src={`/client/my-products/delete.svg`}
          alt={`delete`}
          width={24}
          height={24}
          className="mx-auto my-auto mt-[15%] tab:mt-[22.5%]"
        />
      </div>

      {salla_product_id ? (
        <DialogUnLinkProduct
          sallaProductId={salla_product_id}
          setLoadProducts={setLoadProducts}
        />
      ) : (
        <div className={buttonClassL} onClick={linkProductHandler}>
          <Image
            src={`/client/my-products/link.svg`}
            alt={`link`}
            width={24}
            height={24}
            className="mx-auto my-auto  mt-[15%] tab:mt-[22.5%]"
          />
        </div>
      )}

      <div className={buttonClassE} onClick={EditProductHandler}>
        <Image
          src={`/client/my-products/edit.svg`}
          alt={`edit`}
          width={24}
          height={24}
          className="mx-auto my-auto  mt-[15%] tab:mt-[22.5%]"
        />
      </div>

      {/*       <div className={buttonClassS}>
        <Image
          src={`/client/my-products/store.svg`}
          alt={`store`}
          width={24}
          height={24}
          className="mx-auto my-auto  mt-[15%] tab:mt-[22.5%]"
        />
      </div> */}
    </div>
  );
}
