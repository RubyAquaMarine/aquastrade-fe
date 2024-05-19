"use client";

import { useReadContract } from "wagmi";
import { PRESALE_ABI } from "@/app/Abi/presale";
import { findContractInfo } from "@/app//Utils/findTokens";
const contract = findContractInfo("presale");

export const usePresale = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: PRESALE_ABI,
    address: contract.address,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  // console.log(
  //   "usePresale: data from ",
  //   functionName,
  //   args,
  //   data,
  //   isLoading,
  //   isError,
  //   contract?.address,
  // );
  return { data, isError, isLoading };
};
