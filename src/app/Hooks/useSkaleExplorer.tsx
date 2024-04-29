// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface WALLET {
  address: `0x${string}`;
}

//  {params} : {params: {id : string}} aka user wallet address
const useSkaleExplorer = (params: WALLET) => {
  const addressWallet = params;

  const wallet = useRef([]);

  const getDataCallBack = () => {
    const fetchData = async () => {
      try {
        const apiString = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/api?module=account&action=tokenlist&address=${addressWallet}`;
        console.log("Block Exploerer api string ", apiString);
        const response = await fetch(apiString);
        const jsonData = await response.json();
        const assetList = jsonData?.result;
        wallet.current = assetList;
      } catch {
        console.log("unable to get Token list ");
      }
    };

    fetchData();
  };

  getDataCallBack();

  return wallet.current;
};

export default useSkaleExplorer;
