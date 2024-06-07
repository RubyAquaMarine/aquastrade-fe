"use client";
import React, { useEffect } from "react";
//import { LoginButton } from "@telegram-auth/react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { FaSpinner } from "react-icons/fa6";
import styles from "@/app/Styles/ConnectWallet.module.css";
import { CHAIN } from "@/app/Utils/config";

// test new sfuel
import privatekeySendsFuel from "@/app/Utils/playSfuel";

const ConnectWallet = () => {
  // wagmi
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chain, isConnecting } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  // for some reason there are now duplicates within the connectors , it will show two metamask icons
  const filteredConnectors = new Set();
  const uniqueList = connectors.filter((element) => {
    const isDuplicate = filteredConnectors.has(element.id);
    filteredConnectors.add(element.id);
    return !isDuplicate;
  });

  // sfuel
  const getDataCallBack = () => {
    console.log("getDataCallBack : address ? ", address);
    const fetchData = async () => {
      try {
        if (address) {
          const hashFromSfuel = await privatekeySendsFuel(address);
          console.log("sent sfuel ", hashFromSfuel);
        }
      } catch {
        console.log("unable to send sfuel ");
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (address) {
      getDataCallBack();
    }
  }, [address]);

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
                className={styles.button_login}
                onClick={(event) => handleToEuropa(event, 2046399126)}
              >
                Switch Network
              </button>
            ) : (
              <span>
                {!chain ? (
                  <button type="button" className={styles.button_login}>
                    <Link href="/dashboard">Switch Network</Link>
                  </button>
                ) : (
                  <button type="button" className={styles.button_login}>
                    <Link href="/swap/amm">Start Trading</Link>
                  </button>
                )}
              </span>
            )}
          </span>

          <span className={styles.margin_med}>
            {" "}
            <button
              type="button"
              className={styles.logout}
              onClick={() => disconnect()}
            >
              logout
            </button>{" "}
          </span>
        </div>
      ) : (
        <>
          {error && <div>Error: {error.message}</div>}

          {uniqueList.map((connector) => (
            <div key={connector.id}>
              <ul>
                <li className={styles.connectorButton}>
                  <button
                    className={styles.button_login}
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

/*
  <LoginButton
            botUsername={"AquasTradeBot" as string}
            authCallbackUrl="/swap/amm"
            buttonSize="medium" // "large" | "medium" | "small"
            cornerRadius={5} // 0 - 20
            showAvatar={true} // true | false
            lang="en"
          />
*/
