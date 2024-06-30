// @ts-nocheck
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Airdrop.module.css";
import styles_container from "@/app/Styles/Home.module.css";
import SpinImage from "@/app/Components/SpinImage";
import Presale from "@/app/Components/Presale";

import { usePresale } from "@/app/Hooks/usePresale";
import { findTokenFromAddress } from "@/app/Utils/findTokens";

const Home = ({ children, params }: any) => {
  const { address, isConnected, chain } = useAccount();

  const { data: presaleTokenAddress } = usePresale("currentTokenSale");

  const sym = findTokenFromAddress(presaleTokenAddress);

  console.log("Presale: Home:  Presale token :", sym);

  return (
    <main className={styles_container.container}>
      <h1 className={styles.text_title}>IDO Platform </h1>

      {!address || !isConnected || (chain && chain.id !== CHAIN.id) ? (
        <div className="button_back">
          <Link href="/">
            {" "}
            <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
            features)
          </Link>
        </div>
      ) : (
        <div>
          {presaleTokenAddress ? (
            <span>
              {" "}
              <span className={styles_container.container}>
                {" "}
                <SpinImage imageUrl={`${sym.logo}`} />{" "}
              </span>
              <Presale props={presaleTokenAddress}></Presale>{" "}
            </span>
          ) : (
            <span> Create IDO </span>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
