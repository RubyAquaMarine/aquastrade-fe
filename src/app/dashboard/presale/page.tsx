"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Airdrop.module.css";
import SpinImage from "@/app/Components/SpinImage";
import Presale from "@/app/Components/Presale2";

const Home = ({ children, params }: any) => {
  const { address, isConnected, chain } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.text_title}>IDO Platform </h1>

      <span className={styles.text_border_bottom}> Token Sale</span>
      <SpinImage imageUrl="/AQUA.png" />

      {!address || !isConnected || (chain && chain.id !== CHAIN.id) ? (
        <div className={styles.button_back}>
          <ul>
            <li>
              <Link href="/">
                {" "}
                <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
                features)
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.container_margin}>
          <Presale></Presale>
        </div>
      )}
    </main>
  );
};

export default Home;
