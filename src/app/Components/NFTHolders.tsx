// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

import { useNFTs } from "@/app/Hooks/useAMM";
import {
  MARKETPLACE_GOLD_NFT,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
} from "@/app/Utils/config";
import styles from "@/app/Styles/AMM.module.css";

const NFTHolder = () => {
  const isNFTHolder = useRef(false);
  const { address, isConnected, chain } = useAccount();

  // NFT Balances
  const { data: nft_gold_balance, isLoading: loadingGold } = useNFTs(
    MARKETPLACE_GOLD_NFT,
    "balanceOf",
    [address],
  );
  const { data: nft_silver_balance, isLoading: loadingSilver } = useNFTs(
    MARKETPLACE_SILVER_NFT,
    "balanceOf",
    [address],
  );
  const { data: nft_bronze_balance, isLoading: loadingBronze } = useNFTs(
    MARKETPLACE_BRONZE_NFT,
    "balanceOf",
    [address],
  );

  useEffect(() => {
    if (isConnected && address) {
      isNFTHolder.current = false;

      if (nft_gold_balance && typeof nft_gold_balance === "bigint") {
        isNFTHolder.current = true;
      }

      if (nft_silver_balance && typeof nft_silver_balance === "bigint") {
        isNFTHolder.current = true;
      }

      if (nft_bronze_balance && typeof nft_bronze_balance === "bigint") {
        isNFTHolder.current = true;
      }

      console.log(
        "NFT Holder: ",
        isNFTHolder.current,
        address,
        " is connected: ",
        isConnected,
      );
    }
  }, [
    address,
    isConnected,
    nft_gold_balance,
    nft_silver_balance,
    nft_bronze_balance,
  ]);

  return (
    <>
      {isNFTHolder.current === true ? (
        <div id="PASS" className={styles.input_container}>
          Welcome NFT Holder
        </div>
      ) : (
        <div id="FAIL" className={styles.input_container}>
          <Link href="/nft">
            {" "}
            <b>Back </b>(Buy any NFT to unlock features)
          </Link>
        </div>
      )}
    </>
  );
};

export default NFTHolder;
