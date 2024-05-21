"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import PropsTable from "@/app/Components/table/PropsTable1";

import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

export type DataFeed = {
  id: string;
  pool: string;
  pricePool: string;
  priceFeed: string;
  assets: string[];
};

const TokenList = ({ params }: any) => {
  const [position, setPosition] = useState<DataFeed[]>();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  useEffect(() => {
    if (objectFeeds && objectFeeds?.length > 1) {
      setPosition(objectFeeds);
      console.log(" Render | objectFeeds", objectFeeds);
    }
  }, [objectFeeds]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PropsTable {...position}></PropsTable>
    </main>
  );
};

export default TokenList;
