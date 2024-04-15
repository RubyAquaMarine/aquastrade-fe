// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseEther, parseUnits } from "viem";

import { useAMMPairs } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";

interface Props {
  _address?: `0x${string}`;
  _functionName?: string;
  _args?: [any];

  _decimalsA?: bigint;
  _decimalsB?: bigint;
}

const AmmPools = (props: Props) => {
  const {
    data: reserves,
    isError,
    isLoading,
  } = useAMMPairs(props?.props?.[0], props?.props?.[1], props?.props?.[2]);

  return (
    <main>
      {reserves ? (
        <div>
          Pool Reserves:
          <p className={styles.pool_balance}>
            Token A: {formatUnits(reserves?.[0], Number(props?.props?.[3]))}
          </p>
          <p className={styles.pool_balance}>
            Token B: {formatUnits(reserves?.[1], Number(props?.props?.[4]))}
          </p>
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
