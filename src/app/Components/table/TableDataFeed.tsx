"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { formatUnits, parseUnits } from "viem";

import { findTokenFromAddress } from "@/app/Utils/findTokens";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  RowModel,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/app/Components/ui/Button";
import { Checkbox } from "@/app/Components/ui/Checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/DropdownMenu";
import { Input } from "@/app/Components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/Components/ui/Table";

import styles from "@/app/Styles/Table.module.css";

const accessorKeyAssets = "pool";

export type DataFeed = {
  id: string;
  pool: string;
  poolPrice: string;
  feedPrice: string;
  assets: string[];
  quote: string;
  base: string;
};

export default function TableDataFeed(dataFeed: any) {
  console.log("TableDataFeed params", dataFeed);

  const dataNow = Object.values(dataFeed);

  // These object name must be [data,columns]

  const data = useMemo(() => dataNow, []);

  //  const columns = [{'title':'test'},{'title':'test'}];
  //const columns: ColumnDef<DataFeed>[] =
  const columns = [
    {
      header: "Pair",
      accessorKey: "assets",
      cell: ({ row }: any) => {
        const addrQ = row.getValue("quote");
        const addrB = row.getValue("base");
        const quote = findTokenFromAddress(addrQ)?.symbol;
        const base = findTokenFromAddress(addrB)?.symbol;

        return (
          <div className="text-right font-medium">{`${quote}/${base}`}</div>
        );
      },
    },

    {
      header: "Exchange Rate",
      accessorKey: "pricePool",
      cell: ({ row }: any) => {
        const base: string = row.getValue("base");
        const dec = findTokenFromAddress(base)?.decimals;
        const inAmount: bigint = row.getValue("pricePool");
        // todo
        // need to normalize all data based on the  base token decimals  ..
        // this is a bug....  working for btc and eth but not on skl
        let value;
        const cc = parseUnits("1", dec);

        if (inAmount && BigInt(inAmount) < cc) {
          value = parseFloat(
            formatUnits(row.getValue("pricePool"), dec),
          ).toFixed(18);
        }

        if (inAmount && inAmount > cc) {
          value = parseFloat(
            formatUnits(row.getValue("pricePool"), dec),
          ).toFixed(2);
        }
        const formatted = value;
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      header: "Feed Price",
      accessorKey: "priceFeed",
      cell: ({ row }: any) => {
        const inAmount: bigint = row.getValue("priceFeed");
        const cc = parseUnits("1", 18);
        let value;
        if (inAmount && BigInt(inAmount) < cc) {
          value = parseFloat(formatUnits(inAmount, 18)).toFixed(18);
        }

        if (inAmount && inAmount >= cc) {
          value = parseFloat(formatUnits(inAmount, 18)).toFixed(2);
        }
        const formatted = value;

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      header: "Pool",
      accessorKey: "pool",
    },
    {
      header: "Quote",
      accessorKey: "quote",
      cell: ({ row }: any) => {
        const addr = row.getValue("quote");
        const formatted = findTokenFromAddress(addr)?.symbol;

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      header: "Base",
      accessorKey: "base",
      cell: ({ row }: any) => {
        const addr = row.getValue("base");
        const formatted = findTokenFromAddress(addr)?.symbol;

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      header: "ID",
      accessorKey: "id",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  return (
    <div className={styles.container}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Pools"
          value={
            (table.getColumn(accessorKeyAssets)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(accessorKeyAssets)
              ?.setFilterValue(event.target.value)
          }
          className={styles.input}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className={styles.menu}>
            <Button variant="outline" className={styles.button_column}>
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={styles.menu}>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={styles.table}>
        <Table>
          <TableHeader className={styles.table_header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={styles.table_body}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={styles.table_body}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            className={styles.input}
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className={styles.input}
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
