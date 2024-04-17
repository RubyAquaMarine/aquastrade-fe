"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
//import { cookies} from "next/headers";// todo dynamic rendering is server side only
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Links.module.css";

// if wallet is not connected
const wallet = "0x8609E3D519756a7B15a6240e501e641AF25a0c2F";

const Home = () => {
  // const cookieStore = cookies();
  //  const oldTheme = cookieStore.get("theme");

  const { chains, switchChain } = useSwitchChain();
  const { address, isConnected, chain } = useAccount();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.midText}>Welcome to Aquas.Trade </h1>

      <p>
        <span className={styles.text_center}> Connected to:</span>{" "}
      </p>
      <span className={styles.text_style_border}>{chain?.name} </span>
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

          <p className={styles.spaceTop}>Select chain to switch networks </p>

          <div>
            <ul>
              {chains.map((chain, index) => (
                <li key={index} className={styles.connectorButton}>
                  <button
                    className={styles.toggleButton}
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
