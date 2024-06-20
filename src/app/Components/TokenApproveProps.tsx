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

interface Props {
  name: string;
  address: `0x${string}`; // 1
  approve: bigint;
  args: [any];
}

const TokenApproveProps = (params: Props) => {
  const [spinTimer, setSpinTimer] = useState<boolean>(false);
  // Doesn't work with LP tokens
  const token = findTokenFromAddress(params.address);

  // RENDERED VALUE
  const [allowance_amount, setAllowance] = useState<bigint>(BigInt(0));

  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get Allowance Amounts already approved for contract sender
  const {
    data: token_transfer_allowance,
    isLoading,
    isError,
  } = useERC20Token(params.address, params.name, params.args);

  useEffect(() => {
    if (typeof token_transfer_allowance === "bigint") {
      setAllowance(token_transfer_allowance);
    }
  }, [token_transfer_allowance]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      setSpinTimer(false);
      setAllowance(BigInt(0)); // force render
      console.log(" TOKEN APPROVAL CONFIRMATION ");
    }
  }, [contractCallDataConfirmed, hash]);

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
    // spinTimer.current = true;
    setSpinTimer(true);
    writeContract({
      abi: ERC20_ABI,
      address: params.address,
      functionName: "approve",
      args: [params.args[1], params.approve],
    });
  };

  console.log(
    "DEBUG TOKEN APPROVAL vs APPROVED:  ----------",
    params.approve,
    token_transfer_allowance,
  );

  return (
    <div className={styles.token_approve_container}>
      {/** Show the approved amounts  */}
      {typeof allowance_amount === "bigint" &&
      allowance_amount >= params.approve ? (
        <span>
          {" "}
          <span className={styles.token_approve_amount}>
            {parseFloat(
              formatUnits(
                allowance_amount,
                Number(token !== false ? token?.decimals : 18), // defaults to 18 if its not found == LP token
              ),
            ).toFixed(8)}
          </span>{" "}
        </span>
      ) : (
        <span>
          {" "}
          {allowance_amount < params.approve ? (
            <span>
              <button className={styles.token_approve} onClick={handleApprove}>
                <span className={styles.add_spinner}>
                  {" "}
                  <span className={styles.spinner_padding}>
                    {" "}
                    {spinTimer ? (
                      <FaSpinner className={styles.spinner_icon} />
                    ) : (
                      ""
                    )}{" "}
                  </span>
                  <span>
                    {" "}
                    Approve {token !== false ? token?.symbol : " : LP"}
                  </span>
                </span>
              </button>
            </span>
          ) : (
            <span></span>
          )}{" "}
        </span>
      )}
    </div>
  );
};

export default memo(TokenApproveProps);
