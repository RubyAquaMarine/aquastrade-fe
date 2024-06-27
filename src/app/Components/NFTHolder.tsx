// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";

import AirDrop from "@/app/Components/AirDrop";
import { useNFTs } from "@/app/Hooks/useAMM";
import {
  MARKETPLACE_GOLD_NFT,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
} from "@/app/Utils/config";

/*
 What nft does the wallet contain? and if more than 1 tier, return the highest tier 
*/
const NFTHolder = () => {
  const isNFTHolder = useRef(false);
  const nftType = useRef("No NFT");

  const isNFTHolderBronze = useRef(false);
  const isNFTHolderSilver = useRef(false);
  const isNFTHolderGold = useRef(false);

  const [nftHolder, setNFTHolder] = useState<boolean>();

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
    if (
      isConnected &&
      address &&
      !loadingBronze &&
      !loadingSilver &&
      !loadingGold
    ) {
      if (nft_bronze_balance && typeof nft_bronze_balance === "bigint") {
        isNFTHolder.current = true;
        isNFTHolderBronze.current = true;
        nftType.current = "Bronze Member";
      }

      if (nft_silver_balance && typeof nft_silver_balance === "bigint") {
        isNFTHolder.current = true;
        isNFTHolderSilver.current = true;
        nftType.current = "Silver Member";
      }

      if (nft_gold_balance && typeof nft_gold_balance === "bigint") {
        isNFTHolder.current = true;
        isNFTHolderGold.current = true;
        nftType.current = "Gold Member";
      }

      setNFTHolder(isNFTHolder.current);
    }
  }, [
    address,
    isConnected,
    nft_gold_balance,
    nft_silver_balance,
    nft_bronze_balance,
  ]);

  console.log(
    "NFT Holder: ",
    isNFTHolder.current,

    " Gold ",
    isNFTHolderGold.current,
    " Silver ",
    isNFTHolderSilver.current,
    " Bronze ",
    isNFTHolderBronze.current,
  );

  return (
    <>
      {(address &&
        isConnected &&
        isNFTHolderGold.current &&
        isNFTHolderGold.current === true) ||
      (address &&
        isConnected &&
        isNFTHolderSilver.current &&
        isNFTHolderSilver.current === true) ||
      (address &&
        isConnected &&
        isNFTHolderBronze.current &&
        isNFTHolderBronze.current === true) ? (
        <div id="PASS" className="input_container">
          {nftType.current}
        </div>
      ) : (
        <div id="FAIL"> {nftType.current}</div>
      )}
    </>
  );
};

export default NFTHolder;
