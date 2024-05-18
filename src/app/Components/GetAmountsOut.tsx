// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAMMRouter } from "@/app/Hooks/useAMM";
import styles from "@/app/Styles/AMM.module.css";
import { findTokenFromAddress, findContractInfo } from "@/app/Utils/findTokens";
const ROUTER_AQUADEX = findContractInfo("router")?.address;

interface Props {
  amountA: string;
  swapPath: string;
  fee: bigint;
  decimalsA: number;
  decimalsB: number;
}

// bug on decimals because on a multi hop the params does not contain the 3 asset
// asset a and asset b in single hop is fine
// btc + aqua + usdc (8,6) are passed in, but aqua is (18)

const GetAmountsOut = (params: Props) => {
  const [amount_out, setAmountOut] = useState([]);
  /*
  console.log(
    "GetAmountsOut: amount : decimal ",
    params.props[0],
    params.props[3],
  );
  */

  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "getAmountsOut", [
    parseUnits(params.props[0], Number(params.props[3])), // amount + decimals for tokenA
    params.props[1], // path
    params.props[2], // fee
  ]);

  useEffect(() => {
    if (swap_out) {
      setAmountOut(swap_out);
    }
  }, [swap_out]);

  return (
    <div>
      {amount_out.length === 0 ? (
        <input
          className={styles.input_amount}
          type="text"
          placeholder="Select Token"
          value={"0.0"}
        />
      ) : (
        typeof amount_out === "object" && (
          <input
            className={styles.input_amount}
            type="text"
            placeholder="Select Token"
            value={
              !amount_out[2]
                ? formatUnits(amount_out[1], Number(params.props[4]))
                : formatUnits(amount_out[2], Number(params.props[4]))
            }
          />
        )
      )}
    </div>
  );
};

export default GetAmountsOut;
