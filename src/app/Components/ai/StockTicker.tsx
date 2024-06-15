// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticker from "react-ticker";
import styles from "@/app/Styles/Landing.module.css";

const StockTicker = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("https://aquas.trade/api/amm/pools"); // Replace with your stock API

        console.log(" data from api ", response);

        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  console.log(")TICKERS ", stocks);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Ticker speed={2} direction={"toLeft"} mode={"chain"}>
        {() => (
          <div className={styles.flex}>
            {stocks.map((stock, index) => (
              <div
                key={index}
                style={{ margin: "0 20px", display: "inline-block" }}
              >
                {/**  White text : green/red : grey (symbol :change : price) */}

                <span>{stock?.symbol}: </span>
                <span>{stock?.decimals}</span>
              </div>
            ))}
          </div>
        )}
      </Ticker>
    </div>
  );
};

export default StockTicker;
