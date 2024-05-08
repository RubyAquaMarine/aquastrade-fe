// @ts-nocheck
"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { CHAIN } from "@/app/Utils/config";
import {
  findContractInfo,
  findTokenFromAddress,
} from "@/app//Utils/findTokens";

import { MEME_CREATOR_ABI } from "@/app/Abi/memeCreator";
import styles from "@/app/Styles/LaunchPad.module.css";

import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

import { useERC20Token } from "@/app/Hooks/useAMM";

import { usePresale } from "@/app/Hooks/usePresale";

export interface Wallet {
  wallet?: `0x${string}`;
}

export interface Amount {
  amount?: string;
}

const LaunchPad: React.FC = () => {
  // ADMIN PANEL
  const [tokenSymbol, setTokenSymbol] = useState("AQUA");

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const contractMemeCreator = findContractInfo("presale");
  const aqua_addr = findTokenAddressFromSymbol(
    tokenSymbol ? tokenSymbol : "AQUA",
  );
  const loadTokenInfo = findTokenFromAddress(aqua_addr);

  const { data: tokenSupply } = useERC20Token(aqua_addr, "totalSupply", []); // $AQUA

  const { data: inputTokens, isLoading: isUSD } = usePresale("USD", [0]);

  const { data: presaleTokenAddress, isLoading: isDec } = usePresale(
    "currentTokenSale",
    [],
  );

  useEffect(() => {
    if (inputTokens) {
      console.log(" inputTokens: ", inputTokens);
    }
  }, [inputTokens]);

  const notify = () =>
    toast.success(`Token Created ${tokenSymbol} from 🌊 AquasTrade!`, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  useEffect(() => {
    if (contractCallDataConfirmed) {
      notify();
    }
  }, [contractCallDataConfirmed]);

  const doTokenLaunch = () => {
    console.log(" Deploy Token with CA: ", contractMemeCreator?.addr);

    writeContract({
      abi: MEME_CREATOR_ABI,
      address: contractMemeCreator?.addr,
      functionName: "deployToken",
      args: [],
    });
  };

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

  //   toast.error("Empty Room or Username field");

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          {" "}
          <div className={styles.container_flex}>
            {loadTokenInfo ? (
              <ul>
                <li>Token Name: {loadTokenInfo.name} </li>

                <li>Token Symbol:{loadTokenInfo.symbol} </li>

                <li>
                  Token Supply:{" "}
                  {tokenSupply ? formatUnits(tokenSupply, 18) : "0.0"}
                </li>
              </ul>
            ) : (
              <span></span>
            )}
          </div>
          <span>
            {" "}
            {!isUSD && inputTokens ? inputTokens.toString() : " no uSD"}
          </span>
          <span>
            {!isDec && presaleTokenAddress
              ? presaleTokenAddress
              : " no presale "}
          </span>
          {tokenSymbol ? (
            <span>
              <button className={styles.airdrop} onClick={doTokenLaunch}>
                Deploy Token
              </button>
            </span>
          ) : (
            <span>
              <button className={styles.airdrop} onClick={doTokenLaunch}>
                Input Values
              </button>
            </span>
          )}
          <div className={styles.text_lg}>Admin Panel</div>
          <input
            type="text"
            placeholder="Input Token Symbol"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className={styles.input_token_address}
          />
        </div>
      ) : (
        <div>
          <p>Please select ChainID: 2046399126</p>
          <button
            onClick={(event) => handleToEuropa(event, 2046399126)}
            className={styles.toggleButtonEuropa}
          >
            Switch Network
          </button>
        </div>
      )}

      <span>
        <ToastContainer />
      </span>
    </div>
  );
};

export default LaunchPad;
