// @ts-nocheck
"use client";
import { useAccount } from "wagmi";
import React, { useState, useRef } from "react";
import { formatUnits } from "viem";

import { useERC20Token } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/TokenBalance.module.css";

interface Props {
  tokenAddress: string;
  decimals: number;
  checkAddress: string;
}

const TokenBalance = (params: Props) => {
  const { data: token_balance, isLoading } = useERC20Token(
    params.props?.[0],
    "balanceOf",
    [params.props?.[2]],
  );

  console.error(
    "TokenBalance",
    token_balance,
    params.props?.[0],
    " ALL data: ",
    params,
  );

  return (
    <>
      <span>
        {!token_balance || isLoading ? (
          <span className={styles.container_token_balance}> 0.0</span>
        ) : (
          typeof token_balance === "bigint" && (
            <span className={styles.container_token_balance}>
              {formatUnits(token_balance, Number(params.props?.[1]))}{" "}
            </span>
          )
        )}
      </span>
    </>
  );
};

export default TokenBalance;
