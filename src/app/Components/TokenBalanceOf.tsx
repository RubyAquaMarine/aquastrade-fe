// @ts-nocheck
"use client";
import React, { useState, useEffect, memo } from "react";
import { formatUnits } from "viem";

import { useERC20Token } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/TokenBalance.module.css";

interface Props {
  tokenAddress: string;
  decimals: number;
  checkAddress: string;
}

const TokenBalanceOf = (params: Props) => {
  const [amount, setBalance] = useState(BigInt(0));

  const { data: token_balance, isLoading } = useERC20Token(
    params.props?.[0],
    "balanceOf",
    [params.props?.[2]],
  );

  useEffect(() => {
    if (token_balance) {
      setBalance(token_balance);
    }
  }, [token_balance]);

  console.log("Render TokenBalanceOf", params);

  return (
    <>
      <span>
        {!amount || isLoading ? (
          <span> 0.0</span>
        ) : (
          typeof amount === "bigint" && (
            <span>
              {parseFloat(
                formatUnits(amount, Number(params.props?.[1])),
              ).toFixed(8)}
            </span>
          )
        )}
      </span>
    </>
  );
};

export default memo(TokenBalanceOf);
