import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CurrencyFormatter from "./CurrencyFormatter";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import axiosInstance from "../../_components/shared/AxiosInstance";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import useLoader from "@/components/loader/useLoader";
export default function SubmitProducts({
  lang,
  pagesProducts,
  currPageProdEN,
  currPageProdAR,
  currPage,
  locale,setLoading,successButtonRef,toast
}: any) {
  const router = useRouter();
  // const { LoaderComponent, setLoading } = useLoader();

  let submitHandler = async () => {
    setLoading(true);
    // console.log(toBeSentProductsArr);

    const promises = toBeSentProductsArr.map((prod: any) => {
      let {
        first_level_category_name,
        second_level_category_name,
        target_sale_price,
        target_original_price,
        product_detail_url: url,
      } = prod;
 
  /*     return axiosInstance.post("/aliexpress/getProductDetails", {
        url: prod.product_detail_url,
        first_level_category_name,
        second_level_category_name,
        target_sale_price,
        target_original_price,
      });
    }); */
    return axiosInstance.post("/aliexpress/getProductDetails/v2", {
      url: prod.product_detail_url,
      first_level_category_name,
      second_level_category_name,
      target_sale_price,
      target_original_price,lang
    });
  });
    try {
toast.promise(promises[0], {
        success: { title: `Success`, description: `${toBeSentProductsArr?.length} Products has been added successfully` },
        error: { title: 'Fail', description: 'Something went wrong while adding products' },
        loading: { title: 'Adding Products', description: 'Please wait' ,position:"bottom-right"},
      }) 
     /* 
      toast.promise(
  promises[0],
  {
    loading: (data:any) => {
      toast({
        title: 'Loading',
        description: 'Promise pending',
        status: 'loading',
        position: 'bottom-right'
      });
      return 'Promise resolved';
    },
    success: (data:any) => {
      toast({
        title: 'Success',
        description: 'Promise resolved',
        status: 'success',
        position: 'bottom-right'
      });
      return 'Promise resolved';
    },
    error: (err:any) => {
      toast({
        title: 'Error',
        description: 'Promise rejected',
        status: 'error',
        position: 'bottom-right'
      });
      return 'Promise rejected';
    },
  }
); */
      const productsDetails = await Promise.allSettled(promises);
      const promises2 = productsDetails.map(
        (result: any, index: number): any => {
          if (result.status === "rejected") {
            console.error(`Promise ${index} failed with ${result.reason}`);
            return;
          }
// console.log(result)
          /* return axiosInstance.post("/aliexpress/product/createProduct", {
            ...prodDetail.data.product,
            vendor_commission:
              Number(toBeSentProductsArr[index].vendor_commission) || 0,
            price,
          }); */
        }
      );
      // const res = await Promise.all(promises2);
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
    // successButtonRef?.current?.click()
    router.push(`/${locale || "en"}/my-products`);

    setLoading(false);
  };
  let toBeSentPages = pagesProducts.filter((element: any) => {
    return element.lang === lang && element.page !== currPage;
  });
  let toBeSentProducts = toBeSentPages.map((element: any) => {
    return element.products;
  });
  let toBeSentProductsArr = toBeSentProducts.flat().filter((element: any) => {
    return element.checked === true;
  });
  if (lang == "en") {
    currPageProdEN.forEach((element: any) => {
      if (element.checked) {
        toBeSentProductsArr.push(element);
      }
    });
  } else {
    currPageProdAR.forEach((element: any) => {
      if (element.checked) {
        toBeSentProductsArr.push(element);
      }
    });
  }
  const submitProductsHandler = () => {
    console.log(toBeSentProductsArr);
    console.log(toBeSentProductsArr.length);
  };
  return (
    <>
        {/* {LoaderComponent} */}
      <Dialog
        toBeSentProductsArr={toBeSentProductsArr}
        submitHandler={submitHandler}
        >
        <Button
          className="fixed bottom-12 !bg-blue-300 rounded-full min-w-[3rem] min-h-[3rem] shadow z-[20]"
          onClick={submitProductsHandler}
          disabled={toBeSentProductsArr.length === 0}
          >
          <FaPlus className="text-black" />
        </Button>
      </Dialog>
    </>
  );
}

function Dialog({
  children,
  toBeSentProductsArr,
  submitHandler,
}: {
  children: React.ReactNode;
  toBeSentProductsArr: any;
  submitHandler: any;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to add these products to your list ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can save these products to your list
              <ScrollArea className="h-[20rem]">
                {toBeSentProductsArr.map((product: any, i: number) => {
                  return (
                    <>
                      <div
                        key={i}
                        className="flex justify-between items-center text-[#253439] min-w-full my-4 border-2 rounded-lg p-2 dark:text-white"
                      >
                        <span className="max-w-[80%]">
                          {product.product_title}
                        </span>
                        <span>
                          {CurrencyFormatter(product.target_sale_price)}
                        </span>
                      </div>
                    </>
                  );
                })}
              </ScrollArea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                submitHandler();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
