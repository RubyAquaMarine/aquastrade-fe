"use client";
import React, { useEffect, useState } from "react";
//import { useRouter } from "next/router"  // For server side
import { usePathname, useRouter } from "next/navigation"; // for client side
import dynamic from "next/dynamic";
import Link from "next/link";

import "react-range-slider-input/dist/style.css";

import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Perps.module.css";

import ChartCandles from "@/app/api/binance";

const ChartComponent = dynamic(() => import("@/app/Components/ChartTV2.1"), {
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

const Home = ({ children, params }: any) => {
  const [inputs, setInputs] = useState(["", ""]);
  const [sliderValue, setSliderValue] = useState([30, 60]);
  const [dataTV, setDataToTV] = useState<Array<CandlestickData>>([]);
  const [dataTVVolume, setDataToTVVolume] = useState<Array<CandlestickData>>(
    [],
  );

  const url = usePathname();
  const Asset = url.slice(6).toUpperCase();
  console.error(" Route Url is ", Asset);

  const desc = ["0.0", "50"];
  const desctwo = ["PAY", "POSITION"];

  const getDataCallBack = async () => {
    try {
      const bars = await ChartCandles(Asset);
      console.error("Rendered bars: ", bars?.[0], bars?.[1]);
      setDataToTV(bars?.[0]);
      setDataToTVVolume(bars?.[1]);
    } catch {
      console.error("unable to get ChartCandles() ");
    }
  };

  useEffect(() => {
    getDataCallBack();
  }, [Asset]);

  const { chains, switchChain } = useSwitchChain();
  const { address } = useAccount();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  function getInputValue(index: number) {
    //stake
    if (index === 0) {
      return inputs[0];
    }
    //lock
    if (index === 1) {
      return inputs[1];
    }
  }

  return (
    <main className="">
      {!addr ? (
        <div className={styles.p_styled}>
          <ul>
            <li>
              <Link href="/">
                {" "}
                <b>Back </b>(use web3 login to unlock features)
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.tradeContainer}>
          <div>
            {/** Notes top navigation  and add li for new columns  */}
            <ul className={styles.tradeNav}>
              <li className={styles.tradeAvailAssets}>
                {" "}
                (logo) <b>{params?.symbol.toUpperCase()}</b>{" "}
              </li>
              <li>3923.42</li>
              <li>+4.04% </li>

              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {/** Notes  */}

          <div className={styles.tradeChart}>
            <ChartComponent colors={{}} data={[dataTV, dataTVVolume]}>
              {children}
            </ChartComponent>
          </div>

          <div>
            <ul className={styles.tradeButtons}>
              <li> pnl </li>

              <li className={styles.tradeButtonSell}>
                <button>Sell</button>
              </li>
              <li>
                {" "}
                {inputs.map((value, index) => (
                  <div key={index} className="mb-4">
                    <p>
                      {" "}
                      {`${desctwo[index]}`}{" "}
                      {desctwo[index] === "PAY" ? (
                        <li className={styles.tradeBalance}>
                          <Link href={`/user/${address}`}>
                            {" "}
                            {/* add balance input here */} Balance: $94.0493{" "}
                          </Link>
                        </li>
                      ) : (
                        <li></li>
                      )}
                    </p>

                    <p>
                      {" "}
                      {desctwo[index] === "POSITION" ? (
                        <li className={styles.tradeBalance}>
                          <Link href={`/user/${address}`}>
                            {" "}
                            {/* add liq price input here */} Liq Price: 0.23 |
                            0.08{" "}
                          </Link>
                        </li>
                      ) : (
                        <li></li>
                      )}
                    </p>

                    {desctwo[index] === "PAY" ? (
                      <li>
                        <input
                          className={styles.tradeInput}
                          type="text"
                          value={getInputValue(index)} // Call a function to get the appropriate value
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          placeholder={`${desc[index]}`}
                        />
                      </li>
                    ) : (
                      <li></li>
                    )}
                  </div>
                ))}
              </li>

              <li className={styles.tradeButtonBuy}>
                <button>Buy</button>
              </li>
              <li className={styles.tradeSlider}> </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
