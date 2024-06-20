"use client";

import { useReadContract } from "wagmi";

import { AQUAFEED_ABI, AQUAFEED_HELPER_ABI } from "@/app/Abi/europaAquaFeed";

import { findContractInfo } from "@/app/Utils/findTokens";

const AQUAFEED = findContractInfo("aquafeed");

const HELPER = findContractInfo("aquafeedhelper");

export type DataFeedV = {
  id: string;
  pool: string;
  pricePool: string;
  pricePoolInverse: string;
  priceFeed: string;
  assets: string[];
  quote: string;
  base: string;
};

export const useAquaFeed = (functionName: string, args?: [any]) => {
  // console.log("useAquaFeed Fetch ", functionName, args);
  const { data, isError, isLoading } = useReadContract({
    abi: AQUAFEED_ABI,
    address: AQUAFEED?.address,
    functionName: functionName as unknown as undefined,
    args: args as unknown as undefined,
  });

  return { data, isError, isLoading };
};

export const useAquaFeedHelper = (functionName: string, args?: [any]) => {
  console.log("useAquaFeedHelper Fetch ", functionName, args);
  const { data, isError, isLoading } = useReadContract({
    abi: AQUAFEED_HELPER_ABI,
    address: HELPER?.address,
    functionName: functionName as unknown as undefined,
    args: args as unknown as undefined,
  });

  return { data, isError, isLoading };
};
