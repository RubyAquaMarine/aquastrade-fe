// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";

import { isNumber } from "@/app/Utils/utils";

import { formatUnits, parseUnits } from "viem";
import { useAMMRouter } from "@/app/Hooks/useAMM";
import styles from "@/app/Styles/GetAmountsOut.module.css";
import { findTokenFromAddress, findContractInfo } from "@/app/Utils/findTokens";
const ROUTER_AQUADEX = findContractInfo("router")?.address;

interface Props {
  id: string;
  amount: string;
  decimals: number;
}

// Just testing how to build a better input with RegEx
const InputNumber = (params: Props) => {
  // COPY PASTE THIS INTO COMPONEBTS
  const [inputTokenAmount, setTokenAmount] = useState<string>();
  const filterStringInput = (_value: string, _decimals: number) => {
    if (_value === "") {
      setTokenAmount(_value);
    }
    if (isNumber(_value)) {
      // prevent update after certain decimals
      const lengthValue = _value.split(".")[1]?.length;
      if (_decimals >= lengthValue || typeof lengthValue === "undefined") {
        setTokenAmount(_value);
      }
    }
  };
  // COPY PASTE THIS INTO COMPONEBTS

  return (
    <div id={`input-number-${params.id}`}>
      <input
        type="text"
        placeholder="Input Token Amount"
        value={inputTokenAmount}
        onChange={(e) => filterStringInput(e.target.value, 8)}
      />{" "}
    </div>
  );
};

export default InputNumber;

/*

 onChange={(e) =>
                    setTokenAmount(
                        e.target.value === "string" && isNumber(e.target.value)
                            ? e.target.value
                            : '',
                    )

                    */
