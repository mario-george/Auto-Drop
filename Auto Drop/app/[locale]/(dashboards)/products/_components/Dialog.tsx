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

export default function SubmitProducts({
  lang,
  pagesProducts,
  currPageProdEN,
  currPageProdAR,
  currPage,
  locale,
}: any) {
  const router = useRouter();
  let submitHandler = async () => {
    console.log(toBeSentProductsArr);
    const promises = toBeSentProductsArr.map((prod: any) => {
      let {
        first_level_category_name,
        second_level_category_name,
        target_sale_price,
        target_original_price,
        product_detail_url: url,
      } = prod;
      console.log(
        first_level_category_name,
        second_level_category_name,
        target_sale_price,
        target_original_price,
        url
      );
      return axiosInstance.post("/aliexpress/getProductDetails", {
        url: prod.product_detail_url,
        first_level_category_name,
        second_level_category_name,
        target_sale_price,
        target_original_price,
      });
    });

    const productsDetails = await Promise.all(promises);
    console.log(productsDetails);
    const promises2 = productsDetails.map(
      (prodDetail: any, index: number): any => {
        console.log(prodDetail.data);
        console.log(prodDetail.data);
        console.log(prodDetail.data);

        let price;
        if (prodDetail.data.product.options) {
          const collectValues = new Array().concat(
            ...prodDetail.data.product.options.map(
              (option: any) => option.values
            )
          );
          // you can make an array for prices for variants here aswell
          let total = (collectValues && collectValues[0]?.original_price) || 0;
          const commissionPrice =
            total *
            ((Number(toBeSentProductsArr[index].vendor_commission) || 0) / 100);
          price = parseFloat((total + commissionPrice).toFixed(2));
        }
        return axiosInstance.post("/aliexpress/product/createProduct", {
          ...prodDetail.data.product,
          vendor_commission: prodDetail.data.product.vendor_commission,
          price,
        });
      }
    );
    const res = await Promise.all(promises2);
    console.log(res);
    let valid = true;
    res.forEach((oneRes) => {
      if (oneRes.data.success === false) {
        valid = false;
      }
    });
    if (valid) {
      router.push(`/${locale || "en"}/my-products`);
    }
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
      <Dialog
        toBeSentProductsArr={toBeSentProductsArr}
        submitHandler={submitHandler}
      >
        <Button
          className="fixed bottom-12 !bg-blue-300 rounded-full min-w-[3rem] min-h-[3rem] shadow"
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
              {toBeSentProductsArr.map((product: any, i: number) => {
                return (
                  <>
                    <div
                      key={i}
                      className="flex justify-between items-center text-[#253439] min-w-full my-4 border-2 rounded-lg p-2"
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
