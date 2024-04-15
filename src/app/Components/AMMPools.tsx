// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseEther, parseUnits } from "viem";
import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";
import { useAMMPairs } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";

interface Props {
  _address?: `0x${string}`; // AMM POOL ADDRESS
  _functionName?: string;
  _args?: [any];

  _decimalsA?: bigint;
  _decimalsB?: bigint;

  _symbolA?: string;
  _symbolB?: string;
}

const AmmPools = (props: Props) => {
  const {
    data: reserves,
    isError,
    isLoading,
  } = useAMMPairs(props?.props?.[0], props?.props?.[1], props?.props?.[2]);

  // token symbols
  const { data: sym0 } = useAMMPairs(props?.props?.[0], "token0", []);

  const { data: sym1 } = useAMMPairs(props?.props?.[0], "token1", []);

  console.error(" Symbols in", props?.props?.[5], props?.props?.[6]);
  console.error(" Symbols out", sym0, sym1);

  // should match
  const token_address_erc20_in = findTokenAddressFromSymbol(props?.props?.[5]);

  // Now compare , with Token Address , with token symbol, match or switched? if switched : reverse Decimals and Symbols in return<>

  return (
    <main>
      {reserves ? (
        <div>
          Pool Reserves:
          {token_address_erc20_in === sym0 && (
            <div>
              <p className={styles.pool_balance}>
                {/**Token  */}
                {props?.props?.[5]}:{" "}
                {formatUnits(reserves?.[0], Number(props?.props?.[3]))}
              </p>
              <p className={styles.pool_balance}>
                {props?.props?.[6]}:{" "}
                {formatUnits(reserves?.[1], Number(props?.props?.[4]))}
              </p>
            </div>
          )}
          {token_address_erc20_in !== sym0 && (
            <div>
              {" "}
              <p className={styles.pool_balance}>
                {props?.props?.[6]}:{" "}
                {formatUnits(reserves?.[0], Number(props?.props?.[4]))}
              </p>
              <p className={styles.pool_balance}>
                {props?.props?.[5]}:{" "}
                {formatUnits(reserves?.[1], Number(props?.props?.[3]))}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isLoading && <div>Loading Pool data</div>}

          {isError && !isLoading && <div>Multi Pool Routing required</div>}

          {!reserves && !isLoading && !isError && <div>No Pool data</div>}
        </div>
      )}
    </main>
  );
};

export default AmmPools;