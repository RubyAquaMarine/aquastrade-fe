"use client";
import React, { useEffect } from "react";
import { LoginButton } from "@telegram-auth/react";
import Link from "next/link";
import Image from "next/image";
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
    <div>
      {isConnected ? (
        <div className={styles.connect_wallet_logout}>
          <span className={styles.telegram}>
            {" "}
            {chain && chain.id !== CHAIN.id ? (
              <span>
                <button
                  className={styles.button_trade}
                  onClick={(event) => handleToEuropa(event, 2046399126)}
                >
                  Switch Network
                </button>{" "}
              </span>
            ) : (
              <span className={styles.telegram}>
                {!chain ? (
                  <Link href="/dashboard">
                    <button type="button" className={styles.button_trade}>
                      Switch Network
                    </button>
                  </Link>
                ) : (
                  <Link href="/swap/amm">
                    <button type="button" className={styles.button_trade}>
                      Start Trading
                    </button>
                  </Link>
                )}
              </span>
            )}
          </span>

          <span className={styles.telegram}>
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
        <div className={styles.container}>
          <span className={styles.text_border}>
            {" "}
            <span className={styles.text_connect}> Connect Wallet</span>{" "}
          </span>

          <div className={styles.container_connector}>
            {!isConnected && status !== "idle" && (
              <div className={styles.text_flex}>{message}</div>
            )}

            {error && <div>Error: {error.message}</div>}
            <span className={styles.line}>
              {" "}
              <span className={styles.telegram}>
                {" "}
                <Link
                  className={styles.button_kyc}
                  href="https://t.me/AquasTradeBot"
                  target="_blank"
                >
                  <span className="image_invert">
                    {" "}
                    <Image
                      src="/telegram.svg"
                      alt="menu"
                      width={22}
                      height={22}
                      priority
                    />
                  </span>
                  <span> Trade via Telegram</span>
                </Link>
              </span>
              <span className={styles.telegram}>
                {uniqueList.map((connector) => (
                  <div key={connector.id}>
                    <ul className={styles.connectorButton}>
                      <li>
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
                ))}{" "}
              </span>
            </span>
          </div>
        </div>
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
