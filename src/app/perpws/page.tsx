"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Links.module.css";

import { CHAIN } from "@/app/Utils/config";

//http://localhost:3000/perps (Hello page)

const Home = () => {
  const { chains, switchChain } = useSwitchChain();
  const { address, chain } = useAccount();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!addr || (chain && chain.id !== CHAIN.id) ? (
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
        <div>
          <h4 className={styles.topText}>
            {" "}
            No Gas Fees - No Oracle Fees - Cross Margin{" "}
          </h4>
          <h1 className={styles.midText}>Almost Free Leveraged Trading </h1>
          <p className={styles.topText}>
            {" "}
            AQUA has all the features you need for fast, cheap, and secure
            on-chain trading, including:
          </p>
          <div className={styles.textDesc}>
            <p className={styles.textBold}> Cross-Margin</p>
            <p className={styles.testAlignLeft}>
              Margin is shared between positions, minimizing liquidations with
              up to 200x leverage.
            </p>

            <p className={styles.textBold}> Risk Management</p>

            <p className={styles.testAlignLeft}>
              All the common order types. Limit, stop, take-profit, and
              stop-loss are all available.
            </p>
            <p className={styles.textBold}> Dynamic Funding</p>

            <p className={styles.testAlignLeft}>
              Longs pay shorts (and vice versa) based on open interest.
            </p>

            <p className={styles.textBold}> Trustless</p>
            <p className={styles.testAlignLeft}>
              {" "}
              Interact directly with on-chain smart contracts (no
              intermediaries).
            </p>

            <p className={styles.textBold}> How It Works</p>

            <ul className={styles.testAlignLeft}>
              <li>
                Buy to profit from rising prices and sell to profit from falling
                prices.
              </li>
              <li>
                Your profits are paid from the pool and your losses are paid to
                the pool.{" "}
              </li>
              <li>45% of trading fees go to the pool.</li>
              <li>45% go to the treasury which buys back the AQUA token.</li>
              <li>
                10% go to keepers which trigger order executions (anyone can be
                a keeper).
              </li>
              <li>
                Your account is liquidated when its margin level reaches 20%.{" "}
              </li>
            </ul>

            <p className={styles.textBold}>Get Involved</p>

            <p className={styles.testAlignLeft}>
              {" "}
              We believe everyone should be able to partake in the wealth
              creation made possible by the free markets. On AQUA, value is
              transparently distributed. You can choose to participate as a
              trader, liquidity provider, code contributor, token holder, or
              simple community member. We recognize and encourage involvement of
              all kinds.
            </p>

            <p>
              All prices are provided in real-time on-chain by Razor.Network.
            </p>
            <p className={styles.image_skl}>
              <Image
                src="/RAZOR_NAME.svg"
                alt="Skale  Network Logo"
                className={styles.imageInvert}
                width={33}
                height={50}
                priority
                style={{ width: "66px", height: "36px" }}
              />
            </p>

            <p className={styles.image_skl}>
              <Link href={`/perp/sklusdt`} className={styles.toggleButton}>
                {" "}
                Coming Soon{" "}
              </Link>
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
