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

const NFTHolders = () => {
  const isNFTHolder = useRef(false);
  const [nftHolder, setNFTHolder] = useState(false);

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
    isNFTHolder.current = false;

    if (
      isConnected &&
      address &&
      !loadingBronze &&
      !loadingSilver &&
      !loadingGold
    ) {
      if (nft_gold_balance && typeof nft_gold_balance === "bigint") {
        isNFTHolder.current = true;
      }

      if (nft_silver_balance && typeof nft_silver_balance === "bigint") {
        isNFTHolder.current = true;
      }

      if (nft_bronze_balance && typeof nft_bronze_balance === "bigint") {
        isNFTHolder.current = true;
      }

      setNFTHolder(isNFTHolder.current);

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

  console.log(
    "Rending: NFT Holder Component: ",
    isNFTHolder.current,
    nftHolder,
  );

  return (
    <>
      {address && isConnected && nftHolder && nftHolder === true ? (
        <div id="PASS" className="input_container">
          <AirDrop></AirDrop>
        </div>
      ) : (
        <div id="FAIL">
          {nftHolder === false ? (
            <span className="button_back">
              <Link href="/dashboard/nft">
                {" "}
                <b>Back </b>(Buy any NFT to unlock features)
              </Link>
            </span>
          ) : (
            <span></span>
          )}
        </div>
      )}
    </>
  );
};

export default NFTHolders;
