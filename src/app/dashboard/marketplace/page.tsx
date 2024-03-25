"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { parseEther, parseUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useSwitchChain,
} from "wagmi";

import styles_button from "@/app/Styles/Toggle.module.css";
import styles from "@/app/Styles/Links.module.css";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";

import {
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
  CHAIN,
} from "@/app/Utils/config";
import { ERC20_ABI } from "@/app/Abi/erc20";

import Erc20 from "@/app/Components/ReadToken";

const Home = () => {
  const allowancesTest = useRef(BigInt(0));
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const array = [];

  array.push(address);
  array.push(MARKETPLACE_AQUADEX);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleToEuropa = (
    // event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault(); // Prevent the link from forwarding

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
      <p>MarketPlace launched after NFT sale</p>
      <p>
        <Link href="/nft">
          <b>Buy NFT </b>
        </Link>
      </p>
      {isClient ? (
        <div>
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
            <div>
              <p>Connected</p>
              <Erc20
                name={"allowance"}
                approve={BigInt("1500000000000000000")}
                args={[array]}
              ></Erc20>
            </div>
          )}
        </div>
      ) : (
        <div>Server</div>
      )}
    </main>
  );
};
export default Home;
