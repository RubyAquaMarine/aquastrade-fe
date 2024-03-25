"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

import {
  COIN_FLIP_AQUA,
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
} from "@/app/Utils/config";
import { ERC20_ABI } from "@/app/Abi/erc20";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";
import styles from "@/app/Styles/Links.module.css";

export interface ReadProps {
  name?: string;
  args: any;
}

function MarketPlace({ name, args }: ReadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();

  const smartConrtactValue = useReadContract({
    abi: marketplaceABI,
    address: MARKETPLACE_AQUADEX,
    functionName: name as undefined,
    args: args as undefined,
  });

  let valueOfString;

  if (smartConrtactValue?.data) {
    valueOfString = smartConrtactValue?.data;
  }

  // This useEffect hook ensures that the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {}, []);

  if (!isMounted) {
    return null; // Don't render anything on the server side
  }

  return (
    <div>
      {isConnected ? (
        <button className={styles.buttonDisplay}>
          {name?.toUpperCase()} {valueOfString?.toString()}
        </button>
      ) : (
        <button className={styles.buttonDisplay}>Reload</button>
      )}
    </div>
  );
}

export default MarketPlace;
