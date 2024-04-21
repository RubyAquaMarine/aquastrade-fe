// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
// using this
import WebSocketConnection from "@/app/Utils/WebSocketConnection";
import { getWebSocket } from "@/app/Utils/web-socket";
import Chart from "@/app/Components/Chart6.1"; //

// not dependent but plan to use later ( UX: selects tf and pass props to <Chart props={}>)
const testTF = "1m";

const Home = ({ children, params }: any) => {
  // save data from websocket
  const dataIs = useRef<any>({});
  // update ui
  const [renderAgain, setRenderAgain] = useState<any>();

  // console.log("Socket before ", typeof dataIs, dataIs.current?.s); // Object
  // console.log("Socket after ", typeof renderAgain, renderAgain); //

  // Connect to websocket
  useEffect(() => {
    const websocket = getWebSocket();
    if (websocket) {
      websocket.onmessage = (event) => {
        const out = JSON.parse(event.data); // converts to object in json format
        dataIs.current = out;
        const dataFormatted = configDataToSend(dataIs.current);
        setRenderAgain(dataFormatted);
        // update chart
        chart.current.updateData(renderAgain);
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

  // create the Chart at initialize
  const chart = useRef();

  useEffect(() => {
    const domElement = window.document.getElementById("btc");

    console.log("Window", window.document);
    console.log(" ID is ", domElement?.id);
  }, []);

  return (
    <main className="">
      <div id="btc"> </div>
      <div>
        {children}
        <WebSocketConnection></WebSocketConnection>
        <h2> Market </h2>
        <spam> {dataIs.current?.s}</spam>{" "}
        <spam className="color-aqua"> {dataIs.current?.k?.c} </spam>
        <h2> volume </h2>
        {dataIs.current?.k?.v}
      </div>
      {dataIs.current?.E ? (
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
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Home;

/* using import Chart from "@/app/Components/Chart6";

- one line at a time : clean code : find out why it's working 

*/

/* using import Chart from "@/app/Components/Chart6";

- ws within the component: not page 

*/
