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

  /* Show connector buttons to the user if the user is not connected 
    if connected: show the wallet address , and native balance(ETH,BNB,ETC) 
    todo: if user is connected to Skale : sFuel balance 
    */
  return (
    <main>
      <div className={styles.connectButtons}>
        {!isConnected ? (
          <div> </div>
        ) : (
          <div>
            Gas Balance: {!isError && data?.formatted}{" "}
            {!isError && data?.symbol}{" "}
          </div>
        )}

        {!isConnected ? (
          connectors.map((connector) => (
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
                    {address}
                    {connector.name}
                  </button>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <div>
            <button
              className={button_styles.toggleButton}
              onClick={() => disconnect()}
            >
              logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ConnectWallet;
