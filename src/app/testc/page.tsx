"use client";
// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { parseEther, parseUnits, formatUnits } from "viem";

import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { useMarketPlace } from "@/app/Hooks/useMarketPlace";
import { useERC20Token } from "@/app/Hooks/useAMM";
import styles from "@/app/Styles/Container.module.css";

import {
  MARKETPLACE_AQUADEX,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
  CHAIN,
} from "@/app/Utils/config";

const Home = () => {
  const allowancesTest = useRef(BigInt(1));
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { address, isConnected, chain } = useAccount();
  const eth_address = findTokenAddressFromSymbol(
    "ETH",
  ) as unknown as `0x${string}`;
  const array: any[any] = [address, MARKETPLACE_AQUADEX];
  const { data: tokenAllowance } = useERC20Token(
    eth_address,
    "allowance",
    array,
  );

  // Save the state and update when useBuy is called
  const gold = useRef(-1);
  const silver = useRef(-1);
  const bronze = useRef(-1);

  // refactor or just make useMarketPlaceRead
  const {
    data: MarketPlace,
    isLoading,
    isError,
  } = useMarketPlace("getListedItems");

  console.log(" User Allowance ", tokenAllowance, allowancesTest.current);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
    }
  }, [contractCallDataConfirmed]);

  // Once the Marketplace data exists , filter through and find , store the nfts that will be for sale. 1 of 50000
  useEffect(() => {
    let counter = 0;
    if (MarketPlace && typeof MarketPlace === "object") {
      // find and save next nft within collection
      MarketPlace.forEach((element) => {
        if (element.nft === MARKETPLACE_GOLD_NFT && gold.current === -1) {
          gold.current = counter;
        }
        if (element.nft == MARKETPLACE_SILVER_NFT && silver.current === -1) {
          silver.current = counter;
        }
        if (element.nft == MARKETPLACE_BRONZE_NFT && bronze.current === -1) {
          bronze.current = counter;
        }
        counter++; // testing
      });

      console.log("  NFTS ", gold, silver, bronze);
    }
    if (typeof tokenAllowance === "bigint") {
      allowancesTest.current = tokenAllowance;
    }
  }, [MarketPlace, tokenAllowance]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.container}>Hello</div>
    </main>
  );
};
export default Home;
/*


*/
