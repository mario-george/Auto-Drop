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

  export default function SubmitProducts({
    lang,
    pagesProducts,
    currPageProdEN,
    currPageProdAR,
    currPage,
  }: any) {
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
        <Dialog toBeSentProductsArr={toBeSentProductsArr}>
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
  }: {
    children: React.ReactNode;
    toBeSentProductsArr: any;
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
              <AlertDialogAction className="bg-green-500 hover:bg-green-600">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  