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

import { coinflipABI } from "@/app/Abi/europaCoinflip";
import styles from "@/app/Styles/Links.module.css";

export interface ReadProps {
  name?: string;
}

function CoinFlip({ name }: ReadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();

  const smartConrtactValue = useReadContract({
    abi: coinflipABI,
    address: COIN_FLIP_AQUA,
    functionName: name as undefined,
    args: [address as `0x${string}`],
  });

  //todo bug : something isn't coorect
  let valueOfString;

  if (typeof smartConrtactValue?.data === "bigint") {
    if (
      smartConrtactValue?.data !=
      BigInt(
        "115792089237316195423570985008687907853269984665640564039357584007913129639936",
      )
    ) {
      valueOfString = smartConrtactValue?.data;
    } else {
      valueOfString = BigInt(0);
    }

    console.error(
      `Read Contract ${name}`,
      valueOfString,
      " SC: ",
      smartConrtactValue?.data,
    );
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

export default CoinFlip;
