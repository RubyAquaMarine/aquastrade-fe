"use client";

import { useReadContract } from "wagmi";

import { AQUAFEED_ABI } from "@/app/Abi/europaAquaFeed";

import { findContractInfo } from "@/app/Utils/findTokens";

const AQUAFEED = findContractInfo("aquafeed");

export const useAquaFeed = (functionName: string, args?: [any]) => {
  console.log(" debug ", functionName, args);
  const { data, isError, isLoading } = useReadContract({
    abi: AQUAFEED_ABI,
    address: AQUAFEED?.address,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
