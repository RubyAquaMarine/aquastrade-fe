"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Airdrop.module.css";
import SpinImage from "@/app/Components/SpinImage";
import NFTHolder from "@/app/Components/NFTHolders";

const Home = ({ children, params }: any) => {
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const [nftHolder, setNFTHolder] = useState("");

  const isNFTHolder = useRef<HTMLDivElement>(null);
  const test = isNFTHolder.current?.children;

  console.log("isNFTHolder Test ", test, nftHolder);

  if (test && test?.length >= 1) {
    console.log(
      "isNFTHolder  ",
      isNFTHolder,
      "child is ",
      isNFTHolder.current?.children[0]?.id,
    );
  }

  useEffect(() => {
    if (isConnected && address && test) {
      setNFTHolder(isNFTHolder.current?.children[0]?.id);
    }
  }, [address, isConnected, test]);

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
          <div ref={isNFTHolder}>{<NFTHolder />} </div>
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

/*

 {isNFTHolder && isNFTHolder.current?.children[0]?.id === "PASS" ? (
            <div id="airdrop"></div>
          ) : (
            <div id="FAIL" className={styles.input_container}>
              <Link href="/nft">
                {" "}
                <b>Back </b>(Buy any NFT to unlock features)
              </Link>
            </div>
          )}

      */
