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
  const { address } = useAccount();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    setAddr(address as string);
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1 className={styles.midText}>Featuring </h1>

      {!addr ? (
        <div>
          <div className={styles.p_styled}>
            <ul>
              <li>
                <Link href="/">
                  {" "}
                  <b>Back </b>(use web3 login to unlock features)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.p_styled}>
            <ul>
              <li>
                {" "}
                <Link href={`/dashboard/coinflip`}>Coin Flip</Link>
              </li>
              <li>
                <Link href="/dashboard/games">Games</Link>
              </li>
              <li>
                {" "}
                <Link href={`/dashboard/marketplace`}>Market Place</Link>
              </li>
          
              <li>
                {" "}
                <Link href={`/user/${address}`}>Token List</Link>
              </li>

              <p>
                <b>Swap Tokens</b>
              </p>
              <li>
                {" "}
                <Link href={`/swap/amm`}>AquasTrade</Link>
              </li>
              <li>
                {" "}
                <Link href={`/swap/lifi`}>Lifi</Link>
              </li>

              <p>
                <b>Perps</b>
              </p>
              <li>
                {" "}
                <Link href={`/perp`}>AquasTrade</Link>
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
