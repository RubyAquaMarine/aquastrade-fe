"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Dashboard.module.css";
import styledContainer from "@/app/Styles/Container.module.css";
import { CHAIN } from "@/app/Utils/config";

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
  // min-h-screen
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      {!addr || !isConnected ? (
        <div className={styledContainer.container}>
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
        <div className={styledContainer.container}>
          {/** Handle all unknown networks on the dashboard page */}

          {!chain ? (
            <span className={styles.text_style_border}>
              <ul>
                <li>
                  <span> Unsupported Network</span>
                </li>
                <li> Recommended Network is Europa SKALE Chain</li>

                <li className={styles.text_center}>
                  {" "}
                  <button
                    className={styles.toggle_network}
                    // @ts-ignore: Unreachable code error
                    onClick={() => switchChain({ chainId: CHAIN.id })}
                  >
                    {" "}
                    Switch Network
                  </button>
                </li>
              </ul>
            </span>
          ) : (
            <span>
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
                  <li className={styles.text_heading}>Native Gas</li>
                  <li className={styles.text_padding}>
                    {" "}
                    {!isError && walletFuel?.symbol} :{" "}
                    {!isError && walletFuel?.formatted}{" "}
                  </li>

                  <li className={styles.text_heading}>Connected Wallet</li>

                  <li className={styles.text_button}>
                    <Link href={`/user/${address}`}>
                      {address
                        ? `${address?.slice(0, 4)} ... ${address?.slice(38, 42)}`
                        : `no provider`}
                    </Link>
                  </li>
                </ul>
              </span>{" "}
            </span>
          )}
        </div>
      )}
    </main>
  );
};

export default Dashbaord;
