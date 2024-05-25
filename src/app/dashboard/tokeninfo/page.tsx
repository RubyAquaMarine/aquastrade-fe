"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/app/Styles/Container.module.css";

import { useAccount } from "wagmi";

import TokenCards from "@/app/Components/TokenCards";
import { CHAIN } from "@/app/Utils/config";

const Home = () => {
  const { address, isConnected, chain } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!address || !isConnected || (chain && chain.id !== CHAIN.id) ? (
        <div className={styles.toggle_button}>
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
        <TokenCards></TokenCards>
      )}
    </main>
  );
};
export default Home;
