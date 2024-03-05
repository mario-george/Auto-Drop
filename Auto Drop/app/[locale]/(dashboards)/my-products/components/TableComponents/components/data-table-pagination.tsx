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

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
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
                      onClick={() => table.setPageIndex(page - 1)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}{" "}
              <PaginationItem>
                <Button
                  onClick={() => table.nextPage()}
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
