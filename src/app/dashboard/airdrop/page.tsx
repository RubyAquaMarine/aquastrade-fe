"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { CHAIN, tokenAddresses } from "@/app/Utils/config";
import AirDrop from "@/app/Components/AirDrop";
import styles from "@/app/Styles/Links.module.css";

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
      <h1 className={styles.midText}>Airdrop Tokens </h1>
      <span> on EuropaHub</span>
      <Image
        src="/EUROPA.png"
        alt="menu"
        width={70}
        height={70}
        priority
        className={styles.image_center}
      />

      {address && chain && chain.id !== CHAIN.id ? (
        <div>
          <p>Please select ChainID: 2046399126</p>
          <button
            onClick={(event) => handleToEuropa(event, 2046399126)}
            className={styles.toggleButton}
          >
            Switch Network
          </button>
        </div>
      ) : (
        <AirDrop></AirDrop>
      )}

      <p>
        <span className={styles.text_center}> Connected to:</span>{" "}
      </p>
      <span className={styles.text_style_border}>{chain?.name} </span>
    </main>
  );
};

export default Home;
