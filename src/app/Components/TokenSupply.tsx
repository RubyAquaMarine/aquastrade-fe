// @ts-nocheck
"use client";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";
import { useERC20Token } from "@/app/Hooks/useAMM";

interface Props {
  tokenAddress: string;
  decimals: number;
  checkAddress: string;
}

const TokenSupply = (params: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [amount, setBalance] = useState(BigInt(0));

  const { data: token_balance, isLoading } = useERC20Token(
    params.props?.[0],
    "totalSupply",
    [],
  );

  useEffect(() => {
    if (token_balance) {
      setBalance(token_balance);
    }
  }, [token_balance]);

  return (
    <div id="token_supply" ref={divRef}>
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
    </div>
  );
};

export default memo(TokenSupply);
