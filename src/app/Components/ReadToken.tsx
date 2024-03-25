"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { EUROPA_ETH, MARKETPLACE_AQUADEX } from "@/app/Utils/config";
import { ERC20_ABI } from "@/app/Abi/erc20";

import styles from "@/app/Styles/Links.module.css";

export interface ReadProps {
  name?: string;
  approve?: bigint;
  args: [any];
}

function Erc20({ name, approve, args }: ReadProps) {
  const { address, isConnected, chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [approveAmount, setApproveAmount] = useState(BigInt(1));

  const smartConrtactValue = useReadContract({
    abi: ERC20_ABI,
    address: EUROPA_ETH,
    functionName: name as undefined,
    args: args[0],
  });

  console.error("SC ETH Allowance", smartConrtactValue?.data);

  const isApproved = useCallback(() => {
    let value;
    console.error("isApproved : ", approve, " || ", smartConrtactValue?.data);
    if (
      typeof smartConrtactValue?.data === "bigint" &&
      typeof approve === "bigint"
    ) {
      if (BigInt(approve) > BigInt(smartConrtactValue?.data)) {
        value = BigInt(approve) - BigInt(smartConrtactValue?.data);
        setApproveAmount(value);
      }
    }
    console.error("Approve amount : ", value);
  }, [approve, smartConrtactValue]);

  const ApproveAmount = useCallback(() => {
    console.error("Ready to write to contract ", approveAmount);

    writeContract({
      abi: ERC20_ABI,
      address: EUROPA_ETH,
      functionName: "approve",
      args: [MARKETPLACE_AQUADEX, approveAmount],
    });
  }, [approveAmount, writeContract]);

  useEffect(() => {
    isApproved();
  }, [smartConrtactValue, isApproved]);

  if (!isConnected) {
    return null; // Don't render anything on the server side
  }

  return (
    <div>
      {isConnected && approveAmount > BigInt(0) ? (
        <button className={styles.toggleButton} onClick={ApproveAmount}>
          Approve
        </button>
      ) : (
        <button className={styles.buttonDisplay}>Reload</button>
      )}
    </div>
  );
}

export default Erc20;
