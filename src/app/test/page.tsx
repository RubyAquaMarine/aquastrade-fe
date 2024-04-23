// @ts-nocheck
"use client";

import { useAccount, useSwitchChain } from "wagmi";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/Styles/Links.module.css";

type Repository = {
  balance: string;
  symbol: string;
  name: string;
  decimals: string;
};

//  {params} : {params: {id : string}} aka user wallet address
const TokenList = ({ params }: any) => {
  const { chains, switchChain } = useSwitchChain();
  const {
    connector: activeConnector,
    addresses,
    chain,
    address,
    isConnected,
    isConnecting,
    isDisconnected,
  } = useAccount();
  const [savedAddress, setAddress] = useState<any>(null);

  useEffect(() => {
    if (address) {
      setAddress(address);
    }

    if (addresses?.length >= 1) {
      addresses.forEach((address) => {
        console.log("List of wallet addresses connected ", address);
      });
    }
  }, [address, addresses]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {isConnecting && <span> Connecting</span>}

        {isConnected && <span> Connected | Address: {savedAddress}</span>}

        {isDisconnected && <span> Connect Wallet</span>}

        <h2> Connected Wallets</h2>

        {addresses &&
          addresses.map((_token, index) => (
            <div className={styles.token_list_symbol} key={index}>
              {_token}
            </div>
          ))}
      </div>
    </main>
  );
};

export default TokenList;
