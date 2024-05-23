"use client";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";

interface Props {
  price: bigint;
  tokenSupply: bigint;
}

const TokenFDV = (params: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  // console.log("            TokenFDV", params);

  const getFDV = (_price: bigint, _supply: bigint) => {
    if (_price && _supply) {
      const normSupply =
        Number(formatUnits(_supply, 18)) * Number(formatUnits(_price, 18));

      if (normSupply) {
        return normSupply.toFixed(2);
      }
    }

    return "0.0";
  };

  return (
    <div id="token_fdv" ref={divRef}>
      <span>{getFDV(params.price, params.tokenSupply)}</span>
    </div>
  );
};

export default memo(TokenFDV);
