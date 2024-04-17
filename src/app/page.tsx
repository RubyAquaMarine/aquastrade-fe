"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import ConnectWallet from "./Components/ConnectWallet";
import ChartCandles from "@/app/api/binance";
import dynamic from "next/dynamic";
import styles from "./Styles/Links.module.css";

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

export default function Home({ children }: any) {
  const [dataTV, setDataToTV] = useState<Array<CandlestickData>>([]);
  const [dataTVVolume, setDataToTVVolume] = useState<Array<CandlestickData>>(
    [],
  );
  const [isClient, setIsClient] = useState(false);

  console.log(" Type of the ", typeof dataTV, dataTV);

  const getDataCallBack = async (
    setDataToTV: Function,
    setDataToTVVolume: Function,
  ) => {
    try {
      const bars = await ChartCandles("SKLUSDT");
      setDataToTV(bars?.[0]);
      setDataToTVVolume(bars?.[1]);
    } catch {
      console.error("unable to get ChartCandles() ");
    }
  };

  useLayoutEffect(() => {
    setIsClient(true);
    getDataCallBack(setDataToTV, setDataToTVVolume);
  }, []);

  return (
    <main className={styles.p_body}>
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
                className="w-screen h-screen flex z-40 justify-start items-center pl-10 pb-44 absolute top-10 left-0 
                        xl:pl-40"
              >
                <div
                  className="
           bg-opacity-0
           rounded-2xl 
           min-h-fit
           flex-initial
           z-50 
           text-white
           text-5xl  
           w-min
            h-max
           justify-between"
                >
                  <span className="mt-0 font-medium w-72 sm:w-max ">
                    Connect Wallet to Start Trading
                  </span>
                  <p className={styles.tradingViewPara}>Reimagine 0 gas fees</p>
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
}
