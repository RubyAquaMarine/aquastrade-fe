"use client";
// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";

import A from "@/app/Components/A";

import { useContract } from "@/app/Hooks/useContract";

import {
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
  CHAIN,
} from "@/app/Utils/config";

const IndexPage = () => {
  const [data, setData] = useState(null);
  const [buttonText, setButtonText] = useState("");

  const toggleAMMFeatures = useRef("swap"); // swap, add, list

  useEffect(() => {
    setButtonText(toggleAMMFeatures.current);
  }, [toggleAMMFeatures.current]);

  const testThis = (_str: string) => {
    toggleAMMFeatures.current = _str;
    console.log("button clicked ", toggleAMMFeatures.current);
    setButtonText(toggleAMMFeatures.current);
  };

  return (
    <main>
      {" "}
      <div>
        <button onClick={() => testThis("swap")}>Swap </button> -
        <button onClick={() => testThis("add")}> Add </button> -
        <button onClick={() => testThis("list")}> List</button>
        <p> ---- </p>
        {buttonText && <div> if True </div>}
        <p> ---- </p>
        {toggleAMMFeatures.current && toggleAMMFeatures.current === "swap" ? (
          <div> {toggleAMMFeatures.current} </div>
        ) : (
          <div></div>
        )}
        <p> ---- </p>
        {toggleAMMFeatures.current && toggleAMMFeatures.current === "add" ? (
          <div> {toggleAMMFeatures.current} </div>
        ) : (
          <div></div>
        )}
        <p> ---- </p>
        {toggleAMMFeatures.current && toggleAMMFeatures.current === "list" ? (
          <div> {toggleAMMFeatures.current} </div>
        ) : (
          <div></div>
        )}
      </div>{" "}
    </main>
  );
};

export default IndexPage;
