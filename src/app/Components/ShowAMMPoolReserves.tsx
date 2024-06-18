// @ts-nocheck
"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseUnits } from "viem";
import { findTokenFromSymbol, findContractInfo } from "@/app/Utils/findTokens";

import { useAMMPairs, useFactory } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";

const FACTORY = findContractInfo("factory")?.address;
// todo : refeactor  with
//  type = {}
interface Props {
  _address?: `0x${string}`; //  AMM POOL ADDRESS, (not being used in the componenet) but maybe change to factory address : multi DEX support :
  _functionName?: string;
  _args?: [any];

  _symbolA?: string; // 5 = 3
  _symbolB?: string; // 6 = 4
}

// Return the AMM POOL Reerses.
const ShowAMMPoolReserves = (props: Props) => {
  const erc20_in = findTokenFromSymbol(props?.props?.[3]);
  const erc20_out = findTokenFromSymbol(props?.props?.[4]);

  const { data: poolAddress } = useFactory(FACTORY, "getPair", [
    erc20_in?.address,
    erc20_out?.address,
  ]);

  // fetch amm pool reserves
  const {
    data: reserves,
    isError,
    isLoading,
  } = useAMMPairs(
    poolAddress, // pool address
    props?.props?.[1], // functionName to call on CA
    props?.props?.[2], // ifArgs are required
  );

  // fetch the token0 and then figure out what reserves belong to what asset : uniswapLibrary.sort
  const { data: sym0 } = useAMMPairs(poolAddress, "token0", []);

  // Compare Token Addresses , with token symbol, match or switched? if switched : reverse Decimals and Symbols in return<>
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

          {erc20_in?.address === sym0 && (
            <div>
              <p className={styles.pool_balance}>
                {/**Token  */}
                {props?.props?.[3]}:{" "}
                {formatUnits(reserves?.[0], Number(erc20_in?.decimals))}
              </p>
              <p className={styles.pool_balance}>
                {props?.props?.[4]}:{" "}
                {formatUnits(reserves?.[1], Number(erc20_out?.decimals))}
              </p>
            </div>
          )}
          {erc20_in?.address !== sym0 && (
            <div>
              {" "}
              <p className={styles.pool_balance}>
                {props?.props?.[4]}:{" "}
                {formatUnits(reserves?.[0], Number(erc20_out?.decimals))}
              </p>
              <p className={styles.pool_balance}>
                {props?.props?.[3]}:{" "}
                {formatUnits(reserves?.[1], Number(erc20_in?.decimals))}
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

export default ShowAMMPoolReserves;
