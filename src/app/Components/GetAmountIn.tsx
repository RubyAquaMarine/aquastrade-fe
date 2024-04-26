// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAMMRouter, useAMMPairs } from "@/app/Hooks/useAMM";
import styles from "@/app/Styles/AMM.module.css";
import { ROUTER_AQUADEX } from "@/app/Utils/config";
import { findTokenFromAddress } from "@/app/Utils/findTokens";

interface Props {
  amountA: string;
  pairAddress: string;
  decimalsA: number;
  decimalsB: number;
  tokenInputAddress: `0x${string}`;
}
// todo the bug : passing decimals down and not fetching from onchain based on the PAIR quote/base asset , USDC/AQUA
// therefore if you add USDC (top input) paired with AQUA , then the bottom value will be correct
// if AQUA is selected as the quote, then calculations are switched and GetAmountIn will be invalid to perform the addLiquidity function
const GetAmountIn = (params: Props) => {
  const [amount_out, setAmountOut] = useState(BigInt(0));
  const flipReserves = useRef(false);

  console.log(
    "GetAmountin :Props  ",
    params.props[0], // top-input-amount in ETHER
    params.props[1], // the amm pool.pair address
    params.props[2], // decimals of should be token A ( top input )
    params.props[3], // decimals of should be token B ( bottom input )
    params.props[4], // token address in
  );

  // Get the Reserves first
  // _address?: `0x${string}`; // AMM POOL ADDRESS
  // _functionName?: string;
  // _args?: [any];
  const { data: reserves } = useAMMPairs(params.props[1], "getReserves", []);
  const { data: addrA } = useAMMPairs(params.props[1], "token0", []);
  const { data: addrB } = useAMMPairs(params.props[1], "token1", []);

  function test() {
    if (addrA && params.props[4] && addrA === params.props[4]) {
      console.log(" InputToken  matches the QUOTE ");
      flipReserves.current = false;
    } else {
      console.log(" InputToken  !match the QUOTE ");
      flipReserves.current = true;
    }
  }

  // fetch decimals now
  // const tokenA = findTokenFromAddress(addrA);
  // const tokenB = findTokenFromAddress(addrB);
  // todo , input the reserves in switched order if the AMM POOL Quote/BASE doesnt match
  // the users input token to the QUOTE ,

  console.log("GetAmountIn: Flipped Reserves ", flipReserves.current, reserves);

  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "quote", [
    parseUnits(params.props[0], Number(params.props[2])),

    flipReserves.current === false ? reserves?.[0] : reserves?.[1],
    flipReserves.current === false ? reserves?.[1] : reserves?.[0],
  ]);

  console.log("GetAmountIn Token B Amount:", swap_out);

  useEffect(() => {
    if (swap_out) {
      setAmountOut(swap_out);
    }
  }, [swap_out]);

  useEffect(() => {
    if (reserves) {
      test();
    }
  }, [reserves]);

  return (
    <>
      {amount_out && reserves && typeof amount_out === "bigint" && (
        <input
          className={styles.input_amount}
          type="text"
          placeholder="0.0"
          value={formatUnits(amount_out, params.props[3])}
        />
      )}
    </>
  );
};

export default GetAmountIn;
