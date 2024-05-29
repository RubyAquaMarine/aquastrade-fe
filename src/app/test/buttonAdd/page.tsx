"use client";
import React, { useRef } from "react";

import { formatUnits, parseUnits } from "viem";

import { ButtonSpinner, Props } from "@/app/Components/ButtonSpinner";
import {
  findContractInfo,
  findTokenAddressFromSymbol,
} from "@/app/Utils/findTokens";

// temp
import { ERC20_ABI } from "@/app/Abi/erc20";

import { useAccount } from "wagmi";

const Home = ({ params }: any) => {
  const addressContract = findContractInfo("coinflip-aqua")?.address;
  const token_address = findTokenAddressFromSymbol(
    "AQUA",
  ) as unknown as `0x${string}`;
  // wagmi
  const { address, isConnected, chain } = useAccount();

  const data: Props = {
    buttonText: "Approve",
    name: "approve",
    address: token_address,
    abi: ERC20_ABI as any,
    args: [address, parseUnits("1", 18)] as any,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {address ? (
        <ButtonSpinner {...data}></ButtonSpinner>
      ) : (
        <span> Connect Wallet </span>
      )}
    </main>
  );
};

export default Home;
