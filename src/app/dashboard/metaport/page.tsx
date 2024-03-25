"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Links.module.css";
import MetaportWidgetV2 from "@/app/Components/MetaportWidgetV2.0";

const Home = () => {
  const { address } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          {" "}
          {!address ? (
            <div className={styles.p_styled}>
              <ul>
                <li>
                  <Link href="/">
                    {" "}
                    <b>Back </b>(use web3 login to unlock features)
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <MetaportWidgetV2 />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
