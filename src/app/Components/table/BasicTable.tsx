"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
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

// 5 Columns
export type DataFeed = {
  id: string;
  poolAddress: string;
  poolPrice: string;
  feedPrice: string;
  assets: string[];
};

const accessorKeyAssets = "assets";
const accessorPoolPrice = "poolPrice";
const accessorFeedPrice = "feedPrice";
const accessofPair = "poolAddress";

const dataFeed: DataFeed[] = [
  {
    id: "0",
    poolAddress: "0xgfdh546",
    poolPrice: "123",
    feedPrice: "343",
    assets: ["ETH", "USD"],
  },
  {
    id: "1",
    poolAddress: "0x",
    poolPrice: "123",
    feedPrice: "343",
    assets: ["ETH", "USDT"],
  },
  {
    id: "2",
    poolAddress: "0x",
    poolPrice: "123",
    feedPrice: "343",
    assets: ["ETH", "USDC"],
  },
  {
    id: "3",
    poolAddress: "0x",
    poolPrice: "123",
    feedPrice: "343",
    assets: ["ETH", "USDP"],
  },
  {
    id: "4",
    poolAddress: "0x",
    poolPrice: "123",
    feedPrice: "343",
    assets: ["ETH", "USD"],
  },
];

export default function BasicTable() {
  // These object name must be [data,columns]
  //  const data = [{'t':'t'},{'t':'d'} ];
  const data = useMemo(() => dataFeed, []);

  //  const columns = [{'title':'test'},{'title':'test'}];
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Pool",
      accessorKey: "poolAddress",
    },
    {
      header: "Pool Price",
      accessorKey: "poolPrice",
    },
    {
      header: "Feed Price",
      accessorKey: "feedPrice",
    },
    {
      header: "Pair",
      accessorKey: "assets",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter assets"
          value={
            (table.getColumn(accessorKeyAssets)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(accessorKeyAssets)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
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
