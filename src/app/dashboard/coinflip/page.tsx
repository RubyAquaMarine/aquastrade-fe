// @ts-nocheck
"use client";
import Link from "next/link";
import { useAccount } from "wagmi";
import CoinFlip from "@/app/Components/CoinFlip";
import styles from "@/app/Styles/Coinflip.module.css";
import { CHAIN } from "@/app/Utils/config";
import { findContractInfo } from "@/app/Utils/findTokens";

const aqua_coinflip_address = findContractInfo("coinflip-aqua")?.address;

const Home = () => {
  const { address, isConnected, chain } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.midText}>Flip to Up your Stack</h1>
      <span>Powered by on-chain</span>{" "}
      <span className={styles.action_link}>
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
        <div className={styles.toggle_button}>
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
            <CoinFlip props={[aqua_coinflip_address, "AQUA"]}></CoinFlip>
          )}
        </div>
      )}
      <span className={styles.midText_xs}>1. Enter Amount to place bet</span>
      <span className={styles.midText_xs}>
        2. Press {'"'}flip{'"'} and complete tx in wallet
      </span>
      <span className={styles.midText_xs}>3. Withdraw rewards at any time</span>
    </main>
  );
};
export default Home;

// tsx-control-statements/components'
