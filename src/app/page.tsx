"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useLayoutEffect } from "react";
import ConnectWallet from "./Components/ConnectWallet";
import { useAccount, useSwitchChain } from "wagmi";
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
  const { address, chain } = useAccount();
  const [dataTV, setDataToTV] = useState<Array<CandlestickData>>([]);
  const [dataTVVolume, setDataToTVVolume] = useState<Array<CandlestickData>>(
    [],
  );
  const { chains, switchChain } = useSwitchChain();
  const [isClient, setIsClient] = useState(false);

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
                <p className="mt-0 font-medium w-72 sm:w-max ">
                  Connect Wallet to Start Trading
                </p>
                <p className={styles.tradingViewPara}>
                  It&apos;s completely zero gas fees
                </p>
                <p className={styles.tradingViewText}>
                  <ConnectWallet></ConnectWallet>
                </p>
              </div>
            </div>
          </ChartComponent>
        </div>
      )}
    </main>
  );
}
