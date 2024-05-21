"use client";
import React, { useMemo } from "react";

import TableDataFeed from "@/app/Components/table/TableDataFeed";

type DataFeedV = {
  id: string;
  poolAddress: string;
  poolPrice: string;
  feedPrice: string;
  assets: string[];
};

const Overview = (params: DataFeedV[]) => {
  const newArray = Object.values(params);
  const data: DataFeedV[] = useMemo(() => newArray, []);
  return (
    <div>
      <TableDataFeed {...data}></TableDataFeed>
    </div>
  );
};

export default Overview;
