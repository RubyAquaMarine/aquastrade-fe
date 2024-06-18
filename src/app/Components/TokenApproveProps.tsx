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

// todo recode with , to use names within code. using ; isn't correct
interface Props {
  name: string;
  address: `0x${string}`; // 1
  approve: bigint;
  args: [any];
}

const TokenApproveProps = (params: Props) => {
  // spinner

  console.log(" Debug Token Approval Props amounts", params);

  const spinTimer = useRef(false);

  // the time they click the button until notify toast popup

  // about 10 seconds ; boring. how to make this better?

  // check the difference : if the allowance is already 5, and the approve is 5 , then

  // save the last approved amount
  const [allowance_amount, setAllowance] = useState(BigInt(0));
  //const [inputToken, setToken] = useState<bigint>();

  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [inputTrigger, setTrigger] = useState<boolean>(false); // todo : only triggers once and doesn't reset :

  const [inputToken, setToken] = useState(false); // todo : only triggers once and doesn't reset :

  // Get Allowance Amounts already approved for contract sender
  const { data: token_transfer_allowance } = useERC20Token(
    params.address,
    params.name,
    params.args,
  );

  // May 26
  useEffect(() => {
    if (params?.address) {
      const token = findTokenFromAddress(params.address);
      setToken(token);
    }
  }, [params?.address]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      setTrigger(true);
      spinTimer.current = false; // turn off the spinner
    }
  }, [contractCallDataConfirmed, hash]);

  useEffect(() => {
    if (token_transfer_allowance) {
      //< params.approve
      setAllowance(token_transfer_allowance);
      setTrigger(false);
    }
  }, [token_transfer_allowance]); //params.approve

  useEffect(() => {
    if (inputTrigger === true) {
      console.log("RENDER AFTER TX TEST ++++++++++");
      setAllowance(params.approve);
    }
    console.log("RENDER AFTER TX TEST ----------");
  }, [inputTrigger]);

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
    spinTimer.current = true;

    writeContract({
      abi: ERC20_ABI,
      address: params.address,
      functionName: "approve",
      args: [params.args[1], params.approve],
    });
  };

  console.log(
    "Token Approval Props",
    params,

    " Allowance: Already Approved Amount on this Contract: ",
    token_transfer_allowance,

    " TokenInfo Contract: ",
    inputToken,
  );

  return (
    <div className={styles.token_approve_container}>
      {inputTrigger === true && allowance_amount >= params.approve ? (
        <span>
          {" "}
          <span className={styles.token_approve_amount}>
            {parseFloat(
              formatUnits(
                allowance_amount,
                Number(inputToken ? inputToken?.decimals : 18),
              ),
            ).toFixed(8)}
          </span>{" "}
        </span>
      ) : (
        <span> </span>
      )}

      {typeof allowance_amount === "bigint" ? (
        <div>
          {inputTrigger === false &&
          allowance_amount >= params.approve &&
          typeof allowance_amount === "bigint" &&
          allowance_amount <
            BigInt(
              "115792089237316195423570985008687907853269984665640564039057",
            ) ? (
            <span className={styles.token_approve_amount}>
              {parseFloat(
                formatUnits(
                  allowance_amount,
                  Number(inputToken ? inputToken?.decimals : 18),
                ),
              ).toFixed(8)}
            </span>
          ) : (
            <span>
              {" "}
              {inputTrigger === false || allowance_amount < params.approve ? (
                <span>
                  <button
                    className={styles.token_approve}
                    onClick={handleApprove}
                  >
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
                      <span>
                        {" "}
                        Approve {" : "} {inputToken ? inputToken?.symbol : "LP"}
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TokenApproveProps;
