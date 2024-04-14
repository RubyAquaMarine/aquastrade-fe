"use client";

import { useReadContract } from "wagmi";

import { COIN_FLIP_ABI } from "@/app/Abi/europaCoinflip";
import { ERC20_ABI } from "@/app/Abi/erc20";

export const useCoinflip = (
  _address: `0x${string}`,
  functionName: string,
  args?: [any],
) => {
  const { data, isError, isLoading } = useReadContract({
    abi: COIN_FLIP_ABI,
    address: _address,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};

export const useERC20Token = (
  _address: `0x${string}`,
  functionName: string,
  args?: [any],
) => {
  const { data, isError, isLoading } = useReadContract({
    abi: ERC20_ABI,
    address: _address,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
