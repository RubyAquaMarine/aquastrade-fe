// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import axios from "axios";
import Ticker from "react-ticker";
import styles from "@/app/Styles/StockTicker.module.css";

import { useAquaFeed, DataFeedV } from "@/app/Hooks/useAquaFeed";

import { findTokenFromAddress, findContractInfo } from "@/app/Utils/findTokens";

import { formatPriceBigToHuman } from "@/app/Utils/utils";

const StockTicker = () => {
  const [stocks, setStocks] = useState<DataFeedV[]>();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  useEffect(() => {
    if (objectFeeds && objectFeeds?.length > 1) {
      setStocks(objectFeeds);
      console.log(" Render useEffect(() | TICKERS ", objectFeeds);
    }
  }, [objectFeeds]);

  console.log(" Render TICKERS ", stocks);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {stocks ? (
        <Ticker speed={1} direction={"toLeft"} mode={"smooth"}>
          {() => (
            <div className={styles.flex}>
              {stocks.map((stock, index) => (
                <div key={index} className={styles.block}>
                  {/**  White text : green/red : grey (symbol :change : price) */}

                  <span className={styles.tick_symbol}>
                    {findTokenFromAddress(stock?.quote)?.symbol}-
                    {findTokenFromAddress(stock?.base)?.symbol}{" "}
                  </span>

                  <span className={styles.tick_price}>
                    {formatPriceBigToHuman(stock?.pricePoolInverse)}{" "}
                  </span>

                  <span className={styles.tick_price}>
                    {`(${formatPriceBigToHuman(stock?.pricePool)})`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Ticker>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default StockTicker;

//   <span className={styles.tick_price}>{ formatUnits(stock?.poolPriceInverse,18) }</span>
