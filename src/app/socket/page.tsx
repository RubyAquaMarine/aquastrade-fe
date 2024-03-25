"use client";
import React, { useEffect, useRef, useState } from "react";

import WebSocketConnection from "@/app/Utils/WebSocketConnection";

import { getWebSocket } from "@/app/Utils/web-socket";
import styles from "@/app/Styles/Links.module.css";

const Home = ({ children, params }: any) => {
  const dataIs = useRef<any>({});

  const [renderAgain, setRenderAgain] = useState<any>();

  console.log("renderAgain--: ", typeof dataIs, dataIs.current?.s);// Object 


  useEffect(() => {
    const websocket = getWebSocket();
    if (websocket) {
      websocket.onmessage = (event) => {
        //  console.log("messages 1: ", typeof event.data);// String
        const out = JSON.parse(event.data);// converts to object in json format
        console.log("Strean ", typeof out, out);// Object 

        // WORKING for KLINE STREAM 
        //  console.log("messages ==> E  , ", out.s);
        // console.log("messages ==> o  , ", out.k.o);
        // console.log("messages ==> h  , ", out.k.h);
        // console.log("messages ==> l  , ", out.k.l);
        // console.log("messages ==> c  , ", out.k.c);
        // WORKING for TICKER STREAM 
        // console.log("messages ==> E  , ", out[0]?.s);
        // console.log("messages ==> E  , ", out[1]?.s);
        // console.log("messages ==> E  , ", out[2]?.s);
        // console.log("messages ==> E  , ", out[4]?.s);
        dataIs.current = out;
        setRenderAgain(out);

      };
    }
  }, [dataIs]);

  return (
    <main className="">

      <div >
        {children}
        <WebSocketConnection>


        </WebSocketConnection>


        <h1>  Kline </h1>
        <h2>  Market  </h2>
        {dataIs.current?.s}
        <h2>  open  </h2>
        {dataIs.current?.k?.o}

        <h2>  high  </h2>
        {dataIs.current?.k?.h}

        <h2>  low  </h2>
        {dataIs.current?.k?.l}

        <h2>  close (tick pulse) </h2>
        {dataIs.current?.k?.c}

        <h2>  volume </h2>
        {dataIs.current?.k?.v}

        <h2>  Time ? .t</h2>
        {dataIs.current?.k?.t}

        <h2>  Time ? .T</h2>
        {dataIs.current?.k?.T}

        <h2>  Time ? .E</h2>
        {dataIs.current?.E}

        <h2>  Time Now </h2>
        {Date.now()}


        <p>  </p>

      </div>
    </main>
  );
};

export default Home;
/*

  {dataIs.current ? <div>  <h1 className={styles.toggleButton}> Trades</h1>
        <h1>  Kline </h1>
        <h2>  Market  </h2>
        {dataIs.current?.s}
        <h2>  open  </h2>
        {dataIs.current?.k.o}
        <h2>  high </h2>
        {dataIs.current?.k.h}
        <h2>  low  </h2>
        {dataIs.current?.k.l}
        <h2>  close  </h2>
        {dataIs.current?.k.c} </div> : <div>
      </div>}

 <h2>  Test 1 </h2>

      {renderAgain.map((index, a,b,c) => (

        <p key={index}> 
        
        <button className={styles.tradeup}>|{b.toString()}| </button>

      
        </p>

      ))}




<div> {renderAgain[].map((index, data)=>{
        <ul>
        <li key= {index}> {data.s[index]} </li>

        </ul>
      })}</div>
*/