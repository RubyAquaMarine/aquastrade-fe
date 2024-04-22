"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Dashboard.module.css";

//import TextSizeAdjuster from "@/app/Components/ViewPort"; // todo : ReferenceError: window is not defined

const Dashbaord = ({ children, params }: any) => {
  const { chains, switchChain } = useSwitchChain();
  const { address, isConnected, chain } = useAccount();
  const [addr, setAddr] = useState("");
  const { data: walletFuel, isError } = useBalance({
    address: address,
  });

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h4 className={styles.topText}>
        <span>Utility driven NFT Collection - </span>{" "}
        <span className={styles.top_text_link}>
          <Link href="/nft">Buy Now</Link>
        </span>
      </h4>

      <span className={styles.midText}> Welcome to Aquas.Trade</span>
      <span>0 gas fees, NFT-powered AMM DEX, NFT Market Place,</span>
      <span> and leveraged trading on the</span>
      <span>
        {" "}
        <Link
          href="https://skale.space"
          target="_blank"
          className={styles.top_text_link}
        >
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
              <li className={styles.text_button}>
                <Link href="/dashboard/metaport">Bridge</Link>
              </li>
              <li className={styles.text_button}>
                <Link href="/dashboard/games">Games</Link>
              </li>
              <li className={styles.text_button}>
                {" "}
                <Link href={`/dashboard/marketplace`}>Market Place</Link>
              </li>{" "}
              <li className={styles.text_button}>
                <Link href="/dashboard/airdrop">Token Airdrop</Link>
              </li>
              <li className={styles.text_button}>
                {" "}
                <Link href={`/user/${address}`}>Token List</Link>
              </li>
              <li className={styles.text_heading}>Trade</li>
              <li className={styles.text_button}>
                {" "}
                <Link href={`/swap/amm`}>Tokens</Link>
              </li>
              <li className={styles.text_button}>
                {" "}
                <Link href={`/perp`}>Perps</Link>
              </li>
              <li className={styles.text_heading}>Trade 3rd Party</li>
              <li className={styles.text_button}>
                {" "}
                <Link href={`/swap/lifi`}>Lifi</Link>
              </li>
            </ul>
          </div>

          <div>
            {!chain ? (
              <span className={styles.text_style_border}>
                Unsupported Network : Recommended Network is Europa Liquidity
                Hub
              </span>
            ) : (
              <span>
                <span className={styles.text_padding}> Connected to: </span>
                <span className={styles.p_styled}>
                  <ul>
                    <li className={styles.text_padding}>
                      <Link
                        href="https://elated-tan-skat.explorer.mainnet.skalenodes.com"
                        target="_blank"
                      >
                        {chain?.name}{" "}
                      </Link>
                    </li>

                    <li className={styles.text_padding}>
                      {" "}
                      {!isError && walletFuel?.symbol} :{" "}
                      {!isError && walletFuel?.formatted}{" "}
                    </li>
                    <li className={styles.text_padding_sm}>
                      {address && address}
                    </li>
                  </ul>
                </span>{" "}
              </span>
            )}
          </div>

          <span className={styles.text_padding}>
            {" "}
            Select chain to switch networks{" "}
          </span>

          <div>
            <ul>
              {chains.map((chain, index) => (
                <li key={index} className={styles.text_padding}>
                  <button
                    className={styles.toggle_network}
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

export default Dashbaord;
