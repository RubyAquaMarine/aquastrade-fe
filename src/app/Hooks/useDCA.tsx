"use client";

import { useReadContract } from "wagmi";
import { DCA_ABI } from "@/app/Abi/dca";
import { findContractInfo } from "@/app/Utils/findTokens";

const DCA = findContractInfo("dcamulti");

export const useDCA = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: DCA_ABI,
    address: DCA?.address,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
