"use client";

import React, { useState, useEffect, useRef, memo } from "react";

import { formatUnits, parseUnits } from "viem";
import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

type Data = {
  id: string;
  pool: string;
  base_decimal: number;
};

const PoolPrice = (params: Data) => {
  const [inputPrice, setPrice] = useState<bigint>(BigInt(1));
  const { data: price } = useAquaFeed("getPoolPriceWithAddress", [
    params?.pool,
  ]);

  console.log(" ------fuck ", params);

  useEffect(() => {
    if (price) {
      setPrice(price as bigint);
    }
  }, [price]);
  return (
    <span>{price ? formatUnits(inputPrice, params?.base_decimal) : ""}</span>
  );
};

export default memo(PoolPrice);
