// @ts-nocheck
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // for client side

import WebSocketConnection from "@/app/Components/WebSocketConnection";
import { getWebSocket } from "@/app/Utils/web-socket";
import Chart from "@/app/Components/ChartWSS";

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
  const [chartPrice, setChartPrice] = useState(0.01);
  const { address } = useAccount();
  const [inputs, setInputs] = useState(["", ""]);
  const [sliderValue, setSliderValue] = useState([30, 60]);

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
    console.log(" Perps : getElementById  ", _domElement);
    // btc is no longer found and now wow chart is being assigned
    const _domElementChart = window.document.getElementById("wow-chart");
    console.log(" Perps : getElementById  ", _domElementChart);
  });

  // Connect to websocket
  useEffect(() => {
    const websocket = getWebSocket(); // todo how to pass in 'Asset'

    console.log(" Perps : use Effect websocket", websocket);

    if (websocket) {
      console.log(" Perps : web wss ");
      websocket.onmessage = (event) => {
        const out = JSON.parse(event.data);
        if (out) {
          console.log(" Perps : onmessage ", out);
          dataIs.current = out;
          setChartPrice(Number(dataIs.current?.k?.c));
          const dataFormatted = configDataToSend(dataIs.current);
          if (dataFormatted) {
            setRenderAgain(dataFormatted);
          }
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
    <main>
      {!address ? (
        <div className="button_back">
          <Link href="/">
            {" "}
            <b>Back </b>(use web3 login to unlock features)
          </Link>
        </div>
      ) : (
        <div className={styles.tradeContainer}>
          {children}
          {/** Note: idk why this is required since  <Chart> contains the ws connection  */}
          <WebSocketConnection></WebSocketConnection>

          {/** Notes top navigation  and add li for new columns  */}
          <ul className={styles.trade_nav_top}>
            <li className={styles.tradeAvailAssets}>
              {/** Not ready for Asset  navigation yet: need functional chart component  */}
              <span>
                {" "}
                <Image
                  src="/ETH.svg"
                  alt="Skale: Perpertual Assets Menu"
                  width={22}
                  height={22}
                />{" "}
              </span>{" "}
              <span className={styles.tradeAvailAssetsMargin}>
                {" "}
                <b>{params?.symbol.toUpperCase()}</b>{" "}
              </span>
            </li>
            <li className={styles.tradeAvailAssetsPrice}>
              {/** Note: todo: decimals skl and others 0.0000  */}
              {chartPrice && typeof chartPrice === "number"
                ? chartPrice?.toFixed(2)
                : "0.0"}
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

          {/** Note: for nav here - tf -   */}
          <span className={styles.trade_nav_tf}>
            {" "}
            <span className={styles.tradeTF}>M1 </span>{" "}
            <span className={styles.tradeTF}>M5 </span>{" "}
            <span className={styles.tradeTF}>M30 </span>{" "}
            <span className={styles.tradeTF}> H1</span>{" "}
            <span className={styles.tradeTF}>H6 </span>{" "}
            <span className={styles.tradeTF}> H12</span>
          </span>
          {/** this is kinda of a mess :  */}
          <ul className={styles.panel_trading}>
            <li></li>
            <li></li>

            <li className={styles.tradeButtonSell}>
              <button>Sell</button>
            </li>
            {/** Recode  */}
            {/** Note: This should maintain center viewport  */}
            <li className={styles.panel_center}>
              {" "}
              {inputs.map((value, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <span> {`${desctwo[index]}`} </span>

                    {desctwo[index] === "PAY" ? (
                      <span className={styles.panel_balance}>
                        <Link href={`/user/${address}`}>
                          {" "}
                          {/* add balance input here */} Balance: $94.0493{" "}
                        </Link>
                        <span className={styles.panel_text}>
                          {" "}
                          <button type="button">Deposit</button>{" "}
                          <button type="button">Withdraw</button>
                        </span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </p>

                  <p>
                    {" "}
                    {desctwo[index] === "POSITION" ? (
                      <span className={styles.panel_position}>
                        <Link href={`/user/${address}`}>
                          {" "}
                          {/* add liq price input here */} Liq Price: 0.23 |
                          0.08{" "}
                        </Link>
                        <span className={styles.panel_order_type}>
                          {" "}
                          <button type="button">Limit</button>{" "}
                          <button type="button">Stop</button>
                          <button type="button">TP</button>
                          <button type="button">SL</button>
                        </span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </p>

                  {desctwo[index] === "PAY" ? (
                    <span>
                      <input
                        className={styles.trade_input}
                        type="text"
                        value={getInputValue(index)} // Call a function to get the appropriate value
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        placeholder={` Enter USD Amount ${desc[index]}`}
                      />
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              ))}
            </li>
            {/** Note: This should maintain center viewport  */}

            <li className={styles.tradeButtonBuy}>
              <button>Buy</button>
            </li>

            <li></li>
            <li></li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Home;
