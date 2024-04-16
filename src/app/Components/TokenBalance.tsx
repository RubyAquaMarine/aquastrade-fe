// @ts-nocheck
"use client";
import { useAccount } from "wagmi";
import React, { useState, useRef } from "react";
import { formatUnits } from "viem";

import { useERC20Token } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";

interface Props {
  tokenAddress: string;
  decimals: number;
  checkAddress: string;
}

const TokenBalance = (params: Props) => {
  const { data: token_balance } = useERC20Token(
    params.props?.[0],
    "balanceOf",
    [params.props?.[2]],
  );

  return (
    <>
      <span>
        {!token_balance ? (
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

/*
 <div className={styles.container_token_balance}>
        {address && isConnected ? (
          <div className={styles.amount_balance_small}>
          
              {!token_balance
                ? "0.0"
                : typeof token_balance === "bigint" &&
                  formatUnits(token_balance, Number(params.props?.[1]))}
           
          </div>
        ) : (
          <div></div>
        )}
      </div>

*/
