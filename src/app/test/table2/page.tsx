"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import PropsTable from "@/app/Components/table/PropsTable";

export type DataFeed = {
  id: string;
  poolAddress: string;
  poolPrice: string;
  feedPrice: string;
  assets: string[];
};

const TokenList = ({ params }: any) => {
  const data: DataFeed[] = React.useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PropsTable {...data}></PropsTable>
    </main>
  );
};

export default TokenList;
