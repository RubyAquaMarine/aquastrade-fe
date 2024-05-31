"use client";
import React, { useRef, useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";

import SwitchAddress from "@/app/Components/SwitchAddress";

import { ButtonSpinner, Props } from "@/app/Components/ButtonSpinner";
import InputNumber from "@/app/Components/InputNumber";

import {
  findContractInfo,
  findTokenAddressFromSymbol,
} from "@/app/Utils/findTokens";

// temp
import { ERC20_ABI } from "@/app/Abi/erc20";

import { useAccount } from "wagmi";

const Home = ({ params }: any) => {
  // const addressContract = findContractInfo("coinflip-aqua")?.address;
  // const token_address = findTokenAddressFromSymbol(
  //   "AQUA",
  // ) as unknown as `0x${string}`;
  // // wagmi
  const { address, isConnected, chain } = useAccount();

  // const data: Props = {
  //   buttonText: "Approve",
  //   name: "approve",
  //   address: token_address,
  //   abi: ERC20_ABI as any,
  //   args: [address, parseUnits("1", 18)] as any,
  // };

  // const isInput = useRef<HTMLDivElement>(null);

  // const [inputValue, setInput ] = useState();

  // console.log(" DEBUG element", inputValue)

  // useEffect(() => {

  //   if (isInput.current) {
  //     setInput(isInput.current?.children[0]?.id);
  //   }
  // }, [isInput]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {address && <SwitchAddress {...{ address: address }} />}
    </main>
  );
};

export default Home;

/**
 * 
 * 
      <InputNumber {...{ id: "tokenA", amount: "0.1", decimals: 8 }}>
        {" "}
      </InputNumber>

      {address ? (
        <ButtonSpinner {...data}></ButtonSpinner>
      ) : (
        <span> Connect Wallet </span>
      )}

 */
