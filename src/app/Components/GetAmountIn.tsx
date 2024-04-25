// @ts-nocheck
"use client";

import React, { useState, useRef } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAMMRouter, useAMMPairs } from "@/app/Hooks/useAMM";
import styles from "@/app/Styles/AMM.module.css";

import { ROUTER_AQUADEX } from "@/app/Utils/config";

interface Props {
  amountA: string;
  pairAddress: string;

  decimalsA: number;
  decimalsB: number;
}

const GetAmountIn = (params: Props) => {
  console.log(
    "GetAmountin :Props  ",
    params.props[0],
    params.props[1],
    params.props[2],
    params.props[3],
  );

  // Get the Reserves first
  // _address?: `0x${string}`; // AMM POOL ADDRESS
  // _functionName?: string;
  // _args?: [any];
  const { data: reserves } = useAMMPairs(params.props[1], "getReserves", []);

  console.log("GetAmountIn  reserves:", reserves);

  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "quote", [
    parseUnits(params.props[0], Number(params.props[2])),

    reserves?.[0],
    reserves?.[1],
  ]);

  console.log("GetAmountIn Recommended amount:", swap_out);

  return (
    <>
      {swap_out && reserves && typeof swap_out === "bigint" && (
        <input
          className={styles.input_amount}
          type="text"
          placeholder="0.0"
          value={formatUnits(swap_out, params.props[3])}
        />
      )}
    </>
  );
};

export default GetAmountIn;
