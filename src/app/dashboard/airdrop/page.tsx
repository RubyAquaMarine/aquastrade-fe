"use client";
import React from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import { CHAIN } from "@/app/Utils/config";
import AirDrop from "@/app/Components/AirDrop";
import styles from "@/app/Styles/Airdrop.module.css";
import SpinImage from "@/app/Components/SpinImage";
const Home = ({ children, params }: any) => {
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const handleToEuropa = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    console.log("Handle Network Switch");
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault();
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId });
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.text_title}>Airdrop Tokens </h1>
      <span className={styles.text_border_bottom}>
        {" "}
        on SKALE | Europa Liquidity Hub
      </span>
      <SpinImage imageUrl="/EUROPA.png" />

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
        <div>
          <AirDrop></AirDrop>
          <p>
            <span className={styles.text_center}> Connected to:</span>{" "}
          </p>
          <span className={styles.text_border}>{chain?.name} </span>
        </div>
      )}
    </main>
  );
};

export default Home;
