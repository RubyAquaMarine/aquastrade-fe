// @ts-nocheck
"use client";
import Link from "next/link";
import { useAccount } from "wagmi";
import React, { useState, useRef } from "react";
import { formatUnits } from "viem";

import { useNFTs } from "@/app/Hooks/useAMM";
import {
  MARKETPLACE_GOLD_NFT,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
} from "@/app/Utils/config";
import styles from "@/app/Styles/AMM.module.css";

const NFTBalance = () => {
  const { address, isConnected, chain } = useAccount();

  // NFT Balances
  const { data: nft_gold_balance } = useNFTs(
    MARKETPLACE_GOLD_NFT,
    "balanceOf",
    [address],
  );
  const { data: nft_silver_balance } = useNFTs(
    MARKETPLACE_SILVER_NFT,
    "balanceOf",
    [address],
  );
  const { data: nft_bronze_balance } = useNFTs(
    MARKETPLACE_BRONZE_NFT,
    "balanceOf",
    [address],
  );

  console.log("Rendered NFT ");

  return (
    <div className={styles.input_container}>
      {address && isConnected ? (
        <div>
          <div className={styles.input_container_solo}>
            <p>Gold NFT Holder</p>
            <p className={styles.amount_balance}>
              {!nft_gold_balance
                ? "0.0"
                : typeof nft_gold_balance === "bigint" &&
                  formatUnits(nft_gold_balance, 0)}
            </p>

            <p>Silver NFT Holder</p>

            <p className={styles.amount_balance}>
              {!nft_silver_balance
                ? "0.0"
                : typeof nft_silver_balance === "bigint" &&
                  formatUnits(nft_silver_balance, 0)}
            </p>

            <p>Bronze NFT Holder</p>
            <p className={styles.amount_balance}>
              {!nft_bronze_balance
                ? "0.0"
                : typeof nft_bronze_balance === "bigint" &&
                  formatUnits(nft_bronze_balance, 0)}
            </p>
          </div>
        </div>
      ) : (
        <div className="button_back">
          <Link href="/">
            {" "}
            <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
            features)
          </Link>
        </div>
      )}
    </div>
  );
};

export default NFTBalance;
