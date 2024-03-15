import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setPageProducts } from "@/store/productsSlice";
import { unstable_batchedUpdates } from "react-dom";

export default function PaginationRenderer({
  products,
  lang,
  productsAR,
  setProducts,
  setProductsAR,
  currPage,
  setCurrPage,
}: {
  products: any[];
  lang: string;
  productsAR: any[];
  setProducts: any;
  setProductsAR: any;
  currPage: string;
  setCurrPage: any;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const savePageProductsHandler = () => {
    if (lang === "en") {
      dispatch(setPageProducts({ page: currPage, products: products, lang }));
    } else {
      dispatch(setPageProducts({ page: currPage, products: productsAR, lang }));
    }
    unstable_batchedUpdates(() => {
      setProductsAR([]);
      setProducts([]);
    });
  };

  console.log(currPage);
  return (
  <div className="flex items-center justify-center px-2 ">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex space-s-3">
          <Pagination>
            <PaginationContent className="space-s-1 justify-center tab:space-s-4 mx-auto flex flex-wrap">
              {Array.from({ length: 7 }, (_, i) => {
                return i + 1;
              }).map((page) => {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currPage === page.toString()}
                      className={`shadow-md text-[#253439] hover:text-white hover:bg-[#253439] hover:cursor-pointer bg-white dark:text-white dark:bg-[#2e464f] dark:hover:bg-[#253439] ${
                        currPage === page.toString()
                          ? `bg-[#253439] dark:bg-[#253439] text-white`
                          : ``
                      }`}
                      onClick={() => {
                        savePageProductsHandler();
                        setCurrPage(page.toString());

                        router.push(`?page=${page}`);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}{" "}
              <PaginationItem>
                <Button
                  onClick={() => {
                    savePageProductsHandler();
                    router.push(`?page=${+currPage + 1}`);
                    setCurrPage((+currPage + 1).toString());
                  }}
                  className="bg-white text-[#253439] hover:bg-white/90 shadow-md dark:text-black  dark:hover:bg-[#253439]/50 dark:hover:text-white"
                  disabled={currPage === "7"}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
