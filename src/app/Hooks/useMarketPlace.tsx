"use client";

import { useReadContract } from "wagmi";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";
import { ERC20_ABI } from "@/app/Abi/erc20";

import { MARKETPLACE_AQUADEX } from "@/app/Utils/config";

import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

const ETH_ADDRESS = findTokenAddressFromSymbol("ETH");

export const useMarketPlace = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: marketplaceABI,
    address: MARKETPLACE_AQUADEX,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};

export const useERC20Token = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: ERC20_ABI,
    address: ETH_ADDRESS,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
