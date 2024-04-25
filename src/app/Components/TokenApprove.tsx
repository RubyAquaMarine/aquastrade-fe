// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
} from "wagmi";
import React, { useState, useRef, useEffect } from "react";
import { formatUnits } from "viem";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useERC20Token } from "@/app/Hooks/useAMM";
import { ERC20_ABI } from "@/app/Abi/erc20";

import styles from "@/app/Styles/TokenApprove.module.css";

interface Props {
  name?: string;
  _address: `0x${string}`;
  approve?: bigint;
  args: [any];
  decimals: number;
}

const TokenApprove = (params: Props) => {
  const { address, isConnected, chain } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // console.error(
  //   "Token Approval Props",
  //   params.props[0],
  //   params.props[1],
  //   params.props[2],
  // );

  const { data: token_balance } = useERC20Token(
    params.props[1],
    params.props[0],
    params.props[3],
  );

  // console.error(
  //   "Token Approval",
  //   params.props[0],
  //   params.props[1],
  //   params.props[2],

  //   params.props[3],
  //   params.props[4],

  //   token_balance,

  //   " Approve This Contract: ",
  //   params.props[3][1],
  // );

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        Token Approved Tx Hash on 🌊 AquasTrade
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

  const handleApprove = () => {
    // Implement swapping logic here

    writeContract({
      abi: ERC20_ABI,
      address: params.props[1],
      functionName: "approve",
      args: [params.props[3][1], params.props[2]],
    });
  };

  return (
    <div className={styles.token_approve_container}>
      {address && typeof token_balance === "bigint" ? (
        <div>
          {token_balance >= params.props[2] &&
          token_balance <
            BigInt(
              "115792089237316195423570985008687907853269984665640564039057",
            ) &&
          typeof token_balance === "bigint" ? (
            <button className={styles.token_approve_amount}>
              {formatUnits(token_balance, Number(params.props[4]))}
            </button>
          ) : (
            <button className={styles.token_approve} onClick={handleApprove}>
              Approve
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TokenApprove;

// token_approve_container
// token_approve_amount
// token_approve
