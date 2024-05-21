// @ts-nocheck
"use client";

import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import React, { useState, useEffect, memo } from "react";
import { formatUnits } from "viem";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useERC20Token } from "@/app/Hooks/useAMM";
import { ERC20_ABI } from "@/app/Abi/erc20";

import styles from "@/app/Styles/TokenApprove.module.css";
import { findTokenFromAddress } from "@/app/Utils/findTokens";

// todo recode with , to use names within code. using ; isn't correct
interface Props {
  name?: string;
  _address: `0x${string}`;
  approve?: bigint;
  args: [any];
}

const TokenApprove = (params: Props) => {
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [allowance_amount, setAllowance] = useState(BigInt(0));
  const [inputTrigger, setTrigger] = useState(false); // todo : only triggers once and doesn't reset :

  const [inputToken, setToken] = useState(false); // todo : only triggers once and doesn't reset :

  const { data: token_transfer_allowance } = useERC20Token(
    params.props[1],
    params.props[0],
    params.props[3],
  );

  useEffect(() => {
    if (params?.props[1]) {
      const token = findTokenFromAddress(params?.props[1]);
      setToken(token);
    }
  }, [params?.props[1]]);

  console.log(
    "Token Approval Props",
    params.props[0],
    params.props[1],
    params.props[2],
    "Input Args",
    params.props[3],

    " Approve This Contract: ",
    token_transfer_allowance,

    " TokenInfo Contract: ",
    inputToken,
  );

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      setTrigger(true);
    }
  }, [contractCallDataConfirmed, hash]);

  useEffect(() => {
    if (token_transfer_allowance) {
      setAllowance(token_transfer_allowance);
    }
    if (inputTrigger) {
      console.log("Token Approval Completed", inputTrigger);
    }
  }, [inputTrigger, token_transfer_allowance]);

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
      {typeof allowance_amount === "bigint" ? (
        <div>
          {inputTrigger === true ||
          (allowance_amount >= params.props[2] &&
            allowance_amount <
              BigInt(
                "115792089237316195423570985008687907853269984665640564039057",
              ) &&
            typeof allowance_amount === "bigint") ? (
            <span className={styles.token_approve_amount}>
              {parseFloat(
                formatUnits(
                  inputTrigger === true ? params.props[2] : allowance_amount,
                  Number(inputToken ? inputToken?.decimals : 18),
                ),
              ).toFixed(8)}
            </span>
          ) : (
            <button className={styles.token_approve} onClick={handleApprove}>
              Approve {" : "} {inputToken ? inputToken?.symbol : "LP"}
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default memo(TokenApprove);
