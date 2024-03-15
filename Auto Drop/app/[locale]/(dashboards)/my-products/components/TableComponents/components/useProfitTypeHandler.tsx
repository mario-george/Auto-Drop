import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@chakra-ui/react";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import { useToast } from "@/components/ui/use-toast";
import useLoader from "@/components/loader/useLoader";
import { useDispatch } from "react-redux";
import { setKeyValue } from "@/store/productsSlice";
import { useLocale } from "next-intl";
export default function useProfitTypeHandler(props: any) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  /*   const reloadProducts = useSelector(
    (state: any) => state.products.reloadProducts
  ); */
  let { profitType, percentage, number, upProducts, val } = props;
  const productsState = useSelector((state: any) => state.products);
  const sallaToken = useSelector((state: any) => state.user.sallaToken);
console.log("sallaToken",sallaToken)
  let { allowButtonAction } = productsState;
  console.log("allowButtonAction", allowButtonAction);
  let { currentProductsList, currentSelectedProducts } = productsState;
  const [profitChoosenType, setProfitChoosenType] = useState("percentage");
  const [commissionVal, setCommissionVal] = useState(0);
  console.log("currentProductsList", currentProductsList);
  console.log("currentSelectedProducts", currentSelectedProducts);
  const { LoaderComponent, setLoading } = useLoader();
  const locale = useLocale();
  const linkProductsToSallaHandler = async () => {
    /*   if(!allowButtonAction){
return
    } */
    // setLoading(true);
    let selectedProds: any = currentProductsList.filter(
      (_: any, index: number) => currentSelectedProducts[index]
    );

    if ( selectedProds.length == 0) {
      toast({
        variant: "destructive",
        title: "No product was selected please try again.",
      });
     

    
      return
    }
    if (!sallaToken || sallaToken=="" ) {
      toast({
        variant: "destructive",
        title: "Please link your account with salla and try again.",
      });
     

    
      return
    }
    dispatch(
      setKeyValue({
        key: "loadingProductTable",
        value: true,
      })
    );
    console.log("selectedProds.length",selectedProds.length)
   /*  if (selectedProds.length == 0) {
      toast({
        variant: "destructive",
        title: "No product was selected please try again.",
      });
      setTimeout(()=>{
        setKeyValue({
          key: "loadingProductTable",
          value: false,
        })


      },1000)
      return
    } */

    let promisesArr = selectedProds?.map((product: any) => {
      let { salla_product_id, _id: id } = product;
      /*       if (salla_product_id) {
        toast({
          variant: "default",
          title: "Product is already linked " + product.name.slice(0, 12),
        });
        return;
      } */
      let profitChoosenTypeName = "number";
      let commissionPercentage = false;
      if (
        profitChoosenType == percentage ||
        profitChoosenType == "percentage"
      ) {
        profitChoosenTypeName = "percentage";
        commissionPercentage = true;
      }
      console.log("commissionVal", commissionVal);
      console.log("commissionPercentage", commissionPercentage);
      let data = {
        name: product.name,
        vendor_commission: commissionVal,
        metadata_description: product.metadata_description,
        metadata_title: product.metadata_title,
        description: product.description,
        commissionPercentage,
        showDiscountPrice: false,
      };
      const res = axiosInstance.patch(
        `aliexpress/product/updateProduct/${product._id}`,
        data
      );

      // console.log(res.data);
      // setLoadProducts((prev: boolean) => !prev);
      return res;
    });
    try {
      let promisesSettled = await Promise.allSettled(promisesArr);
      console.log("promisesSettled", promisesSettled);
      promisesSettled.forEach((promise: any) => {
        let { status, value } = promise;
        if (status === "rejected") {
          toast({
            variant: "destructive",
            title: "Error while linking product",
          });
          console.log(promise);
          console.log(promise.reason);
        }
      });
      dispatch(
        setKeyValue({
          key: "reloadProducts",
          value: !productsState.reloadProducts,
        })
      );
      dispatch(
        setKeyValue({
          key: "allowButtonAction",
          value: false,
        })
      );
    } catch (err: any) {
      console.log(err);
    }
    // setLoading(false);
  };
  let ProfitComponent = (
    <>
      <div
        className={`grid grid-cols-2 justify- ${
          locale == "en"
            ? `lap:grid-cols-3 lap:my-4 `
            : `tab:grid-cols-3 tab:my-4`
        } gap-4    items-center my-2   dark:text-white`}
      >
        <span
          className={`whitespace-nowrap text-sm mx-2  ${
            locale == "en" ? `lap:hidden` : `tab:hidden`
          }`}
        >
          {profitType}
        </span>
        <div
          className={`flex ${
            locale == "en"
              ? `lap:flex-row lap:space-s-6 lap:space-y-0 `
              : `tab:flex-row tab:space-s-6 tab:space-y-0`
          } space-y-3  flex-col items-center`}
        >
          <span
            className={`whitespace-nowrap text-sm mx-2 hidden ${
              locale == "en" ? `lap:block` : "tab:block"
            }`}
          >
            {profitType}
          </span>
          <Select
            onValueChange={(value: any) => {
              setProfitChoosenType(value);
            }}
          >
            <SelectTrigger
              className={`bg-[#edf5f9]  dark:text-black text-xs ${
                locale == "en" ? `lap:text-sm` : `tab:text-sm`
              }`}
            >
              <SelectValue placeholder={percentage} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="percentage">{percentage}</SelectItem>
                <SelectItem value="number">{number}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div
          className={`flex items-center ${
            locale == "en" ? ` lap:space-s-3` : `tab:space-s-3`
          }`}
        >
          <div className="relative mt-auto">
            <Input
              type="number"
              placeholder={val}
              className="inputField px-6"
              value={commissionVal}
              onChange={(e: any) => {
                if (e.target.value) {
                  setCommissionVal(parseInt(e.target.value));
                } else {
                  setCommissionVal(0);
                }
              }}
            />
            <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
              {profitChoosenType == "percentage" ? <>%</> : <></>}
            </span>
          </div>
        </div>
        <Button
          className="!bg-[#40a58d] !text-white !min-h-[2rem]"
          size="xs"
          onClick={linkProductsToSallaHandler}
          disabled={!allowButtonAction}
        >
          {upProducts}
        </Button>
      </div>
    </>
  );
  return { ProfitComponent, LoaderComponent };
}
