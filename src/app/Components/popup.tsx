"use client";
import React from "react";

// importing doesnt work : Error: `useConfig` must be used within `WagmiConfig`.
import ConnectWallet from "./ConnectWallet";

import styles from "../Styles/Popup.module.css";

const Popup = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popup_container}>
      <div className={styles.popup_content}>
        <button className={styles.close_button} onClick={onClose}>
          Close
        </button>

        <p>v2: list all the wagmi wallet connections</p>

        <p>--------</p>

        <p>metamask</p>

        <p>injected</p>

        <p>coinbase wallet</p>
      </div>
    </div>
  );
};

export default Popup;
