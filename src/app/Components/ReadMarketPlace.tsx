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

  // todo
  // filter by is for sale or not?
  let gold = -1,
    bronze = -1,
    silver = -1;
  let counter = 0;
  if (smartConrtactValue?.data) {
    // find and save next nft within collection
    smartConrtactValue?.data.forEach((element) => {
      if (element.nft === MARKETPLACE_GOLD_NFT && gold === -1) {
        // is gold gold, bronze, silver
        gold = counter;
      }
      if (element.nft == MARKETPLACE_SILVER_NFT && silver === -1) {
        // is gold gold, bronze, silver
        silver = counter;
      }
      if (element.nft == MARKETPLACE_BRONZE_NFT && bronze === -1) {
        // is gold gold, bronze, silver
        bronze = counter;
      }
      counter++; // testing
    });
  }

  console.log("test component", silver, gold, bronze);

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
        <div>
          <button className={styles.buttonDisplay}>
            Next Gold Slot: {gold?.toString()}
          </button>
          <button className={styles.buttonDisplay}>
            Next Silver Slot: {silver?.toString()}
          </button>
          <button className={styles.buttonDisplay}>
            Next Bronze Slot: {bronze?.toString()}
          </button>
        </div>
      ) : (
        <div>
          {" "}
          <button className={styles.buttonDisplay}>Reload</button>
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
