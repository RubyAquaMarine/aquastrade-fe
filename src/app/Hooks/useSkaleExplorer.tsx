// @ts-nocheck
"use client";
import React, { useRef } from "react";

interface WALLET {
  address: `0x${string}`;
}

//  {params} : {params: {id : string}} aka user wallet address
export const useSkaleExplorer = (params: WALLET) => {
  const addressWallet = params;

  console.log("useSkaleExplorer ");

  const wallet = useRef([]);

  const getDataCallBack = () => {
    const fetchData = async () => {
      if (addressWallet) {
        try {
          const apiString = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/api?module=account&action=tokenlist&address=${addressWallet}`;
          const response = await fetch(apiString);
          const jsonData = await response.json();
          const assetList = jsonData?.result;
          wallet.current = assetList;
        } catch {
          console.log("unable to get Token list ");
        }
      }
    };

    fetchData();
  };

  getDataCallBack();

  return wallet.current;
};

export const useSkaleExplorerAddresses = (params: WALLET) => {
  console.log(
    "useSkaleExplorerAddresses: unable to get Token list 1  ",
    params,
  );
  const addressWallet = params;

  const wallet = useRef([]);

  const getDataCallBack = () => {
    console.log("useSkaleExplorerAddresses: unable to get Token list 2  ");
    const fetchData = async () => {
      console.log("useSkaleExplorerAddresses: unable to get Token list 3  ");
      if (addressWallet) {
        try {
          const apiString = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/api/v2/addresses/${addressWallet}`;
          const response = await fetch(apiString);
          const jsonData = await response.json();
          const assetList = jsonData?.token;
          if (assetList) {
            wallet.current = assetList;
          }
        } catch {
          console.log("useSkaleExplorerAddresses: unable to get Token list ");
        }
      }
    };

    fetchData();
  };

  getDataCallBack();

  return wallet.current;
};
