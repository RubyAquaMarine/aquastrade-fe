// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { formatUnits } from "viem";

import { useERC20Token } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/TokenBalance.module.css";

interface Props {
  tokenAddress: string;
  decimals: number;
  checkAddress: string;
}

const TokenBalance = (params: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [amount, setBalance] = useState(BigInt(0));

  const { data: token_balance, isLoading } = useERC20Token(
    params.props?.[0],
    "balanceOf",
    [params.props?.[2]],
  );

  console.log(
    "REMOVE ME: TokenBalance",
    token_balance,
    params.props?.[0],
    " ALL data: ",
    params,
  );

  useEffect(() => {
    if (token_balance) {
      setBalance(token_balance);
    }
  }, [token_balance]);

  return (
    <div id="token_balance" ref={divRef}>
      <span>
        {!amount || isLoading ? (
          <span className={styles.container_token_balance}> 0.0</span>
        ) : (
          typeof amount === "bigint" && (
            <span className={styles.container_token_balance}>
              {parseFloat(
                formatUnits(amount, Number(params.props?.[1])),
              ).toFixed(8)}
            </span>
          )
        )}
      </span>
    </div>
  );
};

export default memo(TokenBalance);
