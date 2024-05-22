"use client";
import React, { useMemo } from "react";

import TableDataFeed from "@/app/Components/table/TableDataFeed";

export type DataFeedV = {
  id: string;
  pool: string;
  pricePool: string;
  priceFeed: string;
  assets: string[];
  quote: string;
  base: string;
};

export const Overview = (params: DataFeedV[]) => {
  const newArray = Object.values(params);
  const data: DataFeedV[] = useMemo(() => newArray, []);
  return (
    <div>
      <TableDataFeed {...data}></TableDataFeed>
    </div>
  );
};
