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

import { AIRDROP_ABI } from "@/app/Abi/airdropErc20";
import styles from "@/app/Styles/LaunchPad.module.css";

import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

export interface Wallet {
  wallet?: `0x${string}`;
}

export interface Amount {
  amount?: string;
}

const LaunchPad: React.FC = () => {
  //test
  const [inputValue, setInputValue] = useState<string>("");

  // updates via function parseEthAmounts()
  const setAirdropped = useRef(true);
  const isCommaAtEndOfAmounts = useRef(false);

  // Token Approval amount and function
  // updates via function parseEthAmounts()
  const setTotalAmounts = useRef(BigInt(0));
  // todo decimals
  const tokenADecimal = useRef(BigInt(18));

  const totalWallets = useRef();
  const totalAmounts = useRef();
  // const tokenBDecimal = useRef(BigInt(18));

  // Token Address that user inputs
  const [token, setAirdropToken] = useState("");

  // enter symbol to get token address
  const [tokenSymbol, setTokenSymbol] = useState("");

  const [tokenName, setTokenName] = useState("");

  const [tokenDecimal, setTokenDecimal] = useState(18);

  const [tokenMax, setTokenMax] = useState(8000000000);

  // Original Input from user is in string format : will be parsed later
  const [tokenAddressList, setTokenAddresses] = useState<Wallet>();
  const [tokenAmount, setTokenAmount] = useState<Amount>();

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const contractAirdrop = findContractInfo("airdrop");

  const notify = () =>
    toast.success(
      `Token Created ${tokenSymbol} to ${totalWallets.current} wallets from 🌊 AquasTrade!`,
      {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      },
    );

  console.log(
    " Airdrop status: ",
    setAirdropped.current,
    " ready: ",
    isCommaAtEndOfAmounts.current,
  );

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
      // todo toast
      notify();
      // reset airdrop and fetch new balances
      setAirdropped.current = true;
    }
  }, [contractCallDataConfirmed]);

  // renders for ui
  // todo bug
  useEffect(() => {
    if (tokenAmount) {
      setAirdropped.current = false;

      const testT = tokenAmount as string;
      const testTT = testT.concat(",");

      console.log(
        " Token input amounts changed ",
        tokenAmount,
        " test with extra ,  : ",
        testTT,
      );

      const bug: string = tokenAmount as string;
      parseEthAmounts(bug);
    }

    if (tokenAddressList) {
      const bug: string = tokenAddressList as string;
      parseEthAddresses(bug);
    }

    // get the token address from using the symbol
    if (tokenSymbol) {
      const token_address = findTokenAddressFromSymbol(
        tokenSymbol,
      ) as unknown as `0x${string}`;
      console.log("Set the Address from Symbol ", token_address, tokenSymbol);
      setAirdropToken(token_address);
    }
  }, [tokenAmount, tokenSymbol, tokenAddressList]);

  const stringEndWithComma = (e: string) => {
    isCommaAtEndOfAmounts.current = true;
  };

  function isLastCharacterComma(input: string): boolean {
    // Check if the input string is not empty and the last character is a comma
    return input.trim() !== "" && input.trim().slice(-1) === ",";
  }

  // filter with regex
  const handleInputAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e;
    // Check if the input matches the allowed pattern
    if (/^[0-9.,]*$/.test(value)) {
      isCommaAtEndOfAmounts.current = isLastCharacterComma(value);

      // if true, show instructions

      setTokenAmount(value);
      setInputValue(value);

      console.log(
        "handleInputAmountChange: ",
        value,
        isCommaAtEndOfAmounts.current,
      );
    }
  };

  // runs the data again before submitting
  const doTokenLaunch = () => {
    setAirdropped.current = true;

    writeContract({
      abi: AIRDROP_ABI,
      address: contractAirdrop?.addr,
      functionName: "deployToken",
      args: [tokenName, tokenSymbol, BigInt(tokenDecimal), BigInt(tokenMax)],
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
            onChange={(e) => setTokenMax(e.target.value)}
            className={styles.input_token_address}
          />
          <span>
            <button className={styles.airdrop} onClick={doTokenLaunch}>
              Deploy Token
            </button>
          </span>
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
