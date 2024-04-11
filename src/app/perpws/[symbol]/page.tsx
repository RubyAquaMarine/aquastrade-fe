"use client";
import React, { useEffect, useRef, useState } from "react";
//import { useRouter } from "next/router"  // For server side
import { usePathname, useRouter } from "next/navigation"; // for client side
import dynamic from "next/dynamic";
import Link from "next/link";

import "react-range-slider-input/dist/style.css";
import Image from "next/image";
//import { cookies} from "next/headers";// todo dynamic rendering is server side only
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Perps.module.css";

import WebSocketConnection from "@/app/Utils/WebSocketConnection";

import { getWebSocket } from "@/app/Utils/web-socket";

import ChartCandles from "@/app/api/binance";

const ChartComponent = dynamic(() => import("@/app/Components/ChartTV2.2"), {
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
  const dataIs = useRef<any>({});

  const [renderAgain, setRenderAgain] = useState<any>();

  //  console.log("renderAgain--: ", typeof dataIs, dataIs.current);// Object

  const [dataStream, setDataStream] = useState<Array<CandlestickData>>([]);

  const [inputs, setInputs] = useState(["", ""]);
  const [sliderValue, setSliderValue] = useState([30, 60]);
  const [dataTV, setDataToTV] = useState<Array<CandlestickData>>([]);
  const [dataTVVolume, setDataToTVVolume] = useState<Array<CandlestickData>>(
    [],
  );

  const url = usePathname();
  const Asset = url.slice(8).toUpperCase(); // todo : /perp vs /perpTestMode ( the length of the url name can break this code)
  //  console.error(" Route Url is ", Asset);

  const desc = ["0.0", "50"];
  const desctwo = ["PAY", "POSITION"];

  const getDataCallBack = async () => {
    try {
      const bars = await ChartCandles(Asset);

      // console.error("Rendered bars: ", bars?.[0], bars?.[1]);
      setDataToTV(bars?.[0]);
      setDataToTVVolume(bars?.[1]);
    } catch {
      console.error("unable to get ChartCandles() ");
    }
  };
  useEffect(() => {
    getDataCallBack();
  }, [getDataCallBack, Asset]);

  const { chains, switchChain } = useSwitchChain();
  const { address } = useAccount();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  useEffect(() => {
    const websocket = getWebSocket();
    if (websocket) {
      websocket.onmessage = (event) => {
        const out = JSON.parse(event.data);

        dataIs.current = out;

        if (out) {
          const tv_stream = {
            //time: Date.now() /1000,
            // time:  Number(Number(Date.now() /1000).toFixed(0)) ,
            time: Number(Number(out?.k?.t / 1000).toFixed(0)),
            open: Number(out?.k?.o),
            high: Number(out?.k?.h),
            low: Number(out?.k?.l),
            close: Number(out?.k?.c),
          };
          // console.log("setStream with Latest Bar Data --: ", typeof tv_stream, tv_stream);// Object
          setRenderAgain(tv_stream);
        }
      };
    }
  }, [dataIs]);

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
              <li>{renderAgain?.close}</li>
              <li>+4.04% </li>

              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {/** Notes  */}

          <div className={styles.tradeChart}>
            <ChartComponent
              stream={renderAgain}
              colors={{}}
              data={[dataTV, dataTVVolume]}
            >
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
              <li className={styles.tradeSlider}>
                {" "}
              
              </li>
            </ul>
          </div>
        </div>
      )}
      <WebSocketConnection></WebSocketConnection>
    </main>
  );
};

export default Home;
