// @ts-nocheck
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // for client side

import WebSocketConnection from "@/app/Components/WebSocketConnection";
import { getWebSocket } from "@/app/Utils/web-socket";
import Chart from "@/app/Components/Chart6.2"; // 6.2 resize to original,,,

import { useAccount, useSwitchChain } from "wagmi";

import styles from "@/app/Styles/Perps.module.css";

const testTF = "1m";

// add this to
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
  const [chartPrice, setChartPrice] = useState(0.0);
  const { address } = useAccount();
  const [inputs, setInputs] = useState(["", ""]);
  const [sliderValue, setSliderValue] = useState([30, 60]);
  // Add Chart.6.1
  const domElement = useRef();
  const dataIs = useRef<any>({});
  const [renderAgain, setRenderAgain] = useState<any>();
  const url = usePathname();
  const Asset = url.slice(6).toUpperCase();
  console.log(" Route Url is ", Asset, " ws data ", dataIs, " addr: ", address);

  const desc = ["0.0", "50"];
  const desctwo = ["PAY", "POSITION"];

  // nothing important here. just testing
  useEffect(() => {
    const _domElement = window.document.getElementById("btc");
    console.log(" Dom is ", _domElement);
    // btc is no longer found and now wow chart is being assigned
    const _domElementChart = window.document.getElementById("wow-chart");
    console.log(" Chart  is ", _domElementChart);
  });

  // Connect to websocket
  useEffect(() => {
    const websocket = getWebSocket();
    if (websocket) {
      websocket.onmessage = (event) => {
        const out = JSON.parse(event.data);
        dataIs.current = out;
        setChartPrice(dataIs.current?.k?.c);
        const dataFormatted = configDataToSend(dataIs.current);
        if (dataFormatted) {
          setRenderAgain(dataFormatted);
        }
      };
    }
  }, [dataIs]);

  // nothing important here. just testing
  useEffect(() => {
    const _domElement = window.document.getElementById("btc");
    domElement.current = _domElement;
    console.log(" Dom is ", domElement);
    // btc is no longer found and now wow chart is being assigned
    const _domElementChart = window.document.getElementById("wow-chart");
    console.log(" Chart  is ", _domElementChart);
  });

  function configDataToSend(dataToSend: any) {
    let data = {
      date: dataToSend["E"], // Kline Close time
      open: dataToSend["k"]["o"], // Open price
      high: dataToSend["k"]["h"], // High price
      low: dataToSend["k"]["l"], // Low price
      close: dataToSend["k"]["c"], // Close price
      volume: dataToSend["k"]["v"], // Volume
    };

    return JSON.stringify(data);
  }

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
      {!address ? (
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
          {children}
          {/** Note: idk why this is required since  <Chart> contains the ws connection  */}
          <WebSocketConnection></WebSocketConnection>
          {/** Notes top navigation  and add li for new columns  */}
          <ul className={styles.tradeNav}>
            <li className={styles.tradeAvailAssets}>
              {/** Not ready for Asset  navigation yet: need functional chart component  */}
              <span>
                {" "}
                <Image
                  src="/ETH.svg"
                  alt="Skale: Perpertual Assets Menu"
                  width={22}
                  height={22}
                  priority
                />{" "}
              </span>{" "}
              <span className={styles.tradeAvailAssetsMargin}>
                {" "}
                <b>{params?.symbol.toUpperCase()}</b>{" "}
              </span>
            </li>
            <li className={styles.tradeAvailAssetsPrice}>
              {/** Note: todo: decimals skl and others 0.0000  */}
              {chartPrice ? chartPrice.toFixed(2) : "0.0"}
            </li>
          </ul>
          {/** Note: render chart : load historical data: connect ws:  */}
          {dataIs.current?.E ? (
            <div id="wow-chart">
              <Chart
                props={[
                  dataIs.current?.s,
                  testTF,
                  dataIs.current?.E,
                  dataIs.current?.k?.o,
                  dataIs.current?.k?.h,
                  dataIs.current?.k?.l,
                  dataIs.current?.k?.c,
                  dataIs.current?.k?.v,
                ]}
              ></Chart>
            </div>
          ) : (
            <div>no chart error?</div>
          )}
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
      )}
    </main>
  );
};

export default Home;
