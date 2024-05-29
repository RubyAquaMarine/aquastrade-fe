"use client";
import Image from "next/image";
import React, { useEffect, useState, useLayoutEffect } from "react";
import TextSizeAdjuster from "@/app/Components/ViewPort";
import ConnectWallet from "@/app/Components/ConnectWallet";
import dynamic from "next/dynamic";
import styles from "./Styles/Landing.module.css";

import SKL from "../../public/SKL.svg";

// build static chart for homepage
import ChartCandles from "@/app/api/binance";
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
        console.log("unable to get ChartCandles() ");
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
              <div className={styles.container_positioning}>
                <div className={styles.text_container}>
                  <span className={styles.text_title}>
                    <TextSizeAdjuster
                      text={" Connect Wallet to Start Trading"}
                      text_size="28"
                      text_size_to="48"
                    ></TextSizeAdjuster>
                  </span>
                  <span className={styles.text_body}>
                    <TextSizeAdjuster
                      text={"Reimagine 0 gas fees on"}
                      text_size="13"
                      text_size_to="16"
                    ></TextSizeAdjuster>

                    <Image
                      className={styles.image_invert_center}
                      src={SKL}
                      alt="AquasTrade Logo outbound external links"
                      width={30}
                      height={30}
                      priority
                    />
                  </span>

                  <span>
                    <ConnectWallet></ConnectWallet>
                  </span>
                </div>
              </div>
            </ChartComponent>
          ) : (
            <div>
              <span> check blockers: no internet ? wss</span>

              <span>
                <ConnectWallet></ConnectWallet>{" "}
              </span>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
