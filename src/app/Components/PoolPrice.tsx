// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import { formatUnits, parseUnits } from "viem";
import { useAquaFeed } from "@/app/Hooks/useAquaFeed";
import styles from "@/app/Styles/PoolPrice.module.css";
import { formatPriceBigToHuman } from "@/app/Utils/utils";

type Data = {
  id: string;
  pool: string; // amm pool address
};

const PoolPrice = (params: Data) => {
  const [inputPrice, setPrice] = useState<bigint>(BigInt(0));
  const [inputPriceInverse, setPriceInverse] = useState<bigint>(BigInt(0));
  const { data: price } = useAquaFeed("getPoolPriceWithAddress", [
    params?.pool,
  ]);

  // console.log("Get Pool Price from AquaFeed: Params ", params);

  // console.log("Get Pool Price", price);

  useEffect(() => {
    if (price && price.length > 0) {
      // todo Property 'length' does not exist on type 'number
      setPrice(price?.[0] as bigint);
      setPriceInverse(price?.[1] as bigint);
    }
  }, [price]);
  return (
    <span className="flex_row">
      {inputPrice !== BigInt(0) ? (
        <span className={styles.routing}>
          {" "}
          <span> {`Pool Price: ${formatPriceBigToHuman(inputPrice)}  `} </span>
          <span>
            {" "}
            {`Inverse: ${formatPriceBigToHuman(inputPriceInverse)} `}{" "}
          </span>
        </span>
      ) : (
        <span className="button_link">
          {" "}
          <Link href="/dashboard/overview" target="_blank">
            DeployFeed
          </Link>
        </span>
      )}
    </span>
  );
};

export default memo(PoolPrice);
