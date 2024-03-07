"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner } from "@chakra-ui/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import Cols from "./columns";
import { useDispatch } from "react-redux";
import { setKeyValue } from "@/store/productsSlice";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchByProd: string;
  unAvProd: string;
  unUpProd: string;
  price: string;
  category: string;
  locale: string;
  setMyProducts: any;
  apply: string;
  setLoadProducts: any;
  colData?: any;

  
}

export function DataTable<TData, TValue>({
  searchByProd,
  unAvProd,
  price,
  category,
  unUpProd,
  // columns,
  data,
  locale,
  setMyProducts,
  apply,
  setLoadProducts,
  colData
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  let { productName, sellPrice, platform, inventory } = colData;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setKeyValue({ key: "currentSelectedProducts", value: rowSelection })
    );
  }, [rowSelection]);
  let columns = Cols({
    productName,
    sellPrice,
    category,
    platform,
    inventory,
    setMyProducts,
    setLoadProducts,
    rowSelection,
  });
  const table = useReactTable({
    data,
    //@ts-ignore
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
    <div className="space-y-4 min-w-full">
      <DataTableToolbar
        table={table}
        searchByProd={searchByProd}
        unAvProd={unAvProd}
        price={price}
        category={category}
        unUpProd={unUpProd}
        locale={locale}
        setMyProducts={setMyProducts}
        apply={apply}
      />
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} products={data} />
    </div>
  );
}
