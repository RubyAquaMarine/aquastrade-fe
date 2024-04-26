// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
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
  const [amount_out, setAmountOut] = useState([]);
  /*
  console.log(
    "GetAmountsOut: amount : decimal ",
    params.props[0],
    params.props[3],
  );
  */

  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "getAmountsOut", [
    parseUnits(params.props[0], Number(params.props[3])),
    params.props[1],
    params.props[2],
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
            value={formatUnits(amount_out[1], params.props[4])}
          />
        )
      )}
    </div>
  );
};

export default GetAmountsOut;
