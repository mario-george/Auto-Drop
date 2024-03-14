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
  products?: any;
}

export function DataTablePagination<TData>({
  table,
  products,
}: DataTablePaginationProps<TData>) {
  const [alreadyLoadedProducts, setAlreadyLoadedProducts] = useState(false);
  const reloadPage = useSelector((state: any) => state.products.reloadPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let searchPage: any = searchParams.get("page");
  // index
  if (!searchPage || (searchPage && searchPage > table.getPageCount())) {
    searchPage = 1;
  }

  console.log("searchPage", searchPage);
  // const [currPage, setCurrPage] = useState(searchPage - 1);
  console.log("products", products);
  console.log("rendered pagination");
  if (
    table.getState().pagination.pageIndex !== searchPage - 1 &&
    searchPage - 1 <= table.getPageCount()
  ) {
    table.setPageIndex(searchPage - 1);
  }
  useEffect(() => {
    /*  if (products.length > 0) {
      if (currPage !== Number(searchPage) - 1) {
        setCurrPage(Number(searchPage) - 1);
        console.log("exec 1 ");
      } else {
        if (table.getState().pagination.pageIndex !== currPage) {
          table.setPageIndex(currPage);
        }
      }
      console.log(
        " table.getState().pagination.pageIndex !== searchPage - 1 &&searchPage - 1 <= table.getPageCount()",
        table.getState().pagination.pageIndex !== searchPage - 1 &&
          searchPage - 1 <= table.getPageCount()
      );
    } */
    if (
      table.getState().pagination.pageIndex !== searchPage - 1 &&
      searchPage - 1 <= table.getPageCount()
    ) {
      table.setPageIndex(searchPage - 1);
    }
  }, [
    searchPage,
    // currPage,
    products,
    table,
    table.getState().pagination.pageIndex,
    products.length,
  ]);

  const handlePageChange = (pageIndex: number) => {
    let pageNum = pageIndex - 1;
    // setCurrPage(pageNum);
    // table.setPageIndex(pageNum);
    router.push(`${pathname}?page=${pageNum + 1}`, { scroll: false });
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
                    router.push(`${pathname}?page=${searchPage + 1}`, {
                      scroll: false,
                    });
                    // table.nextPage();
                  }}
                  className="bg-white text-[#253439] hover:bg-white/90 shadow-md hover:bg-[#253439] hover:text-white dark:text-black"
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
