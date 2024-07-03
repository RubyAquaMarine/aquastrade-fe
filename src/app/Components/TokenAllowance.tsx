// @ts-nocheck
"use client";

import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSpinner } from "react-icons/fa6";

import { useERC20Token } from "@/app/Hooks/useAMM";
import { ERC20_ABI } from "@/app/Abi/erc20";

import styles from "@/app/Styles/TokenApprove.module.css";
import { findTokenFromAddress } from "@/app/Utils/findTokens";
import { bigint } from "zod";

export type TokenAllowanceProps = {
  name: string;
  address: `0x${string}`;
  approve: bigint; // won't be used
  args: [any];
};

export const TokenAllowance = (params: TokenAllowanceProps) => {
  const [allowance_amount, setAllowance] = useState<bigint>();

  const {
    data: token_transfer_allowance,
    isLoading,
    isError,
  } = useERC20Token(params.address, params.name, params.args);

  console.log(
    "DEBUG TOKEN Allowance  ----------",
    params.address,
    params.name,
    params.args,
    allowance_amount,
  );

  console.log(`
        ${params.address}
        ${params.name}
        ${params.args}
        Allowance 
    ${allowance_amount} 
        
        `);

  // Doesn't work with LP tokens
  const token = findTokenFromAddress(params.address);

  // When fetch is completed
  useEffect(() => {
    if (typeof token_transfer_allowance === "bigint") {
      setAllowance(token_transfer_allowance);
    }
  }, [token_transfer_allowance]);

  return (
    <div id="TokenAllowance" className={styles.token_approve_container}>
      {allowance_amount && formatUnits(allowance_amount, 18)}
    </div>
  );
};
