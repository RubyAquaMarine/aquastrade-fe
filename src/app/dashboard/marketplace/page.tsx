"use client";

import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/NFT.module.css";
import { MARKETPLACE_AQUADEX, CHAIN } from "@/app/Utils/config";

const Home = () => {
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const array = [];

  if (address && isConnected) {
    array.push(address);
    array.push(MARKETPLACE_AQUADEX);
  }

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
      <h4 className={styles.topText}>List Any ERC721 - 0% Marketplace Fee</h4>
      <h1 className={styles.midText}>NFT Market Place</h1>
      <p>
        <b>MarketPlace launches after all NFT sales</b>
      </p>
      <p>
        <Link href="/nft">
          <button className={styles.toggleButton}>Buy NFT </button>
        </Link>
      </p>
    </main>
  );
};
export default Home;

/*
 <h4 className={styles.topText}>
        Limited Collection - 0% Fee Marketplace - Utility driven{" "}
      </h4>
      <h1 className={styles.midText}>NFT Market Place</h1>
      <p>
        <Link href="/nft">
          <button className={styles.toggleButton}>Buy NFT </button>
        </Link>
      </p>
      <p>
        <b>MarketPlace launches after all NFT sales</b>
      </p>
*/
