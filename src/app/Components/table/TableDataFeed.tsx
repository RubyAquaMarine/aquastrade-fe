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

const DECIMALS = 8;

export type DataFeed = {
  id: string;
  pool: string;
  poolPrice: string;
  poolPriceInverse: string;
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
      header: "Quote/Base",
      accessorKey: "pricePoolInverse",
      cell: ({ row }: any) => {
        const formatted = formatPrice(row.getValue("pricePoolInverse"));
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },

    {
      header: "Base/Quote",
      accessorKey: "pricePool",
      cell: ({ row }: any) => {
        const formatted = formatPrice(row.getValue("pricePool"));
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },

    {
      header: "Oracle",
      accessorKey: "priceFeed",
      cell: ({ row }: any) => {
        const formatted = formatPrice(row.getValue("priceFeed"));
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

  // big to string
  const formatPrice = (_value: bigint) => {
    const one = parseUnits("1", 18);

    const oneM = parseUnits("1000000", 18);

    const onefourth = parseUnits("0.0001", 18);

    const oneeight = parseUnits("0.00000001", 18);

    const onetwelve = parseUnits("0.000000000001", 18);

    let value;

    if (_value >= oneM) {
      value = parseFloat(formatUnits(_value, 18)).toFixed(0);
    }

    if (_value >= one && _value < oneM) {
      value = parseFloat(formatUnits(_value, 18)).toFixed(2);
    }

    if (_value < one && _value >= onefourth) {
      value = parseFloat(formatUnits(_value, 18)).toFixed(4);
    }

    if (_value < onefourth && _value >= oneeight) {
      value = parseFloat(formatUnits(_value, 18)).toFixed(8);
    }

    if (_value < oneeight && _value >= onetwelve) {
      value = parseFloat(formatUnits(_value, 18)).toFixed(12);
    }

    if (_value < onetwelve) {
      value = parseFloat(formatUnits(_value, 18)).toFixed(18);
    }
    return value;
  };

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
