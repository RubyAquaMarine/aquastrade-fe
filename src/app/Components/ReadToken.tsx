"use client";
// testing for fun
// todo not using

import React, { useEffect, useState, useCallback } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { EUROPA_ETH, MARKETPLACE_AQUADEX } from "@/app/Utils/config";
import { ERC20_ABI } from "@/app/Abi/erc20";

import styles from "@/app/Styles/Links.module.css";

interface Props {
  name?: string;
  _address: `0x${string}`;
  approve?: bigint;
  args: [any];
}

const Erc20Approve = (params: Props) => {
  const { address, isConnected, chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [approveAmount, setApproveAmount] = useState(BigInt(1));

  console.error(
    "APPROVE ",
    params.props[0],
    params?.args,
    params?._address,
    params?.name,
    params?.approve,
  );

  const smartConrtactValue = useReadContract({
    abi: ERC20_ABI,
    address: params?._address,
    functionName: params?.name as undefined,
    args: params?.args,
  });

  console.error("SC ETH Allowance", smartConrtactValue?.data);

  const isApproved = useCallback(() => {
    let value;
    console.error(
      "isApproved : ",
      params?.approve,
      " || ",
      smartConrtactValue?.data,
    );
    if (
      typeof smartConrtactValue?.data === "bigint" &&
      typeof params?.approve === "bigint"
    ) {
      if (BigInt(params?.approve) > BigInt(smartConrtactValue?.data)) {
        value = BigInt(params?.approve) - BigInt(smartConrtactValue?.data);
        setApproveAmount(value);
      }
    }
    console.error("Approve amount : ", value);
  }, [params?.approve, smartConrtactValue]);

  const ApproveAmount = useCallback(() => {
    console.error("Ready to write to contract ", approveAmount);

    writeContract({
      abi: ERC20_ABI,
      address: params?._address,
      functionName: "approve",
      args: [params?.args as unknown as `0x${string}`, approveAmount],
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
};

export default Erc20Approve;
