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
import { findContractInfo } from "@/app//Utils/findTokens";

import { MEME_CREATOR_ABI } from "@/app/Abi/memeCreator";
import styles from "@/app/Styles/LaunchPad.module.css";

export interface Wallet {
  wallet?: `0x${string}`;
}

export interface Amount {
  amount?: string;
}

const LaunchPad: React.FC = () => {

  const [tokenSymbol, setTokenSymbol] = useState<string>("");

  const [tokenName, setTokenName] = useState<string>("");

  const [tokenDecimal, setTokenDecimal] = useState<number>(18);

  const [tokenMax, setTokenMax] = useState<number>(1000000000);

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const contractMemeCreator = findContractInfo("memecreator");

  const notify = () =>
    toast.success(`Token Created ${tokenSymbol} on 🌊 AquasTrade!`, {
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
    console.log(
      " Deploy Token ",
      tokenName,
      tokenSymbol,
      tokenDecimal,
      tokenMax,
      contractMemeCreator?.address
    );

    // console.log(" Deploy Token with CA: ", contractMemeCreator?.address);
    // const amount = parseUnits(tokenMax.toString(), tokenDecimal)
    // console.log(" AMount : ", amount , typeof amount);
    // Input is HUMAN ETHER VALUE , and in the SC will be converted to BigInt ** 18 
    writeContract({
      abi: MEME_CREATOR_ABI,
      address: contractMemeCreator.address,
      functionName: "deployToken",
      args: [tokenName, tokenSymbol, tokenDecimal, tokenMax]
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
            <ul>
              <li>- Automatically bootstraps with AQUA liquidity </li>

              <li>- 100% of Token Supply goes into liquidity pool</li>

              <li>- 100% of LP Tokens are burned at pool creation </li>
            </ul>
          </div>
          <div className={styles.text_lg}>Enter Token Details</div>
          <input
            type="text"
            placeholder="Input Token Name"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className={styles.input_token_address}
          />
          <input
            type="text"
            placeholder="Input Token Symbol"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className={styles.input_token_address}
          />
          <input
            type="number"
            placeholder="Input Token Decimal"
            min={0}
            value={tokenDecimal}
            onChange={(e) => setTokenDecimal(Number(e.target.value))}
            className={styles.input_token_address}
          />
          <input
            type="number"
            value={tokenMax}
            min={100000}
            onChange={(e) => setTokenMax(Number(e.target.value))}
            className={styles.input_token_address}
          />
          {tokenSymbol && tokenMax && tokenDecimal && tokenName ? (
            <span>
              <button
                type="button"
                className={styles.airdrop}
                onClick={doTokenLaunch}
              >
                Deploy Token
              </button>
            </span>
          ) : (
            <span>
              <button type="button" className={styles.airdrop}>
                Input Values
              </button>
            </span>
          )}
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
