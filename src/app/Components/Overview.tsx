"use client";

import React, { useRef, useEffect, useState, memo } from "react";

import TableDataFeed from "@/app/Components/table/TableDataFeed";

import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

// 5 Columns
export type DataFeed = {
  id: string;
  pool: string;
  pricePool: string;
  priceFeed: string;
  assets: string[];
  quote: string[];
  base: string[];
};

function Overview() {
  const [position, setPosition] = useState<DataFeed[]>();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  // reformat the data by taking the token_addresses , and returning the symbols to the user instead
  // the symbols will be stored in the assets

  useEffect(() => {
    if (objectFeeds && objectFeeds?.length > 1) {
      setPosition(objectFeeds);
      console.log(" Render | objectFeeds", objectFeeds);
    }
  }, [objectFeeds]);

  return (
    <div>
      <TableDataFeed {...position}></TableDataFeed>
    </div>
  );
}

export default memo(Overview);
