// @ts-nocheck
"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
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

const data: DataFeed[] = [
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

export const columns: ColumnDef<DataFeed>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          (table?.length > 1 && table.getIsAllPageRowsSelected()) ||
          (table?.length > 1 &&
            table.getIsSomePageRowsSelected() &&
            "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: accessofPair,
    header: "Pool Addr",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue(accessofPair)}</div>
    ),
  },
  {
    accessorKey: accessorKeyAssets,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pair
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue(accessorKeyAssets)}</div>
    ),
  },
  {
    accessorKey: accessorPoolPrice,
    header: () => <div className="text-right">Pool Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue(accessorPoolPrice));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: accessorFeedPrice,
    header: () => <div className="text-right">Data Feed</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue(accessorFeedPrice));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TestTable(params: DataFeed[]) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(" data into table ", params.props?.length);

  const test = params.props;

  console.log(" data into table ", test);

  // const dataNow = Object.values(params);
  // console.log(" data into table object ", dataNow);

  // console.log(" data into table object ", dataNow?.length);

  const table = useReactTable({
    test,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter assets"
          value={
            (table &&
              (table
                .getColumn(accessorKeyAssets)
                ?.getFilterValue() as string)) ??
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
            {table &&
              table
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
            {table &&
              table.getHeaderGroups().map((headerGroup) => (
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
            {table?.length > 1 && table.getRowModel().rows?.length ? (
              table &&
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
          {table?.length > 1 && table.getFilteredSelectedRowModel().rows.length}{" "}
          of {table?.length > 1 && table.getFilteredRowModel().rows.length}{" "}
          row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={table?.length > 1 && !table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={table?.length > 1 && !table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
