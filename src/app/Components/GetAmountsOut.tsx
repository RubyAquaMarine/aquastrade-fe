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
}

const GetAmountsOut = (params: Props) => {
  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "getAmountsOut", [
    parseUnits(params.props[0], 18),
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
              value={formatUnits(swap_out[1], 18)}
            />
          )
        )}
      </div>
   
  );
};

export default GetAmountsOut;
