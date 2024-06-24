"use client";
import React, { useMemo } from "react";
import {TableDataFeed, DataFeed} from "@/app/Components/table/TableDataFeed";

export const Overview = (params: DataFeed[]) => {
  const newArray = Object.values(params);
  const data: DataFeed[] = useMemo(() => newArray, [newArray]);
  return (
    <div>
      <TableDataFeed {...data}></TableDataFeed>
    </div>
  );
};
