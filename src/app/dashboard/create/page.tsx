"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAccount, useSwitchChain } from "wagmi";
import { CHAIN } from "@/app/Utils/config";
import styles from "@/app/Styles/Airdrop.module.css";
import styles_container from "@/app/Styles/Home.module.css";
import SpinImage from "@/app/Components/SpinImage";
import NFTHolderLaunchPad from "@/app/Components/NFTHoldersLaunchPad";
import NFTHolder from "@/app/Components/NFTHolder";
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
    <main className={styles_container.container}>
      <h1 className={styles.text_title}>Token Launch Pad </h1>
      <span className={styles.text_border_bottom}>
        {" "}
        on SKALE | Europa Liquidity Hub
      </span>
      <SpinImage imageUrl="/EUROPA.png" />

      <Link href="/dashboard/nft">
        <span className={styles.button_container}>
          <span className={styles.button_kyc}>
            <span className={styles.icon_info}>
              <Image
                src="/info.svg"
                alt="info"
                width={18}
                height={18}
                priority
              />
            </span>

            <span>
              {" "}
              <NFTHolder />
            </span>
          </span>{" "}
        </span>
      </Link>

      {!address || !isConnected || (chain && chain.id !== CHAIN.id) ? (
        <div className={styles.connected}>
          <div className="button_back">
            <Link href="/">
              {" "}
              <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
              features)
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.connected}>
          <div ref={isNFTHolder}>{<NFTHolderLaunchPad />} </div>
          <span className={styles.connected}>
            {" "}
            <p>
              <span className={styles.text_center}> Connected to:</span>{" "}
            </p>
            <p>
              {" "}
              <span className={styles.text_title_sm}>{chain?.name}</span>
            </p>{" "}
          </span>
        </div>
      )}
    </main>
  );
};

export default Home;
