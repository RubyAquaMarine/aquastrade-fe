"use client";

import Link from "next/link";
import {
  useAccount,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";
import { CHAIN } from "@/app/Utils/config";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSpinner } from "react-icons/fa6";

import styles from "@/app/Styles/TokenApprove.module.css";

export interface Props {
  buttonText: string;
  name: string;
  address: `0x${string}`; // 1
  abi: any;
  args: any;
}
let spinCounter = 0;
export const ButtonSpinner = (params: Props) => {
  spinCounter++;

  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const isButton = useRef<HTMLDivElement>(null);

  const [inputButton, setButton] = useState("");

  const spinTimer = useRef(false);

  const { data: hash, isError, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    console.log("Button Renders  isButton", isButton);
    if (isButton.current) {
      setButton(isButton.current?.children[0]?.id);
    }
  }, [isButton]);

  useEffect(() => {
    console.log("Button Renders  hash", hash);

    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      spinTimer.current = false; // turn off the spinner
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        {params.name.toUpperCase()} Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );
  // `${_message} on 🌊 AquasTrade! [tx] Hash: ${_link}`
  const notify = (_link: string) =>
    toast.info(CustomToastWithLink(_link), {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  const handleOnClick = () => {
    spinTimer.current = true;

    console.log(" WRITE Function ", params);

    writeContract({
      abi: params.abi,
      address: params.address,
      functionName: params.name,
      args: params.args,
    });
  };

  const handleEuropa = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault();
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId });
      }
    } else {
      // chain doesn't exist : not a whitelisted wagmi config chain.id
      // therefore just prompt injected Wallet to switch networks.
      event.preventDefault();
      // @ts-ignore: Unreachable code error
      switchChain({ chainId: targetChainId });
    }
  };

  console.log("Button Renders ", spinCounter, " spinner", spinTimer.current);

  return (
    <div ref={isButton}>
      {address && isConnected && chain && chain.id === CHAIN.id ? (
        <button type="button" onClick={handleOnClick}>
          <span className={styles.add_spinner}>
            {" "}
            <span className={styles.spinner_padding}>
              {" "}
              {spinTimer && spinTimer.current === true ? (
                <FaSpinner className={styles.spinner_icon} />
              ) : (
                ""
              )}{" "}
            </span>
            <span> {params.buttonText} </span>
          </span>
        </button>
      ) : (
        <span>
          {" "}
          <button
            type="button"
            onClick={(event) => handleEuropa(event, 2046399126)}
          >
            Connect Wallet
          </button>
        </span>
      )}
    </div>
  );
};
