"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  products?:any
}

export function DataTablePagination<TData>({
  table,products
}: DataTablePaginationProps<TData>) {
  const [alreadyLoadedProducts,setAlreadyLoadedProducts] = useState(false)
  const reloadPage = useSelector((state: any) => state.products.reloadPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let searchPage:any = searchParams.get("page");
  const [currPage, setCurrPage] = useState((searchPage||2)-1);
console.log('products',products)
  useEffect(() => {

    console.log('searchPage',searchPage)
    if (searchPage && !alreadyLoadedProducts) {
      setCurrPage(+searchPage);
      table.setPageIndex(currPage-1);

    } 
    setAlreadyLoadedProducts(true)
    /*    else {
      setCurrPage(1);
      table.setPageIndex(currPage-1);
      
    } */
    console.log("table.getState().pagination.pageIndex + 1",table.getState().pagination.pageIndex + 1)
  }, [products]);

/*   useEffect(() => {
    console.log("currPage",currPage)
    try {
      table.setPageIndex(currPage);
      // table.setPageIndex(20);
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
    
    
  }, [reloadPage,products]);
 */
  /*   useEffect(() => {
      setCurrPage(searchPage)
    
    // table.setPageIndex(page)
    // setPageState(table.getpage )
  }, []); */
  const handlePageChange = (pageIndex: number) => {
    let pageNum = pageIndex - 1;
    setCurrPage(pageNum);
    table.setPageIndex(pageNum);
    router.push(`${pathname}?page=${pageNum + 1}`, { scroll: false });
    /* router.push(`${pathname}?router=${}`{
      pathname: router.pathname,
      query: { ...router.query, page: pageIndex },
    }); */
  };
  return (
    <div className="flex items-center justify-center px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex space-s-3">
          <Pagination>
            <PaginationContent className="space-s-4 flex flex-wrap">
              {Array.from({ length: table.getPageCount() }, (_, i) => {
                return i + 1;
              }).map((page) => {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={
                        table.getState().pagination.pageIndex + 1 === page
                      }
                      className={` hover:bg-[#253439] hover:cursor-pointer hover:text-white shadow-md ${
                        table.getState().pagination.pageIndex + 1 === page
                          ? `bg-[#253439] text-white hover:bg-[#253439] hover:text-white`
                          : ``
                      }`}
                      onClick={() => {
                        /*             setPageState(page - 1);
                        table.setPageIndex(page - 1); */
                        handlePageChange(page);
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
                    table.nextPage();
                  }}
                  className="bg-white text-[#253439] hover:bg-white/90 shadow-md hover:bg-[#253439] hover:text-white"
                  disabled={!table.getCanNextPage()}
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
