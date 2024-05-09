// @ts-nocheck
"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseEther, parseUnits } from "viem";
import { findTokenFromSymbol, findContractInfo } from "@/app/Utils/findTokens";

import { useAMMPairs, useFactory } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";

const FACTORY = findContractInfo("factory")?.addr;

interface Props {
  _address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
  _functionName?: string;
  _args?: [any];

  _decimalsA?: bigint; // CAN BE REMOVED
  _decimalsB?: bigint; // CAN BE REMOVED

  _symbolA?: string;
  _symbolB?: string;
}

const AmmPools = (props: Props) => {
  const erc20_in = findTokenFromSymbol(props?.props?.[5]);
  const erc20_out = findTokenFromSymbol(props?.props?.[6]);

  const { data: poolAddress } = useFactory(FACTORY, "getPair", [
    erc20_in?.addr,
    erc20_out?.addr,
  ]);

  // can be used for the amm pool reserves
  const {
    data: reserves,
    isError,
    isLoading,
  } = useAMMPairs(
    poolAddress, // pool address
    props?.props?.[1], // functionName to call on CA
    props?.props?.[2], // ifArgs are required
  );

  // token symbols
  const { data: sym0 } = useAMMPairs(poolAddress, "token0", []);
  //  const { data: sym1 } = useAMMPairs(props?.props?.[0], "token1", []);

  // Now compare , with Token Address , with token symbol, match or switched? if switched : reverse Decimals and Symbols in return<>

  return (
    <div>
      {reserves ? (
        <div>
          <Link
            className={styles.button_field_med}
            href={`https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/${poolAddress}`}
            target="_blank"
          >
            Pool Reserves
          </Link>

          {erc20_in?.addr === sym0 && (
            <div>
              <p className={styles.pool_balance}>
                {/**Token  */}
                {props?.props?.[5]}:{" "}
                {formatUnits(reserves?.[0], Number(erc20_in?.decimal))}
              </p>
              <p className={styles.pool_balance}>
                {props?.props?.[6]}:{" "}
                {formatUnits(reserves?.[1], Number(erc20_out?.decimal))}
              </p>
            </div>
          )}
          {erc20_in?.addr !== sym0 && (
            <div>
              {" "}
              <p className={styles.pool_balance}>
                {props?.props?.[6]}:{" "}
                {formatUnits(reserves?.[0], Number(erc20_out?.decimal))}
              </p>
              <p className={styles.pool_balance}>
                {props?.props?.[5]}:{" "}
                {formatUnits(reserves?.[1], Number(erc20_in?.decimal))}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isLoading && <div>Loading Pool data</div>}

          {isError && !isLoading && <div>Multi Pool Routing required</div>}

          {!reserves && !isLoading && !isError && (
            <div>Go to Cast and Build a Boat</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AmmPools;
