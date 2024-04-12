// @ts-nocheck
"use client";

import React, { useState, useRef } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAMMRouter } from "@/app/Hooks/useAMM";
import styles from "@/app/Styles/AMM.module.css";

import { ROUTER_AQUADEX } from "@/app/Utils/config";

interface Props {
  amountA: string;
  swapPath: string;
  fee: bigint;
  decimalsA: number;
  decimalsB: number;
}

const GetAmountsOut = (params: Props) => {
  console.error(
    "GetAmountsOut: amount : decimal ",
    params.props[0],
    params.props[3],
  );

  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "getAmountsOut", [
    parseUnits(params.props[0], Number(params.props[3])),
    params.props[1],
    params.props[2],
  ]);

  return (
    <div className={styles.container}>
      {!swap_out ? (
        <input
          className={styles.input_amount}
          type="text"
          placeholder="Select Token"
          value={"0.0"}
        />
      ) : (
        typeof swap_out === "object" && (
          <input
            className={styles.input_amount}
            type="text"
            placeholder="Select Token"
            value={formatUnits(swap_out[1], params.props[4])}
          />
        )
      )}
    </div>
  );
};

export default GetAmountsOut;
