// @ts-nocheck
"use client";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
} from "wagmi";
import React, { useState, useRef, useEffect } from "react";
import { formatUnits } from "viem";

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

  const { data: token_balance } = useERC20Token(
    params.props[1],
    params.props[0],
    params.props[3],
  );
  /*
  console.log(
    "Token Approval",
    params.props[0],
    params.props[1],
    params.props[2],

    params.props[3],
    params.props[4],

    token_balance,

    " Approve This Contract: ",
    params.props[3][1],
  );
  */

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
    }
  }, [contractCallDataConfirmed]);

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
              {formatUnits(token_balance, params.props[4])}
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
