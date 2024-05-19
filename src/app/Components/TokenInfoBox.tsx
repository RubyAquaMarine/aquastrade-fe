// @ts-nocheck
"use client";
import Image from "next/image";
import React, { useState, useEffect, memo } from "react";

// Custom stuff

import { useSkaleExplorerAddresses } from "@/app/Hooks/useSkaleExplorer";

type CardProps = {
  _address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
  address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
};

const TokenInfoBox = (props: CardProps) => {
  console.log("tokenInfoBox Props", props);
  const data: any = useSkaleExplorerAddresses(props?.props?.[0]);

  console.log("Render tokenInfoBox", data);

  return (
    <div>
      <span>
        <Image
          src="/EUROPA.png"
          alt="Newly Listed Token on Aquas.Trade"
          width={20}
          height={20}
          priority
        />
      </span>
      <span> {data && data?.symbol}</span>
      <span> {data && data?.address}</span>
      Wallets
      <span> {data && data?.holders}</span>
    </div>
  );
};

export default memo(TokenInfoBox);
