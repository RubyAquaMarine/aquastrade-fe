"use client";

import React from "react";
import SwapPanel from "../../Components/SwapPanel";
import { useAccount } from "wagmi";
import Link from "next/link";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Links.module.css";
//  {params} : {params: {id : string}}
const SwapAMMV2 = ({ params }: any) => {
  const { chain, address } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!address || (chain && chain.id !== CHAIN.id) ? (
        <div className={styles.p_styled}>
          <ul>
            {" "}
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
        <div>
          <SwapPanel />
        </div>
      )}
    </main>
  );
};

export default SwapAMMV2;
