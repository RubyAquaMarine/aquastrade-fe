"use client";
import Image from "next/image";
import React, { useState, useEffect, memo } from "react";

// Custom stuff

import { useSkaleExplorerAddresses } from "@/app/Hooks/useSkaleExplorer";

//// div with image, symbol_name _ address //
interface Props {
  _address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
  _args?: [any];
}

type CardProps = {
  _address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
  address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
};

const tokenInfoBox = (props: CardProps) => {
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

export default memo(tokenInfoBox);
