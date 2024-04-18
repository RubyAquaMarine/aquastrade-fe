// @ts-nocheck
"use client";
import Link from "next/link";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import CoinFlip from "@/app/Components/CoinFlip";
import styles from "@/app/Styles/Links.module.css";
import { CHAIN, contractAddresses } from "@/app/Utils/config";
const Home = () => {
  const { address, isConnected, chain } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.midText}>Flip to Up your Stack</h1>
      <span>Powered by on-chain</span>{" "}
      <span className={styles.text_style_border}>
        {" "}
        <Link
          href="https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/0x8103E54865Bbe8D0D6f502688BB235e62AF08FC0/read-contract#address-tabs "
          target="_blank"
        >
          Random Number Generator
        </Link>{" "}
      </span>{" "}
      <span> providing fair odds in winning and losing!</span>
      {!address || (chain && chain.id !== CHAIN.id) ? (
        <div className={styles.p_styled}>
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
          <span className={styles.midText_sm}>AQUA </span>

          {isConnected && (
            <CoinFlip props={[contractAddresses[4].addr, "AQUA"]}></CoinFlip>
          )}
        </div>
      )}
      <span className={styles.midText_xs}>1. enter amount to bet</span>
      <span className={styles.midText_xs}>2. flip to test your odds</span>
    </main>
  );
};
export default Home;

// tsx-control-statements/components'
