"use client";

import React from "react";
import SwapPanel from "../../Components/SwapPanel";
import { useAccount } from "wagmi";
import Link from "next/link";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Home.module.css";
//  {params} : {params: {id : string}}
const SwapAMMV2 = ({ params }: any) => {
  const { chain, address } = useAccount();
  //className="flex min-h-screen flex-col items-center justify-between p-24"
  return (
    <main className={styles.container}>
      {!address || (chain && chain.id !== CHAIN.id) ? (
        <div className="button_back">
          <Link href="/">
            {" "}
            <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
            features)
          </Link>
        </div>
      ) : (
        <div>
          <SwapPanel />
        </div>
      )}
    </main>
  );
};

export default SwapAMMV2;
