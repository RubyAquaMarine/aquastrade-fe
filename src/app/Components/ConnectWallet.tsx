"use client";
import React from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { FaSpinner } from "react-icons/fa6";

import styles from "../Styles/Links.module.css";
import button_styles from "../Styles/Toggle.module.css";

const ConnectWallet = () => {
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const { address, isConnected } = useAccount();
  const { data, isError } = useBalance({
    address: address,
  });

  let message = "";
  if (status === "pending") {
    message = "Connecting to wallet...";
  } else if (status === "success") {
    message = "Connected to wallet!";
  } else if (status === "error") {
    message = "Error connecting to wallet. Please try again.";
  }

  return (
    <main>
      <div className={styles.connectButtons}>
        {isConnected ? (
          <div>
            Gas Balance: {!isError && data?.formatted}{" "}
            {!isError && data?.symbol}{" "}
          </div>
        ) : (
          <div>{message}</div>
        )}

        {isConnected ? (
          <div>
            <button
              className={button_styles.toggleButton}
              onClick={() => disconnect()}
            >
              logout
            </button>
          </div>
        ) : (
          <>
            {error && <div>Error: {error.message}</div>}
            {connectors.map((connector) => (
              <div key={connector.uid}>
                <ul>
                  <li className={styles.connectorButton}>
                    <button
                      className={styles.toggleButton}
                      onClick={() => {
                        connect({ connector });
                      }}
                    >
                      {<FaSpinner />}
                      {isConnected && address}
                      {connector.name}
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default ConnectWallet;
