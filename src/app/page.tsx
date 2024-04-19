"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import TextSizeAdjuster from "@/app/Components/ViewPort";
import ConnectWallet from "@/app/Components/ConnectWallet";
import ChartCandles from "@/app/api/binance";
import dynamic from "next/dynamic";
import styles from "./Styles/Home.module.css";

// build static chart for homepage
const ChartComponent = dynamic(() => import("@/app/Components/ChartTV2"), {
  ssr: false,
});

interface CandlestickData {
  time: string;
  /** Opening price */
  open: number;
  /** High price */
  high: number;
  /** Low price */
  low: number;
  /** Closing price */
  close: number;

  value: number;
}

//
const Home = ({ children, params }: any) => {
  // const Home = ({ children }: HomeProps) =>{
  const [dataTV, setDataToTV] = useState<Array<CandlestickData>>([]);
  const [dataTVVolume, setDataToTVVolume] = useState<Array<CandlestickData>>(
    [],
  );
  const [isClient, setIsClient] = useState(false);

  const getDataCallBack = (
    setDataToTV: Function,
    setDataToTVVolume: Function,
  ) => {
    const fetchData = async () => {
      try {
        const bars = await ChartCandles("SKLUSDT");
        setDataToTV(bars?.[0]);
        setDataToTVVolume(bars?.[1]);
      } catch {
        console.error("unable to get ChartCandles() ");
      }
    };

    fetchData();
  };

  useLayoutEffect(() => {
    setIsClient(true);
    getDataCallBack(setDataToTV, setDataToTVVolume);
  }, []);

  return (
    <main className={styles.chart}>
      {!isClient ? (
        <div> </div>
      ) : (
        <div className={styles.tradingView}>
          {dataTV &&
          dataTV?.length !== 0 &&
          dataTVVolume &&
          dataTVVolume?.length !== 0 ? (
            <ChartComponent colors={{}} data={[dataTV, dataTVVolume]}>
              <div
                className="w-screen h-screen flex-wrap z-40 justify-start items-center pl-10 pb-44 absolute top-20 left-0 
                        xl:pl-40"
              >
                <div className={styles.container}>
                  <span className={styles.text_title}>
                    <TextSizeAdjuster
                      text={" Connect Wallet to Start Trading"}
                      text_size="24"
                      text_size_to="48"
                    ></TextSizeAdjuster>
                  </span>
                  <p className={styles.text_body}>
                    <TextSizeAdjuster
                      text={"Reimagine 0 gas fees"}
                      text_size="16"
                      text_size_to="28"
                    ></TextSizeAdjuster>
                  </p>
                  <span className={styles.tradingViewText}>
                    <ConnectWallet></ConnectWallet>
                  </span>
                </div>
              </div>
            </ChartComponent>
          ) : (
            <div>check blockers</div>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
