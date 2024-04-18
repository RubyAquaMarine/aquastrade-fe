"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Dashboard.module.css";

const Home = () => {
  const { chains, switchChain } = useSwitchChain();
  const { address, isConnected, chain } = useAccount();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.midText}>Welcome to Aquas.Trade </h1>
      <span>0 gas fees, NFT-powered AMM DEX, NFT Market Place,</span>
      <span> and leveraged trading on the</span>
      <span>
        {" "}
        <Link href="https://skale.space" target="_blank">
          {" "}
          <b>SKALE</b> Network
        </Link>
      </span>
      {!addr || !isConnected ? (
        <div>
          <div className={styles.p_styled_button}>
            <ul>
              <li>
                <Link href="/">
                  {" "}
                  <b>Back</b> (use web3 login to unlock features)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.p_styled}>
            <ul>
              <li className={styles.text_heading}>Features</li>
              <li>
                <Link href="/dashboard/metaport">Bridge</Link>
              </li>
              <li>
                <Link href="/dashboard/games">Games</Link>
              </li>
              <li>
                {" "}
                <Link href={`/dashboard/marketplace`}>Market Place</Link>
              </li>{" "}
              <li>
                <Link href="/dashboard/airdrop">Token Airdrop</Link>
              </li>
              <li>
                {" "}
                <Link href={`/user/${address}`}>Token List</Link>
              </li>
              <li className={styles.text_heading}>Trade</li>
              <li>
                {" "}
                <Link href={`/swap/amm`}>Tokens</Link>
              </li>
              <li>
                {" "}
                <Link href={`/perp`}>Perps</Link>
              </li>
              <li className={styles.text_heading}>Trade 3rd Party</li>
              <li>
                {" "}
                <Link href={`/swap/lifi`}>Lifi</Link>
              </li>
            </ul>
          </div>

          <p>
            {!chain ? (
              <span className={styles.text_style_border}>
                Unsupported Network : Recommended Network is Europa Liquidity
                Hub
              </span>
            ) : (
              <span>
                <span className={styles.text_center}> Connected to:</span>{" "}
                <span className={styles.text_style_border}>{chain?.name} </span>
              </span>
            )}
          </p>

          <p className={styles.space_border}>
            Select chain to switch networks{" "}
          </p>

          <div>
            <ul>
              {chains.map((chain, index) => (
                <li key={index} className={styles.connectorButton}>
                  <button
                    className={styles.toggleButton_bk}
                    // @ts-ignore: Unreachable code error
                    onClick={() => switchChain({ chainId: chain.id })}
                  >
                    {chain.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
