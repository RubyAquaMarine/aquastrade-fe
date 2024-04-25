"use client";
import React from "react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { FaSpinner } from "react-icons/fa6";

import styles from "@/app/Styles/ConnectWallet.module.css";
import { CHAIN } from "@/app/Utils/config";

const ConnectWallet = () => {
  // wagmi
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chain, isConnecting } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  console.error(" ConnectWallet Chain ID is: ", chain, chain?.id);

  let message = "";
  if (status === "pending") {
    message = "Connecting to wallet...";
  } else if (status === "success") {
    message = "Connected to wallet!";
  } else if (status === "error") {
    message = "Error connecting to wallet. Please try again.";
  }

  const handleToEuropa = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault();
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId });
      }
    }
  };

  return (
    <div className={styles.connectButtons}>
      {!isConnected && status !== "idle" && (
        <div className={styles.text_flex}>{message}</div>
      )}

      {/** Handle case where user is using an unknown EVM network */}
      {isConnected ? (
        <div className={styles.tradingViewText}>
          <span>
            {" "}
            {chain && chain.id !== CHAIN.id ? (
              <button
                className={styles.p_styled_button_med}
                onClick={(event) => handleToEuropa(event, 2046399126)}
              >
                Switch Network
              </button>
            ) : (
              <span>
                {!chain ? (
                  <button className={styles.p_styled_button_med}>
                    <Link href="/dashboard">Switch Network</Link>
                  </button>
                ) : (
                  <button className={styles.p_styled_button_med}>
                    <Link href="/swap/amm">Start Trading</Link>
                  </button>
                )}
              </span>
            )}
          </span>

          <span>
            {" "}
            <button className={styles.logout} onClick={() => disconnect()}>
              logout
            </button>{" "}
          </span>
        </div>
      ) : (
        <>
          {error && <div>Error: {error.message}</div>}
          {connectors.map((connector) => (
            <div key={connector.uid}>
              <ul>
                <li className={styles.connectorButton}>
                  <button
                    className={styles.p_styled_button_sm}
                    onClick={() => {
                      connect({ connector });
                    }}
                  >
                    <span className={styles.spinner_padding}>
                      {isConnecting ? (
                        <span>
                          {" "}
                          {<FaSpinner className={styles.spinner_icon} />}
                        </span>
                      ) : (
                        <span> </span>
                      )}
                    </span>
                    <span className={styles.spinner_padding}>
                      {" "}
                      {isConnected && address}
                      {connector.name}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
