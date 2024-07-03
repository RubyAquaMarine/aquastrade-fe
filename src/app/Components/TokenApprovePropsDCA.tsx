// @ts-nocheck
"use client";

import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits, parseUnits } from "viem";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSpinner } from "react-icons/fa6";

import { useERC20Token } from "@/app/Hooks/useAMM";
import { ERC20_ABI } from "@/app/Abi/erc20";

import styles from "@/app/Styles/TokenApprove.module.css";
import { findTokenFromAddress } from "@/app/Utils/findTokens";
import { bigint } from "zod";
/*
DCA Token Approval 
 amount is in string then converted to bigint using the token/decimals
*/
type Props = {
  name: string;
  address: `0x${string}`; // 1
  approve: string;
  args: [any];
};

const TokenApproveProps = (params: Props) => {
  const token = findTokenFromAddress(params.address);

  const amount = parseUnits(params.approve, token?.decimals);

  const toastMessage = useRef();
  const [spinTimer, setSpinTimer] = useState<boolean>(false);
  const [allowance_amount, setAllowance] = useState<bigint>();

  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get Allowance Amounts already approved for contract sender

  /*
   Token Allowance input is two strings...... 
  */
  const newArgs = [params.args[0], params.args[1]];
  const newArgsApprove = [params.args[1], amount];
  const {
    data: token_transfer_allowance,
    isLoading,
    isError,
  } = useERC20Token(params.address, params.name, newArgs);

  // When fetch is completed
  useEffect(() => {
    if (
      typeof token_transfer_allowance === "bigint" &&
      !isLoading &&
      !isError
    ) {
      setAllowance(token_transfer_allowance);
    }
  }, [token_transfer_allowance]);

  // On Approval or revoke
  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      setSpinTimer(false);
      if (toastMessage.current === "Approved") {
        setAllowance(amount); // force render
        toastMessage.current = "";
      }

      if (toastMessage.current === "Revoked") {
        setAllowance(BigInt(0)); // force render
        toastMessage.current = "";
      }
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        Token {toastMessage.current} Tx Hash on 🌊 AquasTrade
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
    toastMessage.current = "Approved";
    // spinTimer.current = true;
    setSpinTimer(true);
    writeContract({
      abi: ERC20_ABI,
      address: params.address,
      functionName: "approve",
      args: newArgsApprove,
    });
  };

  const handleRevoke = () => {
    toastMessage.current = "Revoked";
    // spinTimer.current = true;
    setSpinTimer(true);
    writeContract({
      abi: ERC20_ABI,
      address: params.address,
      functionName: "approve",
      args: [params.args[1], BigInt(0)],
    });
  };

  // console.log(
  //   "DEBUG TOKEN APPROVAL vs APPROVED(0,0):  ----------",
  //   params.approve,
  //   allowance_amount,
  //   token_transfer_allowance,
  //   isLoading,
  //   isError
  // );
  return (
    <div className={styles.token_approve_container}>
      {!isLoading && !isError ? (
        <span>
          {" "}
          {amount && allowance_amount >= amount ? (
            <span>
              <button className={styles.token_revoke} onClick={handleRevoke}>
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
                    {parseFloat(
                      formatUnits(
                        allowance_amount,
                        Number(token !== false ? token?.decimals : 18), // defaults to 18 if its not found == LP token
                      ),
                    ).toFixed(
                      token && token?.decimals > 8 ? 8 : token?.decimals,
                    )}
                  </span>{" "}
                </span>
              </button>
            </span>
          ) : (
            <span>
              {" "}
              {amount && allowance_amount < amount ? (
                <span>
                  <button
                    className={styles.token_approve}
                    onClick={handleApprove}
                  >
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
        </span>
      ) : (
        <span> </span>
      )}
    </div>
  );
};

export default memo(TokenApproveProps);
