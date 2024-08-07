"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useLayoutEffect } from "react";
import TextSizeAdjuster from "@/app/Components/ViewPort";
import ConnectWallet from "@/app/Components/ConnectWallet";
import dynamic from "next/dynamic";
import styles from "./Styles/Landing.module.css";

import SKL from "../../public/SKL.svg";

import Footer from "@/app/Components/ai/Footer";

// build static chart for homepage
import ChartCandles from "@/app/api/binance";
const ChartComponent = dynamic(() => import("@/app/Components/ChartStatic"), {
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
                      text={"A Complete DeFi Suite"}
                      text_size="28"
                      text_size_to="48"
                    ></TextSizeAdjuster>
                  </span>
                  <span className={styles.text_body}>
                    <TextSizeAdjuster
                      text={"Reimagine"}
                      text_size="13"
                      text_size_to="16"
                    ></TextSizeAdjuster>
                    <span className={styles.text_highlight}>
                      {" "}
                      <TextSizeAdjuster
                        text={"Zero"}
                        text_size="15"
                        text_size_to="18"
                      ></TextSizeAdjuster>
                    </span>

                    <TextSizeAdjuster
                      text={"gas fees"}
                      text_size="13"
                      text_size_to="16"
                    ></TextSizeAdjuster>
                  </span>

                  <span>
                    <ConnectWallet></ConnectWallet>
                  </span>
                  <span className={styles.text_body}>
                    <span className="flex_row">
                      <span className="box_padding">
                        {" "}
                        <Link href="https://t.me/aquastrade" target="_blank">
                          <Image
                            className={styles.image_invert_center}
                            src="/TELEGRAM.png"
                            alt="AquasTrade outbound external links"
                            width={34}
                            height={34}
                            priority
                          />
                        </Link>{" "}
                      </span>

                      <span className="box_padding">
                        {" "}
                        <Link href="https://x.com/aquastrade" target="_blank">
                          <Image
                            className={styles.image_invert_center}
                            src="/X.png"
                            alt="AquasTrade outbound external links"
                            width={34}
                            height={34}
                            priority
                          />
                        </Link>{" "}
                      </span>
                      <span className="box_padding">
                        <Link
                          href="https://defillama.com/protocol/aquas-trade#information"
                          target="_blank"
                        >
                          <Image
                            className={styles.image_center}
                            src="/DEFILLAMA.png"
                            alt="AquasTrade outbound external links"
                            width={35}
                            height={35}
                            priority
                          />
                        </Link>
                      </span>
                      <span className="box_padding">
                        {" "}
                        <Link
                          href="https://github.com/aquastrade"
                          target="_blank"
                        >
                          <Image
                            className={styles.image_invert_center}
                            src={`./GITHUB.svg`}
                            alt="AquasTrade outbound external links"
                            width={28}
                            height={28}
                            priority
                          />
                        </Link>
                      </span>
                      <span className="box_padding">
                        <Link href="https://skale.space" target="_blank">
                          <Image
                            className={styles.image_invert_center}
                            src={`./SKL.svg`}
                            alt="AquasTrade outbound external links"
                            width={28}
                            height={28}
                            priority
                          />
                        </Link>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </ChartComponent>
          ) : (
            <div>
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
