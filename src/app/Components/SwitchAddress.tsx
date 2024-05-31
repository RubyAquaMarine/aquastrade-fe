// @ts-nocheck
"use client";
import Image from "next/image";
import { formatUnits } from "viem";
import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain, useSwitchAccount } from "wagmi";
import styles from "@/app/Styles/Metaport.module.css";

export type SwitchAddressProps = {
  address: `0x${string}`;
};

// https://stackoverflow.com/questions/74390488/how-to-prompt-user-to-switch-metamask-wallet-address-in-a-web3-app
// Moving on. maybe not possible
const SwitchAddress = (params: SwitchAddressProps) => {
  const {
    address,
    isConnected,
    chain,
    addresses,
    isConnecting,
    isDisconnected,
  } = useAccount();

  const { connectors, switchAccount } = useSwitchAccount();

  // const { chains, switchChain } = useSwitchChain();

  // const [assetArray, setAsset] = useState<any>(null);

  const [chainName, setChainName] = useState<any>(null);

  const connectTo = (_args: any) => {
    console.log(" switch account requires a connector ", _args);
    switchAccount(_args);
  };

  // useEffect(() => {
  //     if (chain && chain.id) {
  //         setChainName(chain.id)
  //     }
  // }, [chain?.id]);

  console.log(" WALLET", address, params?.address, addresses);

  return (
    <div>
      <span> Wallets </span>
      {isConnected && address && addresses?.length >= 1 ? (
        addresses.map((wallet_address, index) => (
          <button
            key={index}
            className="mb-4 mt-8 p-2"
            onClick={(e) => {
              connectTo(wallet_address);
            }}
          >
            {" "}
            {wallet_address}{" "}
          </button>
        ))
      ) : (
        <div> Didn't load</div>
      )}

      <span> Connectors </span>
      {isConnected && address && connectors?.length >= 1 ? (
        connectors.map((connector) => (
          <button
            className="mb-4 mt-8 p-2"
            key={connector.id}
            onClick={(e) => {
              connectTo(connector);
            }}
          >
            Connect to: {connector.id}{" "}
          </button>
        ))
      ) : (
        <div> Didn't load</div>
      )}
    </div>
  );
};

export default memo(SwitchAddress);
