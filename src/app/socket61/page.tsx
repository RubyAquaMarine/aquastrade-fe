// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WebSocketConnection from "@/app/Components/WebSocketConnection";
import { getWebSocket } from "@/app/Utils/web-socket";
import Chart from "@/app/Components/Chart6.1"; //
import { useAccount, useSwitchChain } from "wagmi";

/* using import Chart from "@/app/Components/Chart6";

- one line at a time : clean code : find out why it's working 

*/

/* using import Chart from "@/app/Components/Chart6";

- ws within the component: not this pages websocket data 

*/

// not dependent but plan to use later ( UX: selects tf and pass props to <Chart props={}>)
const testTF = "1m";

// Symbol ????

const Home = ({ children, params }: any) => {
  const { address, chain } = useAccount();
  //
  const domElement = useRef();

  // save data from websocket
  const dataIs = useRef<any>({});
  // update ui
  const [renderAgain, setRenderAgain] = useState<any>();

  // Connect to websocket
  useEffect(() => {
    const websocket = getWebSocket();
    if (websocket) {
      websocket.onmessage = (event) => {
        const out = JSON.parse(event.data);
        dataIs.current = out;
        const dataFormatted = configDataToSend(dataIs.current);
        setRenderAgain(dataFormatted);
      };
    }
  }, [dataIs]);

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

  // nothing important here. just testing
  useEffect(() => {
    const _domElement = window.document.getElementById("btc");
    domElement.current = _domElement;

    console.log(" Dom is ", domElement);

    // btc is no longer found and now wow chart is being assigned
    const _domElementChart = window.document.getElementById("wow-chart");

    console.log(" Chart  is ", _domElementChart);
  });

  return (
    <main className="">
      <div id="btc">
        <Link href="#wow-chart"> Dead Chart </Link>{" "}
      </div>

      {address ? (
        <div>
          {children}
          <WebSocketConnection></WebSocketConnection>
          <spam> {dataIs.current?.s}</spam>{" "}
          <spam className="color-aqua"> {dataIs.current?.k?.c} </spam>
          <h2> volume </h2>
          {dataIs.current?.k?.v}
        </div>
      ) : (
        <div></div>
      )}

      {dataIs.current?.E ? (
        <div id="wow-chart">
          {" "}
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
        <div></div>
      )}
    </main>
  );
};

export default Home;
