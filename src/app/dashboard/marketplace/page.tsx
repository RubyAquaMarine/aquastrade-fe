"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useAccount, useSwitchChain } from "wagmi";

import styles_button from "@/app/Styles/Toggle.module.css";
import styles from "@/app/Styles/Links.module.css";

import { MARKETPACE_ABI } from "@/app/Abi/europaMarketPlace";

import {
  MARKETPLACE_AQUADEX,
  CHAIN,
} from "@/app/Utils/config";

const Home = () => {
  const allowancesTest = useRef(BigInt(0));
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const array = [];

  array.push(address);
  array.push(MARKETPLACE_AQUADEX);

  const handleToEuropa = (
    // event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault(); // Prevent the link from forwarding
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId }); // todo
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h4 className={styles.topText}>
        Limited Collection - 0% Fee Marketplace - Utility driven{" "}
      </h4>
      <h1 className={styles.midText}>NFT Market Place</h1>
      <p>Say goodbye to tx gas fees and marketplace fees</p>
      <p>
        <b>MarketPlace launches after all NFT sales</b>
      </p>
      <p>
        <Link href="/nft">
          <button className={styles_button.toggleButton}>Buy NFT </button>
        </Link>
      </p>

      {chain && chain.id !== CHAIN.id ? (
        <div>
          <p>Please select ChainID: 2046399126</p>
          <button
            onClick={(event) => handleToEuropa(event, 2046399126)}
            className={styles_button.toggleButton}
          >
            Switch Network
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};
export default Home;
