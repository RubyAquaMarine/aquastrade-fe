"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Airdrop.module.css";
import SpinImage from "@/app/Components/SpinImage";
import NFTHolderPresale from "@/app/Components/NFTHoldersPresale";

const Home = ({ children, params }: any) => {
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const [nftHolder, setNFTHolder] = useState("");

  const isNFTHolder = useRef<HTMLDivElement>(null);
  const test = isNFTHolder.current?.children;

  useEffect(() => {
    if (isConnected && address && test) {
      setNFTHolder(isNFTHolder.current?.children[0]?.id);
    }
  }, [address, isConnected, test]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.text_title}>IDO Admin Panel</h1>
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
          <div ref={isNFTHolder}>{<NFTHolderPresale />} </div>
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
